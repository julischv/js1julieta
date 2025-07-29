document.getElementById('healthSurvey').addEventListener('submit', function(event) {
    event.preventDefault(); 

  
    const nombreApellido = document.getElementById('nombreApellido').value;
    const edad = document.getElementById('edad').value;
    const realizaDeporte = document.getElementById('realizaDeporte').value;
    const trabajaComputadora = document.getElementById('trabajaComputadora').value;
    const enfermedadPreexistente = document.getElementById('enfermedadPreexistente').value;
    const enfermedadEspecifica = enfermedadPreexistente === "sí" ? document.getElementById('enfermedadEspecifica').value : "";

  
    const datosUsuario = {
        nombreApellido,
        edad,
        realizaDeporte,
        trabajaComputadora,
        enfermedadPreexistente,
        enfermedadEspecifica
    };

 
    localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));

   
    mostrarResultados(datosUsuario);
});


function mostrarResultados(datos) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = `
        <h3>Resultados:</h3>
        <p><strong>Nombre y Apellido:</strong> ${datos.nombreApellido}</p>
        <p><strong>Edad:</strong> ${datos.edad}</p>
        <p><strong>Realiza Deporte:</strong> ${datos.realizaDeporte}</p>
        <p><strong>Trabaja con la Computadora:</strong> ${datos.trabajaComputadora}</p>
        <p><strong>Enfermedad Preexistente:</strong> ${datos.enfermedadPreexistente}</p>
        ${datos.enfermedadEspecifica ? `<p><strong>Enfermedad Específica:</strong> ${datos.enfermedadEspecifica}</p>` : ''}
    `;
}


document.getElementById('enfermedadPreexistente').addEventListener('change', function() {
    const container = document.getElementById('enfermedadEspecificaContainer');
    container.style.display = this.value === 'sí' ? 'block' : 'none';
});

