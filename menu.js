document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.getElementById('navMenu');
  const submenu = document.querySelector('.submenu');
  const menuOverlay = document.createElement('div');
  menuOverlay.classList.add('menu-overlay');
  document.body.appendChild(menuOverlay);

  let isOverlayActive = false; // Track if the overlay is active

  const toggleMenu = () => {
    navMenu.classList.toggle('show');
    if (!isOverlayActive) {
      menuOverlay.classList.add('show');
      isOverlayActive = true; // Activate overlay only once
    } else if (!navMenu.classList.contains('show')) {
      menuOverlay.classList.remove('show');
      isOverlayActive = false; // Remove overlay when the main menu is closed
    }
  };

  const toggleSubmenu = () => {
    submenu.classList.toggle('show');
  };

  document.querySelector(".menu-toggle").addEventListener("click", toggleMenu);
  document.querySelector(".nav-menu-close").addEventListener("click", toggleMenu);

  document.querySelector(".submenu-link").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    toggleSubmenu();
  });

  submenu.querySelector(".nav-menu-close").addEventListener("click", () => {
    submenu.classList.remove('show'); // Close submenu with animation
  });

  menuOverlay.addEventListener("click", () => {
    navMenu.classList.remove('show');
    submenu.classList.remove('show'); // Ensure submenu closes with animation
    menuOverlay.classList.remove('show');
    isOverlayActive = false; // Reset overlay state when the main menu is closed
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !submenu.contains(event.target) && !event.target.classList.contains("menu-toggle")) {
      navMenu.classList.remove('show');
      submenu.classList.remove('show'); // Ensure submenu closes with animation
      menuOverlay.classList.remove('show');
      isOverlayActive = false; // Reset overlay state when clicking outside
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
