<?php
// Inclure TCPDF
require '../tcpdf/tcpdf.php';

// Inclure phpseclib
require '../phpseclib-phpseclib-1d0b5e7/phpseclib/Crypt/RSA.php';
require '../phpseclib-phpseclib-1d0b5e7/phpseclib/File/X509.php';

use TCPDF;
use phpseclib3\Crypt\RSA;
use phpseclib3\File\X509;

function signPdf($inputFile, $outputFile, $privateKey) {
    $pdf = new TCPDF();
    $pdf->AddPage();
    $pdf->setSourceFile($inputFile);
    $tplId = $pdf->importPage(1);
    $pdf->useTemplate($tplId);

    // Ajouter une annotation ou une signature
    $pdf->SetFont('Helvetica', 'B', 12);
    $pdf->SetXY(10, 10);
    $pdf->Cell(0, 10, 'Document signé', 0, 1, 'L');

    // Enregistrer le PDF signé
    $pdf->Output($outputFile, 'F');

    // Signer le document
    $data = file_get_contents($outputFile);
    $rsa = RSA::load($privateKey);
    $signature = $rsa->sign($data);
    
    // Sauvegarder la signature
    file_put_contents('../documents_signes/signature.bin', $signature);
}

function verifySignature($signedFile, $publicKey) {
    $data = file_get_contents($signedFile);
    $signature = file_get_contents('uploads/signature.bin');

    $x509 = new X509();
    $x509->loadX509(file_get_contents($publicKey));
    $rsa = RSA::load($x509->getPublicKey());

    return $rsa->verify($data, $signature);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $inputFile = $file['tmp_name'];
        $outputFile = 'uploads/signed_document.pdf';

        // Charger la clé privée
        $privateKey = file_get_contents('../key/private_key.pem');
        signPdf($inputFile, $outputFile, $privateKey);
        echo json_encode(['status' => 'success', 'message' => 'Document signé avec succès.']);
        exit;
    }

    if (isset($_FILES['verifyFile'])) {
        $file = $_FILES['verifyFile'];
        $signedFile = $file['tmp_name'];

        // Chemin vers le certificat public (à adapter)
        $publicKey = '../key/public_key.pem'; 
        
        if (verifySignature($signedFile, $publicKey)) {
            echo json_encode(['status' => 'success', 'message' => 'Signature vérifiée avec succès.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Échec de la vérification de la signature.']);
        }
        exit;
    }
}
?>
