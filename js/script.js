// Almacena las encuestas en un array
let encuestas = JSON.parse(localStorage.getItem('encuestas')) || [];

// Maneja el evento de envío del formulario
document.getElementById('healthSurvey').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const email = document.getElementById('email').value;
    if (!validarEmail(email)) {
        mostrarError('emailError');
        return;
    } else {
        ocultarError('emailError');
    }
    
    const datosUsuario = obtenerDatosUsuario();
    
    if (validarDatos(datosUsuario)) {
        encuestas.push(datosUsuario);
        localStorage.setItem('encuestas', JSON.stringify(encuestas));
        
        // Redirigir según la edad y las respuestas
        redirigirUsuario(datosUsuario);
    } else {
        alert("Por favor, completa todos los campos requeridos.");
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
    if (datos.edad > 65) {
        window.location.href = 'rutas/pages/adultosmayores.html'; 
    } else if (datos.trabajaComputadora === "sí") {
        window.location.href = 'rutas/pages/trabajoencasa.html'; 
    } else if (datos.realizaDeporte === "sí") {
        window.location.href = 'rutas/pages/deportistas.html'; 
    } else {
        alert("No se ha seleccionado una opción válida para redirigir.");
    }
}

// Funciones para mostrar resultados
function mostrarResultados(datos) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = `
        <h3>Resultados de la encuesta:</h3>
        <p><strong>Nombre y Apellido:</strong> ${datos.nombreApellido}</p>
        <p><strong>Edad:</strong> ${datos.edad}</p>
        <p><strong>Correo electrónico:</strong> ${datos.email}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono}</p>
        <p><strong>Dirección:</strong> ${datos.direccion}</p>
        <p><strong>Realiza Deporte:</strong> ${datos.realizaDeporte}</p>
        <p><strong>Trabaja con la Computadora:</strong> ${datos.trabajaComputadora}</p>
        ${datos.trabajaComputadora === "sí" ? `<p><strong>Dolores cabeza/cervicales:</strong> ${datos.doloresComputadora}</p>` : ''}
        <p><strong>Enfermedad Preexistente:</strong> ${datos.enfermedadPreexistente}</p>
        ${datos.realizaDeporte === "sí" ? `
            <p><strong>Deporte que práctica:</strong> ${datos.tipoDeporte}</p>
            <p><strong>Frecuencia semanal:</strong> ${datos.frecuenciaDeporte}</p>
            <p><strong>Lesiones por deporte:</strong> ${datos.lesionesDeporte}</p>
        ` : ''}
        <p><strong>Enfermedad Específica:</strong> ${datos.enfermedadEspecifica}</p>
        <p><strong>Fecha de la encuesta:</strong> ${datos.fechaEncuesta}</p>
        ${datos.edad > 65 ? `
            <p><strong>Caídas recientes:</strong> ${datos.caidas}</p>
            <p><strong>Número de caídas:</strong> ${datos.numeroCaidas}</p>
            <p><strong>Problemas de equilibrio:</strong> ${datos.equilibrio}</p>
        ` : ''}
        <hr>
        <h4>Total de encuestas almacenadas: ${encuestas.length}</h4>
    `;
}

// Funciones para mostrar y ocultar errores
function mostrarError(id) {
    document.getElementById(id).classList.remove('hidden-field');
}

function ocultarError(id) {
    document.getElementById(id).classList.add('hidden-field');
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

