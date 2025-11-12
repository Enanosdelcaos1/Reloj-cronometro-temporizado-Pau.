   
 // Elementos de contacto con HTML - DOM
const displayTemp = document.getElementById("temporizador");
const btnTemp = document.getElementById("onoff_temp");
const btnResetTemp = document.getElementById("reset_temp");

// Valores iniciales en pantalla
displayTemp.textContent = "00 : 00 : 00";
btnTemp.textContent = "⏱️ Iniciar";
btnResetTemp.textContent = "🧽 Reset";


// Temporizador
class Temporizador {
    // Método constructor
    constructor(hora, minuto, segundos) {
        this.hora = hora;
        this.minuto = minuto;
        this.segundos = segundos;
        this.activado = false;
        this.intervalId = null;
    }

    // Método para el temporizador, lo que puede hacer
    activar() {
        this.activado = true;

        this.intervalId = setInterval(() => {
            if (this.segundos !== 0) {
                this.segundos--;
                this.mostrarHora();
            } else if (this.segundos == 0 && this.minuto != 0) {
                this.segundos = 59;
                this.minuto--;
                this.mostrarHora();
            } else if (this.minuto == 0 && this.hora != 0 && this.segundos == 0) {
                this.segundos = 59;
                this.minuto = 59;
                this.hora--;
                this.mostrarHora();
            } else if (this.hora == 0 && this.minuto == 0 && this.segundos == 0) {
                this.desactivar();
            }
        }, 1000); // 1 segundo
    }
    desactivar() {
        this.activado = false;
        // Salir del bucle setInterval
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    resetear() {
        this.hora = 0;
        this.minuto = 0;
        this.segundos = 0;
        this.mostrarHora();
    }

    mostrarHora() {
        // Formatear con dos dígitos
        let hora = this.hora < 10 ? "0" + this.hora : this.hora;
        let minuto = this.minuto < 10 ? "0" + this.minuto : this.minuto;
        let segundos = this.segundos < 10 ? "0" + this.segundos : this.segundos;

        displayTemp.textContent = `${hora} : ${minuto} : ${segundos}`;
    }
}

// Instancia del temporizador
const temporizador = new Temporizador(0, 10, 0);
btnTemp.addEventListener("click", () => {
    if (!temporizador.activado) {
        temporizador.activar();
        btnTemp.textContent = "⏱️ Detener";
    } else {
        temporizador.desactivar();
        btnTemp.textContent = "⏱️ Iniciar";
    }
});

btnResetTemp.addEventListener("click", () => {
    temporizador.resetear();
});
temporizador.mostrarHora(); // Mostrar el temporizador inmediatamente al cargar