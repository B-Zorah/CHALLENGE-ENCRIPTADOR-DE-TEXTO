const textoUsuario = document.getElementById("textarea-usuario");
const textoEncriptado = document.getElementById("texto-encriptado");
const areaTextoEncriptado = document.getElementById("area-texto-encriptado");
const alertas = document.getElementById("no-texto");
const muñeco = document.getElementById("muñeco");
const copiar = document.getElementById("botones-seccion2");

//GLOSARIO DE ENCRIPTACIÓN
const encriptacion = {
  "e": "enter",
  "i": "imes",
  "a": "ai",            
  "o": "ober",
  "u": "ufat"
};

//INCRIPTADOR DE TEXTO
function encriptar(texto = textoUsuario.value.toLowerCase()) {
  if (texto === "") {
    manejarInterfaz(false);
    return;
  }
  const resultado = texto.replace(/[eioua]/g, letra => encriptacion[letra]);
  manejarInterfaz(true, resultado);
}

//DESENCRIPTADOR DE TEXTO
function desencriptar(texto = textoUsuario.value.toLowerCase()) {
  if (texto === "") {
    manejarInterfaz(false);
    return;
  }
  const resultado = texto
    .replace(/ufat|ober|ai|imes|enter/g, clave => Object.keys(encriptacion).find(key => encriptacion[key] === clave));
  manejarInterfaz(true, resultado);
}

//ELEMENTOS DE LA INTERFAZ
function manejarInterfaz(hayTexto, resultado = "") {
  areaTextoEncriptado.style.display = hayTexto ? "block" : "none";
  muñeco.style.display = hayTexto ? "none" : "";
  alertas.style.display = hayTexto ? "none" : "block";
  copiar.style.display = hayTexto ? "block" : "none";
  textoEncriptado.innerHTML = resultado;
}

//LIMPIAR
function limpiar() {
  textoUsuario.value = "";
  textoEncriptado.innerHTML = "";
  manejarInterfaz(false);
}

//COPIAR
function botonCopiar() {
  navigator.clipboard.writeText(textoEncriptado.innerHTML)
    .then(() => {
      //SI COPIA CON EXITO
      mostrarNotificacion("Texto copiado con éxito!");
    })
    .catch(err => {
      //SI TUVO ERROR
      console.error("Error al copiar al portapapeles: ", err);
      mostrarNotificacion("Error al copiar el texto.");
    });
}

//NOTIFICACIÓN
function mostrarNotificacion(mensaje) {
  //DISEÑO DE LA NOTIFICACIÓN
  const notificacion = document.createElement("div");
  notificacion.className = "notificacion";
  notificacion.textContent = mensaje;
  document.body.appendChild(notificacion);

  //DURACIÓN DE LA NOTIFICACIÓN
  setTimeout(() => {
    notificacion.style.opacity = 0;
    setTimeout(() => notificacion.remove(), 500);
  }, 2000);
}

