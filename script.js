let imagenActual = 'frente';

function cambiarImagen(color) {
  const img = document.getElementById('slider-img');
  if (imagenActual === 'frente') {
    img.src = `img/${color}-espalda.png`;
    imagenActual = 'espalda';
  } else {
    img.src = `img/${color}-frente.png`;
    imagenActual = 'frente';
  }
}

function enviarWhatsApp(nombreCamisa) {
  const talla = document.getElementById('talla').value;
  const cantidad = document.getElementById('cantidad').value;
  const mensaje = `Hola, quiero comprar la ${nombreCamisa} en talla ${talla}, cantidad: ${cantidad}`;
  const url = `https://wa.me/573176650424?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

function mostrarGuiaTallas() {
  const guia = document.getElementById('guia-tallas');
  guia.style.display = guia.style.display === 'none' ? 'block' : 'none';
}