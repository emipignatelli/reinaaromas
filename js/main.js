function toggleMenu() {
    const dropdown = document.getElementById('dropdown');
    const loginForm = document.getElementById('login-form');

    // Solo permitir mostrar el menú si el formulario no está visible
    if (loginForm.style.display !== 'flex') {
        dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
    } else {
        // Ocultar el formulario si el menú se despliega
        loginForm.style.display = 'none';
    }
}

function toggleLoginForm(type) {
    const loginForm = document.getElementById('login-form');
    const resetForm = document.getElementById('reset-form');
    const signupForm = document.getElementById('signup-form');

    // Si el formulario de inicio de sesión está visible
    if (loginForm.style.display === 'flex') {
        loginForm.style.display = 'none';
        resetForm.style.display = 'none';
        signupForm.style.display = 'none';
        
        // Cerrar el menú en móvil si es visible
        if (type === 'mobile') {
            const dropdown = document.getElementById('dropdown');
            dropdown.style.display = 'none';
        }
    } else {
        // Si no está visible, mostrarlo y ocultar los otros
        loginForm.style.display = 'flex';
        resetForm.style.display = 'none';
        signupForm.style.display = 'none';

        // Cerrar el menú en móvil
        if (type === 'mobile') {
            const dropdown = document.getElementById('dropdown');
            dropdown.style.display = 'none';
        }
    }
}

function showResetForm() {
    const loginForm = document.getElementById('login-form');
    const resetForm = document.getElementById('reset-form');
    const signupForm = document.getElementById('signup-form');

    // Ocultar otros formularios
    loginForm.style.display = 'none';
    resetForm.style.display = 'flex';
    signupForm.style.display = 'none';
}

function showSignupForm() {
    const loginForm = document.getElementById('login-form');
    const resetForm = document.getElementById('reset-form');
    const signupForm = document.getElementById('signup-form');

    // Ocultar otros formularios
    loginForm.style.display = 'none';
    resetForm.style.display = 'none';
    signupForm.style.display = 'flex';
}

function validateLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');
    const loginSuccess = document.getElementById('login-success');
    const loginSessionMessage = document.getElementById('login-session-message');

    // Obtener datos de cuentas del local storage
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const account = accounts.find(acc => acc.email === email);

    // Validación del inicio de sesión
    if (!account) {
        loginError.textContent = 'Cuenta inexistente. Si no tienes una cuenta, crea una.';
        loginSuccess.textContent = '';
        loginSessionMessage.style.display = 'none';
        return;
    }

    if (account.password !== password) {
        loginError.textContent = 'Contraseña incorrecta.';
        loginSuccess.textContent = '';
        loginSessionMessage.style.display = 'none';
        return;
    }

    // Si todo es válido
    loginSuccess.textContent = '¡Inicio de sesión exitoso!';
    loginError.textContent = '';
    loginSessionMessage.style.display = 'block'; // Mostrar el mensaje

    // Ocultar el formulario de inicio de sesión y volver al inicio
    setTimeout(() => {
        document.getElementById('login-form').style.display = 'none';
        // Puedes redirigir o mostrar otra vista aquí si lo deseas
    }, 2000); // Ocultar después de 2 segundos
}

function validateReset() {
    const email = document.getElementById('reset-email').value;
    const newPassword = document.getElementById('new-password').value;
    const resetError = document.getElementById('reset-error');
    const resetSuccess = document.getElementById('reset-success');

    // Obtener datos de cuentas del local storage
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const account = accounts.find(acc => acc.email === email);

    // Validación del restablecimiento de contraseña
    if (!account) {
        resetError.textContent = 'Email no encontrado.';
        resetSuccess.textContent = '';
        return;
    }

    // Si todo es válido, actualizar la contraseña
    account.password = newPassword;
    localStorage.setItem('accounts', JSON.stringify(accounts));
    resetSuccess.textContent = 'Contraseña restablecida con éxito.';
    resetError.textContent = '';
    document.getElementById('reset-form').style.display = 'none';
}

function validateSignup() {
    const name = document.getElementById('signup-name').value;
    const surname = document.getElementById('signup-surname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const signupError = document.getElementById('signup-error');
    const signupSuccess = document.getElementById('signup-success');

    // Validación de nombre y apellido
    if (!/^[a-zA-Z]+$/.test(name) || !/^[a-zA-Z]+$/.test(surname)) {
        signupError.textContent = 'El nombre y apellido solo pueden contener letras.';
        signupSuccess.textContent = '';
        return;
    }

    // Validación de email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        signupError.textContent = 'Por favor, ingresa un email válido.';
        signupSuccess.textContent = '';
        return;
    }

    // Obtener datos de cuentas del local storage
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const existingAccount = accounts.find(acc => acc.email === email);

    if (existingAccount) {
        signupError.textContent = 'Este email ya ha sido utilizado.';
        signupSuccess.textContent = '';
        return;
    }

    // Validación de contraseña
    if (password.length > 8 || password.length < 1) {
        signupError.textContent = 'La contraseña debe tener un máximo de 8 caracteres.';
        signupSuccess.textContent = '';
        return;
    }

    if (password !== confirmPassword) {
        signupError.textContent = 'Las contraseñas no coinciden.';
        signupSuccess.textContent = '';
        return;
    }

    // Guardar cuenta en el local storage
    accounts.push({ name, surname, email, password });
    localStorage.setItem('accounts', JSON.stringify(accounts));

    signupSuccess.textContent = 'Cuenta creada con éxito.';
    signupError.textContent = '';
    document.getElementById('signup-form').style.display = 'none';
    toggleLoginForm(); // Regresar al formulario de inicio de sesión
}
