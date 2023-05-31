const hamburguesa = document.querySelector('.hamburguesa');
const burgerIco = document.getElementById('burgerIco');
const menuMobile = document.querySelector('.ulMobile');

let isOpen = false;

hamburguesa.addEventListener('click', (e) => {
    menuMobile.classList.toggle('inactive');
    if (isOpen) {
        burgerIco.src = 'resources/icon-hamburger.svg';
    } else {
        burgerIco.src = 'resources/icon-close.svg';
    }
    isOpen = !isOpen;
});
