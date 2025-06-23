<?php
// connexion.php

// Connexion à la base de données
$servername = "localhost"; // Nom d'hôte
$username = "root"; // Nom d'utilisateur MySQL
$password = ""; // Mot de passe MySQL
$dbname = "universite"; // Nom de votre base de données

// Créer la connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Échec de la connexion: " . $conn->connect_error);
}

// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Vérifiez si les clés existent dans $_POST
    if (isset($_POST['identifiant']) && isset($_POST['password'])) {
        // Récupérer et échapper les données du formulaire
        $identifiant = $conn->real_escape_string(trim($_POST['identifiant']));
        $password = $conn->real_escape_string(trim($_POST['password']));

        // Requête pour vérifier l'identifiant et le mot de passe
        $sql = "SELECT * FROM utilisateurs WHERE identifiant = '$identifiant' AND password = '$password'";
        $result = $conn->query($sql);

        // Vérifier si un utilisateur a été trouvé
        if ($result && $result->num_rows > 0) {
            // L'utilisateur est authentifié, rediriger vers perso.html
            header("Location: ../page/pesonnel.html");
            exit(); // Terminer le script après la redirection
        } else {
            echo "Identifiant ou mot de passe incorrect.";
        }
    } else {
        echo "Veuillez remplir tous les champs.";
    }
}

// Fermer la connexion
$conn->close();
?>