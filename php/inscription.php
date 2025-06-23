<?php
// inscription.php

//STATIC 
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
} else { 
    echo 'la connexion à réussie';
}
//STATIC 


// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer et échapper les données du formulaire
    $firstName = $conn->real_escape_string($_POST['firstName']);
    $lastName = $conn->real_escape_string($_POST['lastName']);
    $countryCode = $conn->real_escape_string($_POST['countryCode']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $email = $conn->real_escape_string($_POST['email']);
    $identifiant = $conn->real_escape_string($_POST['identifiant']);
    $password = $conn->real_escape_string($_POST['password']);

    // Insérer les données dans la base de données
    $sql = "INSERT INTO utilisateurs (firstName, lastName, countryCode, phone, email, identifiant, password) 
            VALUES ('$firstName', '$lastName', '$countryCode', '$phone', '$email', '$identifiant', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo "Inscription réussie!";
    } else {
        echo "Erreur: " . $sql . "<br>" . $conn->error;
    }
}

//SELECT * FROM `utilisateurs` WHERE identifiant = $identifiant  AND password = $password ;  // requete pour la connexion 

// Fermer la connexion
$conn->close();
?>