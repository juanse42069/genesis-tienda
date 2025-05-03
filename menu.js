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

  const inventoryUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1GmPqpqeJwtefR3tM2hndAI5meeDVRjDljqanIFwGno_VogkYgi-6x1dAVErf_i7QjRP0IfB9c_fF/pub?gid=0&single=true&output=csv";

  const updateStockStatus = async () => {
    try {
      const response = await fetch(inventoryUrl);
      const csvData = await response.text();
      const rows = csvData.split("\n").slice(1); // Skip header row

      const stock = {};
      rows.forEach(row => {
        const [color, size, quantity] = row.split(",");
        const key = `${color.toLowerCase()}-${size.toUpperCase()}`;
        stock[key] = parseInt(quantity, 10);
      });

      // Update button stock status
      document.querySelectorAll(".size-option").forEach(button => {
        const key = button.dataset.key;
        if (stock[key] === 0) {
          button.classList.add("unavailable");
          button.disabled = true;
        } else {
          button.classList.remove("unavailable");
          button.disabled = false;
        }
      });

      // Update product card stock status
      document.querySelectorAll(".product-card").forEach(card => {
        const color = card.dataset.color.toLowerCase();
        const sizes = ["S", "M", "L"];
        const isOutOfStock = sizes.every(size => stock[`${color}-${size}`] === 0);
        if (isOutOfStock) {
          card.classList.add("agotado");
        } else {
          card.classList.remove("agotado");
        }
      });
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  updateStockStatus();

  // Handle size selection
  document.querySelectorAll(".size-option").forEach(button => {
    button.addEventListener("click", () => {
      if (!button.classList.contains("unavailable")) {
        document.querySelectorAll(".size-option").forEach(option => option.classList.remove("selected"));
        button.classList.add("selected");
      }
    });
  });
});
