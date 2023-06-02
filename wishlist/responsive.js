// Reponsive Section
const hamburguesa = document.querySelector('.hamburguesa');
const burgerIco = document.getElementById('burgerIco');
const menuMobile = document.querySelector('.ulMobile');
let isOpen = false;
hamburguesa.addEventListener('click', (e) => {
  menuMobile.classList.toggle('inactive');
  if (isOpen) {
    burgerIco.src = "https://sebachi.github.io/FinalModulo1/resources/icon-hamburger.svg";
  } else {
    burgerIco.src = "https://sebachi.github.io/FinalModulo1/resources/icon-close.svg";
  }
  isOpen = !isOpen;
});