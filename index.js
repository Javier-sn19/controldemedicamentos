function validarInicioSesion() {
    let usuario = document.getElementById("username").value;
    let contraseña = document.getElementById("password").value;

    // Simulación de verificación de usuario y contraseña
    if (usuario === "admin" && contraseña === "admin") {
        alert("Inicio de sesión exitoso");
        window.location.href = "buscador.html";
        return false; // Para evitar que el formulario se envíe de forma predeterminada
    } else {
        alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
        return false; // Para evitar que el formulario se envíe de forma predeterminada
    }
}
