// elementos de contacto de html
const displayCrono = document.getElementById("cronometro"); // 'cronometro' en minúsculas
const btnCrono = document.getElementById("onoff_crono");   // ID corregido
const btnRest = document.getElementById("reset_crono");   // ID corregido

displayCrono.textContent = "00 : 00 : 00";
btnCrono.textContent = "iniciar";

class Cronometro {
    constructor(hora = 0, minuto = 0, segundos = 0) {
        this.hora = hora;
        this.minuto = minuto;
        this.segundos = segundos;
        this.activado = false;
        this.intervalo = null; // 🔑 ERROR CLAVE: Se añade para guardar el ID de setInterval
    }

    // Método para el incremento del tiempo
    incrementarTiempo() {
        this.segundos++;

        if (this.segundos === 60) {
            this.segundos = 0;
            this.minuto++;
        }

        if (this.minuto === 60) {
            this.minuto = 0;
            this.hora++;
        }
        
        // No es necesario un límite para las horas, puede seguir contando
        this.mostrarHora();
    }

    // Método para iniciar el cronómetro
    activar() {
        if (this.activado) return; // Ya está activo
        this.activado = true;
        
        // 🔑 ERROR CLAVE CORREGIDO: Guarda el ID del intervalo
        this.intervalo = setInterval(() => {
            this.incrementarTiempo();
        }, 1000); 
    }

    // Método para detener el cronómetro
    desactivar() {
        this.activado = false;
        // 🔑 ERROR CLAVE CORREGIDO: Limpia el intervalo guardado
        clearInterval(this.intervalo); 
    }

    // Método para resetear el cronómetro
    resetear() {
        this.desactivar(); // Detiene el cronómetro antes de resetear
        this.hora = 0;
        this.minuto = 0;
        this.segundos = 0;
        this.mostrarHora();
        btnCrono.textContent = "iniciar"; // Asegura que el botón diga 'iniciar' después del reset
    }

    mostrarHora() {
        // Formatear para que siempre tenga 2 dígitos
        let horaFormato = this.hora < 10 ? "0" + this.hora : this.hora;
        let minutoFormato = this.minuto < 10 ? "0" + this.minuto : this.minuto;
        let segundosFormato = this.segundos < 10 ? "0" + this.segundos : this.segundos;

        // 🔑 ERROR CORREGIDO: Usa las variables formateadas
        displayCrono.textContent = `${horaFormato} : ${minutoFormato} : ${segundosFormato}`;
    }
}

// Objeto cronometro
const cronometro = new Cronometro();


//eventos de botones
btnCrono.addEventListener('click', () => {
    if (cronometro.activado) {
        cronometro.desactivar();
        btnCrono.textContent = "iniciar";
    } else {
        cronometro.activar();
        btnCrono.textContent = "detener";
    }
});

btnRest.addEventListener('click', () => {
    cronometro.resetear();
});

// Muestra la hora inicial al cargar
cronometro.mostrarHora();