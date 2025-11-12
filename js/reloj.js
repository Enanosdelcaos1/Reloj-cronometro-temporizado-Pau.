// Elementos de contacto con HTML - DOM
const displayReloj = document.getElementById("reloj");

// Valores iniciales en pantalla
displayReloj.textContent = "00 : 00 : 00";

// Implementación del reloj
 class Reloj {
    // Método constructor
    constructor() {}

    mostrarHora() {
        const ahora = new Date();
        let hora = ahora.getHours();
        let minuto = ahora.getMinutes();
        let segundos = ahora.getSeconds();

        // Formatear con dos dígitos
        hora = hora < 10 ? "0" + hora : hora;
        minuto = minuto < 10 ? "0" + minuto : minuto;
        segundos = segundos < 10 ? "0" + segundos : segundos;

        displayReloj.textContent = `${hora} : ${minuto} : ${segundos}`;
    }
}

// Instancia del reloj
const reloj = new Reloj();
setInterval(() => reloj.mostrarHora(), 1000); // Actualizar cada segundo
reloj.mostrarHora(); // Mostrar la hora inmediatamente al cargar