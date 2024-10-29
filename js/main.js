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


    // Array para almacenar los productos en el carrito
    let carrito = []; // Array para almacenar los productos en el carrito

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    const contenidoCarrito = document.getElementById('contenidoCarrito');
    contenidoCarrito.innerHTML = ''; // Limpiar contenido anterior

    if (carrito.length === 0) {
        contenidoCarrito.innerHTML = 'El carrito está vacío.';
        document.getElementById('confirmarCompra').style.display = 'none'; // Ocultar botón si está vacío
        return;
    }

    let total = 0; // Inicializar total
    carrito.forEach((producto, index) => {
        total += producto.precio;
        contenidoCarrito.innerHTML += `
            <div class="d-flex justify-content-between">
                <span>${producto.nombre} - $${producto.precio.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">-</button>
            </div>
        `;
    });

    contenidoCarrito.innerHTML += `<div><strong>Total: $${total.toFixed(2)}</strong></div>`;
    document.getElementById('confirmarCompra').style.display = 'block'; // Mostrar botón si hay productos
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Evento para abrir el modal del carrito al hacer clic en el icono
document.querySelector('.fa-shopping-cart').addEventListener('click', function() {
    $('#carritoModal').modal('show');
    actualizarCarrito(); // Asegurarse de que el carrito esté actualizado al abrir
});

// Agregar el evento para mostrar el carrito desde el menú móvil
document.getElementById('carritoDropdown').addEventListener('click', function() {
    $('#carritoModal').modal('show');
    actualizarCarrito(); // Asegurarse de que el carrito esté actualizado al abrir
});

// Función para manejar la confirmación de compra
document.getElementById('confirmarCompra').addEventListener('click', function() {
    if (carrito.length === 0) return; // No hacer nada si el carrito está vacío
    $('#carritoModal').modal('hide'); // Cerrar el modal del carrito
    $('#confirmacionModal').modal('show'); // Mostrar el modal de confirmación
});

// Event listener para el botón de pagar
document.getElementById('pagar').addEventListener('click', function() {
    const tarjeta = document.getElementById('tarjeta').value;
    const codigo = document.getElementById('codigo').value;
    const vencimiento = document.getElementById('vencimiento').value;
    const email = document.getElementById('email').value;

    // Aquí iría la lógica para procesar el pago
    alert(`Procesando el pago para la tarjeta: ${tarjeta}`); // Mensaje temporal
    $('#confirmacionModal').modal('hide'); // Cerrar modal de confirmación
    carrito = []; // Vaciar el carrito después de la compra
    actualizarCarrito(); // Actualizar el UI del carrito
});

// Event listener para cancelar la compra
document.getElementById('cancelarCompra').addEventListener('click', function() {
    $('#confirmacionModal').modal('hide'); // Cerrar modal de confirmación
    $('#carritoModal').modal('show'); // Regresar al modal del carrito
});

// Ejemplo de cómo agregar un producto al carrito (esto debería estar en tus botones "Comprar")
document.querySelectorAll('.product-card button').forEach((button) => {
    button.addEventListener('click', function() {
        const nombre = this.parentElement.querySelector('h4').innerText;
        const precio = parseFloat(this.parentElement.querySelector('span').innerText.replace('$', ''));
        agregarAlCarrito(nombre, precio);
    });
});
