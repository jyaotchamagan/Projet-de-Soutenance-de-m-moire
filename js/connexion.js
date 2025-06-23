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