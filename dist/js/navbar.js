// Navbar
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');
const titleNav = document.querySelector('#title-navbar');

// If hamburger onclick
hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('hamburger-active');
  titleNav.classList.toggle('title-nav');
  navMenu.classList.toggle('nav-menu');
});

// If user clicks outside the nav menu
document.addEventListener('click', function (e) {
  if (e.target !== navMenu && e.target !== hamburger) {
    navMenu.classList.remove('nav-menu');
    hamburger.classList.remove('hamburger-active');
    titleNav.classList.remove('title-nav');
  }
});
