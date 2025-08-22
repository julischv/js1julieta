// Almacena las encuestas en un array
let encuestas = JSON.parse(localStorage.getItem('encuestas')) || [];

// Maneja el evento de envío del formulario
document.getElementById('healthSurvey').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const email = document.getElementById('email').value;
    if (!validarEmail(email)) {
        mostrarError('Por favor ingrese un correo válido');
        return;
    }
    
    const datosUsuario = obtenerDatosUsuario();
    
    if (validarDatos(datosUsuario)) {
        encuestas.push(datosUsuario);
        localStorage.setItem('encuestas', JSON.stringify(encuestas));
        
        // Redirigir según la edad y las respuestas
        redirigirUsuario(datosUsuario);
    } else {
        mostrarError("Por favor, completa todos los campos requeridos.");
    }
});

// Función para validar formato de email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Función para obtener los datos del usuario
function obtenerDatosUsuario() {
    const edad = parseInt(document.getElementById('edad').value);
    return {
        nombreApellido: document.getElementById('nombreApellido').value,
        edad: edad,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        direccion: document.getElementById('direccion').value || 'No proporcionada',
        realizaDeporte: document.getElementById('realizaDeporte').value,
        trabajaComputadora: document.getElementById('trabajaComputadora').value,
        doloresComputadora: document.getElementById('trabajaComputadora').value === "sí" 
                            ? document.getElementById('doloresComputadora').value 
                            : "No aplica",
        enfermedadPreexistente: document.getElementById('enfermedadPreexistente').value,
        enfermedadEspecifica: document.getElementById('enfermedadPreexistente').value === "sí" 
                            ? document.getElementById('enfermedadEspecifica').value 
                            : "No aplica",
        tipoDeporte: document.getElementById('realizaDeporte').value === "sí" 
                            ? document.getElementById('tipoDeporte').value 
                            : "No aplica",
        frecuenciaDeporte: document.getElementById('realizaDeporte').value === "sí" 
                            ? document.getElementById('frecuenciaDeporte').value 
                            : "0",
        lesionesDeporte: document.getElementById('realizaDeporte').value === "sí" 
                            ? document.getElementById('lesionesDeporte').value 
                            : "No aplica",
        caidas: edad > 65 ? document.getElementById('caidas').value : "No aplica",
        numeroCaidas: edad > 65 ? document.getElementById('numeroCaidas').value : "0",
        equilibrio: edad > 65 ? document.getElementById('equilibrio').value : "No aplica",
        fechaEncuesta: new Date().toLocaleString()
    };
}

// Función para validar los datos del usuario
function validarDatos(datos) {
    return datos.nombreApellido && 
           datos.edad && 
           datos.email && 
           datos.telefono && 
           datos.realizaDeporte && 
           datos.trabajaComputadora && 
           datos.enfermedadPreexistente;
}

// Función para redirigir al usuario según sus respuestas
function redirigirUsuario(datos) {
    let url = '';
    if (datos.edad > 65) {
        url = 'pages/adultosmayores.html'; 
    } else if (datos.trabajaComputadora === "sí") {
        url = 'pages/trabajoencasa.html'; 
    } else if (datos.realizaDeporte === "sí") {
        url = 'pages/deportistas.html'; 
    } else {
        mostrarError("No se ha seleccionado una opción válida para redirigir.");
        return;
    }
    window.location.href = url;
}

// Funciones para mostrar errores
function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
    });
}

// Maneja el cambio en los campos condicionales
document.getElementById('enfermedadPreexistente').addEventListener('change', function() {
    const container = document.getElementById('enfermedadEspecificaContainer');
    container.style.display = this.value === 'sí' ? 'block' : 'none';
});

document.getElementById('trabajaComputadora').addEventListener('change', function() {
    const container = document.getElementById('computadoraDoloresContainer');
    container.style.display = this.value === 'sí' ? 'block' : 'none';
});

document.getElementById('realizaDeporte').addEventListener('change', function() {
    const container = document.getElementById('deporteDetallesContainer');
    container.style.display = this.value === 'sí' ? 'block' : 'none';
});

document.getElementById('edad').addEventListener('change', function() {
    const container = document.getElementById('mayor65Container');
    const edad = parseInt(this.value);
    container.style.display = edad > 65 ? 'block' : 'none';
});

// Mostrar el número de encuestas al cargar la página
window.addEventListener('load', function() {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = `<p>Encuestas registradas: ${encuestas.length}</p>`;
});
