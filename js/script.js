
function simulador() {

    const nombreApellido = prompt("Por favor, ingresa tu nombre y apellido:");

    const edad = prompt("¿Cuál es tu edad?");


    const realizaDeporte = prompt("¿Realizas deporte? (sí/no)");


    const trabajaComputadora = prompt("¿Trabajas con la computadora? (sí/no)");


    const enfermedadPreexistente = prompt("¿Padeces alguna enfermedad preexistente? (sí/no)");

    let enfermedadEspecifica = "";
    if (enfermedadPreexistente.toLowerCase() === "sí") {
        enfermedadEspecifica = prompt("¿Cuál es la enfermedad preexistente?");
    }


    console.log("Nombre y Apellido:", nombreApellido);
    console.log("Edad:", edad);
    console.log("Realiza Deporte:", realizaDeporte);
    console.log("Trabaja con la Computadora:", trabajaComputadora);
    console.log("Enfermedad Preexistente:", enfermedadPreexistente);
    if (enfermedadEspecifica) {
        console.log("Enfermedad Específica:", enfermedadEspecifica);
    }
}

simulador();
