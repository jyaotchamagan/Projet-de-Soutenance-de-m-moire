# Universite
Mon projet vise à déployer une solution de signature électronique centralisée. Voici les étapes que j'ai suivies :

//Création du Site Web :

J'ai développé un site web standard destiné à une université. Ce site inclut un système d'inscription et de connexion pour les utilisateurs. Jai utilisé xammp comme serveur web local

//Portail pour les Professeurs :

Une fois connectés, les utilisateurs accèdent à un portail spécifique pour les professeurs, où ils peuvent gérer divers documents.

//Gestion des Documents :

Dans la section dédiée aux documents, les utilisateurs peuvent cliquer sur une option pour signer des documents. Cela les dirige vers une page où ils peuvent choisir les fichiers à signer.
Vérification des Signatures :

En plus de signer des documents, il y a également une fonctionnalité permettant de vérifier les signatures électroniques.

//Choix Technologique :

Initialement, j'avais prévu d'utiliser une API pour la signature électronique. Cependant, en raison de la complexité et des problèmes de fonctionnement rencontrés, j'ai décidé d'utiliser TCPDF et phpseclib. Ces bibliothèques me permettent de gérer la création et la signature de documents PDF de manière efficace.

//Problème

Malgré le fait que j'ai changé de méthode, je rencontre toujours un problème au niveau de mon code php. Il ya trois ligne de code qui me renvoie une erreur dans mon index.php
Je ne connais pas vraiment la raison. Peut etre que ce sont les dépendances qui sont trop ancienne(version) 
line 20,21,22
