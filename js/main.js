// js/main.js

import "./reloj.js"
// --- 1. Elementos del DOM ---
// Se declaran una sola vez y se obtienen al inicio
const botonAbrir = document.getElementById('abrir-popup');
const popup = document.getElementById('selector-idioma');
const botonCerrar = document.getElementById('cerrar-popup');
const botonesIdioma = document.querySelectorAll('.idioma-btn');
const testH2Element = document.getElementById('Cambiar-idioma'); // El h2 con ID para probar


// --- 2. Objeto de Traducciones ---
const translations = {
  'es': {
    'page_title': 'Reloj despertador',
    'abrir_popup_btn': 'Cambiar Idioma',
    'popup_title': 'Selecciona tu Idioma',
    'close_btn': 'Cerrar',
    'start_button': 'Iniciar',
    'reset_button': 'Reiniciar',
    'test_h2': 'probamos si el idioma se cambia', // Clave para el h2 de prueba
  },
  'en': {
    'page_title': 'Alarm Clock',
    'abrir_popup_btn': 'Change Language',
    'popup_title': 'Select your Language',
    'close_btn': 'Close',
    'start_button': 'Start',
    'reset_button': 'Reset',
    'test_h2': 'we test if the language changes',
  },
  'fr': {
    'page_title': 'Réveil',
    'abrir_popup_btn': 'Changer de Langue',
    'popup_title': 'Sélectionnez votre Langue',
    'close_btn': 'Fermer',
    'start_button': 'Démarrer',
    'reset_button': 'Réinitialiser',
    'test_h2': 'nous testons si la langue change',
  }
};

// --- 3. Función para aplicar el Idioma ---
function applyLanguage(lang) {
  console.log('Función applyLanguage llamada con idioma:', lang); // Log de depuración
  const dictionary = translations[lang];

  if (!dictionary) {
    console.error(`Idioma ${lang} no soportado.`);
    return;
  }

  // Actualizar el título de la página
  document.title = dictionary['page_title'] || 'Reloj despertador';

  // Actualizar el h2 de prueba
  if (testH2Element) {
    testH2Element.textContent = dictionary['test_h2'];
  } else {
    console.warn('Advertencia: El elemento #Cambiar-idioma no fue encontrado al traducir.');
  }

  // Actualizar el título del popup
  const popupTitleElement = popup.querySelector('h3');
  if (popupTitleElement) {
    popupTitleElement.textContent = dictionary['popup_title'];
  }

  // Actualizar el botón para abrir el popup
  if (botonAbrir) {
    botonAbrir.textContent = dictionary['abrir_popup_btn'];
  }

  // Actualizar el botón para cerrar el popup
  if (botonCerrar) {
    botonCerrar.textContent = dictionary['close_btn'];
  }

  // Actualizar botones de "Iniciar"
  const startButtons = document.querySelectorAll('#onoff_crono, #onoff_temp');
  startButtons.forEach(btn => {
    btn.textContent = dictionary['start_button'];
  });

  // Actualizar botones de "Reiniciar"
  const resetButtons = document.querySelectorAll('#reset_crono, #reset_temp');
  resetButtons.forEach(btn => {
    btn.textContent = dictionary['reset_button'];
  });

  // Guardar la preferencia del usuario en localStorage
  localStorage.setItem('preferredLang', lang);
  // Actualizar el atributo lang del HTML para accesibilidad y SEO
  document.documentElement.lang = lang;
  console.log(`Finalizada la aplicación del idioma: ${lang}`); // Log de depuración
}

// --- 4. Event Listeners y Lógica de Inicio ---

// Abrir el popup al hacer clic en el botón principal
if (botonAbrir) {
  botonAbrir.addEventListener('click', () => {
    console.log('Botón "Cambiar Idioma" clickeado (abre popup).'); // Log
    popup.showModal();
  });
} else {
  console.error('ERROR: El botón #abrir-popup no fue encontrado al asignar el evento.');
}

// Cerrar el popup al hacer clic en el botón de cerrar
if (botonCerrar) {
  botonCerrar.addEventListener('click', () => {
    console.log('Botón "Cerrar" clickeado (cierra popup).'); // Log
    popup.close();
  });
} else {
  console.error('ERROR: El botón #cerrar-popup no fue encontrado al asignar el evento.');
}

// Manejar la selección de idioma al hacer clic en los botones dentro del popup
if (botonesIdioma.length > 0) {
  botonesIdioma.forEach(boton => {
    boton.addEventListener('click', (event) => {
      const nuevoIdioma = event.target.getAttribute('data-lang');
      console.log('Botón de idioma clickeado: ' + nuevoIdioma); // Log
      applyLanguage(nuevoIdioma); // Llama a la función CORRECTA (applyLanguage)
      popup.close(); // Cierra el popup después de seleccionar
    });
  });
} else {
  console.error('ERROR: No se encontraron botones con la clase .idioma-btn al asignar eventos.');
}

// Inicializar el idioma al cargar completamente el contenido del DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded. Inicializando idioma por primera vez o cargando preferido.'); // Log
  const savedLang = localStorage.getItem('preferredLang') || 'es'; // 'es' como idioma por defecto
  applyLanguage(savedLang);
});