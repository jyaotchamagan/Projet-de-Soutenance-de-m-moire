const form = document.getElementById('registrationForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const phoneInput = document.getElementById('phone');
    const countryCodeSelect = document.getElementById('countryCode');
    const passwordStrengthText = document.getElementById('passwordStrength');
    const confirmPasswordStrengthText = document.getElementById('confirmPasswordStrength');
    const passwordProgress = document.getElementById('passwordProgress');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const eyeIconConfirm = document.getElementById('eyeIconConfirm');

    // Éléments pour prénom et nom
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const identifiantInput = document.getElementById('identifiant');

    // Écouter les entrées dans le champ de prénom
    firstNameInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^A-Za-z\s-]/g, '');
    });

    // Écouter les entrées dans le champ de nom
    lastNameInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^A-Za-z\s-]/g, '');
    });

    

    // Écouter les entrées dans le champ d'identifiant
    identifiantInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-z0-9._-]/g, '');
    });

    // Désactiver le champ numéro de téléphone tant qu'aucun indicatif n'est sélectionné
    countryCodeSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const maxLength = selectedOption.getAttribute('data-length');
        phoneInput.maxLength = maxLength;

        phoneInput.disabled = !selectedOption.value; // Désactiver si aucun indicatif
        phoneInput.value = ''; // Réinitialiser le champ
    });

    emailInput.addEventListener('input', function() {
        this.classList.toggle('is-invalid', !this.checkValidity());
    });

    passwordInput.addEventListener('input', function() {
        const result = zxcvbn(this.value);
        let strengthLevel = 0;
        let progressColor = 'bg-danger'; // Couleur par défaut (faible)

        if (result.score > 2) {
            strengthLevel = 100; // Fort
            passwordStrengthText.textContent = 'Mot de passe fort.';
            passwordStrengthText.style.color = 'green';
            progressColor = 'bg-success'; // Vert
        } else if (result.score === 2) {
            strengthLevel = 70; // Moyen
            passwordStrengthText.textContent = 'Mot de passe moyen.';
            passwordStrengthText.style.color = 'orange';
            progressColor = 'bg-warning'; // Orange
        } else {
            strengthLevel = 30; // Faible
            passwordStrengthText.textContent = 'Mot de passe faible.';
            passwordStrengthText.style.color = 'red';
        }

        passwordProgress.style.width = strengthLevel + '%';
        passwordProgress.setAttribute('aria-valuenow', strengthLevel);
        passwordProgress.className = 'progress-bar ' + progressColor; // Changer la couleur de la barre
    });

    confirmPasswordInput.addEventListener('input', function() {
        this.classList.toggle('is-invalid', this.value !== passwordInput.value);
        confirmPasswordStrengthText.textContent = this.value === passwordInput.value ? 'Les mots de passe correspondent.' : 'Les mots de passe ne correspondent pas.';
        confirmPasswordStrengthText.style.color = this.value === passwordInput.value ? 'green' : 'red';
    });

    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        eyeIcon.classList.toggle('fa-eye');
        eyeIcon.classList.toggle('fa-eye-slash');
    });

    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        eyeIconConfirm.classList.toggle('fa-eye');
        eyeIconConfirm.classList.toggle('fa-eye-slash');
    });

    form.addEventListener('submit', function(event) {
        if (!this.checkValidity() || passwordInput.classList.contains('is-invalid') || confirmPasswordInput.classList.contains('is-invalid')) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.classList.add('was-validated');
    });

    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Empêcher l'envoi par défaut du formulaire
    
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const countryCode = document.getElementById('countryCode').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const identifiant = document.getElementById('identifiant').value;
        const password = document.getElementById('password').value;
    
        // Créer un objet FormData
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('countryCode', countryCode);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('identifiant', identifiant);
        formData.append('password', password);
    
        // Envoyer les données à inscription.php
        fetch('../php/inscription.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Afficher le message de retour
            document.getElementById('registrationForm').reset(); // Réinitialiser le formulaire
        })
        .catch(error => console.error('Erreur:', error));
    });