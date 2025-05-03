document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.getElementById('navMenu');
  const toggleMenu = () => navMenu.classList.toggle('show');

  document.querySelector(".menu-toggle").addEventListener("click", toggleMenu);
  document.querySelector(".nav-menu-close").addEventListener("click", toggleMenu);

  document.querySelectorAll("#navMenu a").forEach(link => link.addEventListener("click", toggleMenu));

  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !event.target.classList.contains("menu-toggle")) {
      navMenu.classList.remove("show");
    }
  });

  // Restaura el efecto de hover en las imágenes de las cuadrículas
  document.querySelectorAll('.product-image').forEach(image => {
    const hoverSrc = image.dataset.hover;
    const originalSrc = image.src;

    image.addEventListener('mouseenter', () => image.src = hoverSrc);
    image.addEventListener('mouseleave', () => image.src = originalSrc);
  });

  // Habilita funcionalidad táctil para los sliders
  document.querySelectorAll('.slider').forEach(slider => {
    let startX = 0;
    let endX = 0;

    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
      if (startX > endX + 50) {
        // Deslizar hacia la izquierda
        const rightArrow = slider.querySelector('.arrow.right');
        if (rightArrow) rightArrow.click();
      } else if (startX < endX - 50) {
        // Deslizar hacia la derecha
        const leftArrow = slider.querySelector('.arrow.left');
        if (leftArrow) leftArrow.click();
      }
    });
  });
});
