// JavaScript par défaut (si nécessaire)
console.log("Page chargée avec succès !");

// JavaScript pour gérer l'affichage des informations supplémentaires
document.getElementById("infoButton").addEventListener("click", function() {
    var moreInfo = document.getElementById("moreInfo");
    if (moreInfo.style.display === "none" || moreInfo.style.display === "") {
        moreInfo.style.display = "block"; // Afficher le contenu
        this.textContent = "Moins d'Informations"; // Changer le texte du bouton
    } else {
        moreInfo.style.display = "none"; // Masquer le contenu
        this.textContent = "Plus d'Informations"; // Rétablir le texte du bouton
    }
});



//-----------------------------------------------------------------------------------//


const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('motdepasse');
    const eyeIcon = document.getElementById('eyeIcon');

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        eyeIcon.classList.toggle('fa-eye-slash');
    });

    const identifiantInput = document.getElementById('identifiant');

    // Écouter les entrées dans le champ d'identifiant
    identifiantInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-z0-9._-]/g, '');
    });