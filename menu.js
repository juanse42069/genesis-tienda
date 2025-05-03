document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.getElementById('navMenu');
  const toggleMenu = () => navMenu.classList.toggle('show');

  document.querySelector(".menu-toggle").addEventListener("click", toggleMenu);
  document.querySelector(".nav-menu-close").addEventListener("click", toggleMenu);

  document.querySelectorAll("#navMenu a").forEach(link => link.addEventListener("click", toggleMenu));

  document.querySelectorAll('.product-image').forEach(image => {
    const hoverSrc = image.dataset.hover;
    const originalSrc = image.src;

    image.addEventListener('mouseenter', () => image.src = hoverSrc);
    image.addEventListener('mouseleave', () => image.src = originalSrc);
  });
});
