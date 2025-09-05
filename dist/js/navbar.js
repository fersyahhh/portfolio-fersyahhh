// Hamburger 
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');
const titleNav = document.querySelector('#title-navbar');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('hamburger-active');
    hamburger.classList.toggle('mt-0.5');
    titleNav.classList.toggle('opacity-0');
    titleNav.classList.toggle('opacity-100');
    navMenu.classList.toggle('nav-menu');
})