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
        if (leftArrow) rightArrow.click();
      }
    });
  });

  const inventoryUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1GmPqpqeJwtefR3tM2hndAI5meeDVRjDljqanIFwGno_VogkYgi-6x1dAVErf_i7QjRP0IfB9c_fF/pub?gid=0&single=true&output=csv";

  const updateStockStatus = async () => {
    try {
      const response = await fetch(inventoryUrl, { cache: "no-store" }); // Ensure fresh data is fetched
      const csvData = await response.text();
      const rows = csvData.split("\n").slice(1).filter(row => row.trim() !== ""); // Skip header row and filter empty rows

      const stock = rows.reduce((acc, row) => {
        const [color, size, quantity] = row.split(",");
        const key = `${color.toLowerCase()}-${size.toUpperCase()}`;
        acc[key] = parseInt(quantity, 10);
        return acc;
      }, {});

      // Update button stock status
      document.querySelectorAll(".size-option").forEach(button => {
        const key = button.dataset.key;
        const availableStock = stock[key] || 0;
        const isOutOfStock = availableStock === 0;
        button.classList.toggle("unavailable", isOutOfStock);
        button.disabled = isOutOfStock;
        button.dataset.maxQuantity = availableStock; // Store max quantity in data attribute
      });

      // Update product card stock status
      document.querySelectorAll(".product-card").forEach(card => {
        const color = card.dataset.color.toLowerCase();
        const sizes = ["S", "M", "L"];
        const isOutOfStock = sizes.every(size => stock[`${color}-${size}`] === 0 || isNaN(stock[`${color}-${size}`])); // Check all sizes
        card.classList.toggle("agotado", isOutOfStock);
      });
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const changeQuantity = (change) => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla.');
      return;
    }
    const maxQuantity = parseInt(document.querySelector(`.size-option[data-key="${selectedColor}-${selectedSize}"]`).dataset.maxQuantity, 10) || 0;
    quantity = Math.max(1, Math.min(maxQuantity, quantity + change));
    document.getElementById('quantity').textContent = quantity;
  };

  // Update stock status immediately on page load
  updateStockStatus();

  // Periodically refresh stock status every 30 seconds
  setInterval(updateStockStatus, 30000);

  // Handle size selection
  document.querySelectorAll(".size-option").forEach(button => {
    button.addEventListener("click", () => {
      if (!button.classList.contains("unavailable")) {
        document.querySelectorAll(".size-option").forEach(option => option.classList.remove("selected"));
        button.classList.add("selected");
      }
    });
  });

  // Apply fade-in effect to all elements with the class 'fade-in-from-top'
  document.querySelectorAll('.fade-in-from-top').forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`; // Staggered animation
    element.classList.add('fade-in-from-top');
  });
});
