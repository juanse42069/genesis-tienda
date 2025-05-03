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
});
