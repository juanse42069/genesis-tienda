document.addEventListener('DOMContentLoaded', () => {
  const toggleMenu = () => {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("show");
  };

  document.querySelector(".menu-toggle").addEventListener("click", toggleMenu);
  document.querySelector(".nav-menu-close").addEventListener("click", toggleMenu);

  document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", toggleMenu);
  });
});
