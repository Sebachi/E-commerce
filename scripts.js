// Reponsive Section
const hamburguesa = document.querySelector(".hamburguesa");
const burgerIco = document.getElementById("burgerIco");
const menuMobile = document.querySelector(".ulMobile");
let isOpen = false;
hamburguesa.addEventListener("click", (e) => {
  menuMobile.classList.toggle("inactive");
  if (isOpen) {
    burgerIco.src = "resources/icon-hamburger.svg";
  } else {
    burgerIco.src = "resources/icon-close.svg";
  }
  isOpen = !isOpen;
});

//Declaramos elementos del DOM para manipularlos
const category1 = document.getElementById("categories__1");
const category2 = document.getElementById("categories__2");
const category3 = document.getElementById("categories__3");
const category4 = document.getElementById("categories__4");
const category5 = document.getElementById("categories__5");
const category6 = document.getElementById("categories__6");
const category7 = document.getElementById("categories__7");
const topSaveToday = document.getElementById("TopSaveToday");
const URL_LOCAL = "https://ecommercefinalmodulo1back.onrender.com/stockFItems";
const CardProductsList = document.getElementsByClassName("CardProductsList");
let mainContainer; //se utilizara para posicionar
const headerProductslist =
  document.getElementsByClassName("headerProductslist");

const getProducts = async () => {
  try {
    const response = await fetch(URL_LOCAL);
    const data = await response.json();
    data.forEach((element) => {
      if (element.itemType == "Vegetables" || element.itemType == "Fruits") {
        mainContainer = CardProductsList[0];
      } else if (element.itemType == "Beverages") {
        mainContainer = CardProductsList[1];
      } else if (element.itemType == "Meats" || element.itemType == "Fish") {
        mainContainer = CardProductsList[2];
      } else if (element.itemType == "Frozen Foods") {
        mainContainer = CardProductsList[3];
      } else if (
        element.itemType == "Biscuits" ||
        element.itemType == "Snacks"
      ) {
        mainContainer = CardProductsList[4];
      } else if (element.itemType == "Staples") {
        mainContainer = CardProductsList[5];
      } else {
        mainContainer = CardProductsList[6];
      }

      mainContainer.innerHTML += `
    <div id="${element.id}" class="productContainer">
      <figure class="productFigure">
        <img src="${element.itemImage}" class="" alt="${element.itemName}">
      </figure>
      <button class="wishIcon" id="wishIcon${element.id}"><svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>heart</title> <path d="M0.256 12.16q0.544 2.080 2.080 3.616l13.664 14.144 13.664-14.144q1.536-1.536 2.080-3.616t0-4.128-2.080-3.584-3.584-2.080-4.16 0-3.584 2.080l-2.336 2.816-2.336-2.816q-1.536-1.536-3.584-2.080t-4.128 0-3.616 2.080-2.080 3.584 0 4.128z"></path> </g></svg>
      </button>
      <div class="productInfo">
        <p class="productType">${element.itemType}</p>
        <h3 class="productName">${element.itemName}</h3>
        <p class="productWeight">${element.itemWeight}</p>
        <p class="productPrice"> <span>$</span> ${element.itemPrice}</p>
      </div>
      <div class="qty_Modifier">
      <button class="operation minus" id="minus${element.id}"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.15" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="#000000"></path> <path d="M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
      <span class="counter" id="counter${element.id}">0</span>
      <button class="operation plus" id="plus${element.id}"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.15" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="#000000"></path> <path d="M12 7V17M7 12H17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>


      </div>
    </div>
      `;
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//mostrar primera categoria
category1.addEventListener("click", (e) => {
  e.preventDefault();
  handleToggleArticle();
  CardProductsList[0].classList.remove("hidden");
});
category2.addEventListener("click", (e) => {
  e.preventDefault();
  handleToggleArticle();
  CardProductsList[1].classList.remove("hidden");
});
category3.addEventListener("click", (e) => {
  e.preventDefault();
  handleToggleArticle();

  CardProductsList[2].classList.remove("hidden");
  console.log("me undiste 3");
});
category4.addEventListener("click", (e) => {
  e.preventDefault();
  handleToggleArticle();

  CardProductsList[3].classList.remove("hidden");
  console.log("me undiste 4");
});
category5.addEventListener("click", (e) => {
  e.preventDefault();
  handleToggleArticle();

  CardProductsList[4].classList.remove("hidden");
  console.log("me undiste 5");
});
category6.addEventListener("click", (e) => {
  e.preventDefault();
  handleToggleArticle();

  CardProductsList[5].classList.remove("hidden");
  console.log("me undiste 6");
});
category7.addEventListener("click", (e) => {
  e.preventDefault();
  handleToggleArticle();

  CardProductsList[6].classList.remove("hidden");
  console.log("me undiste 7");
});

//funciones de eventos

//ocultar todas las categorias

const handleToggleArticle = () => {
  headerProductslist[0].classList.add("hidden");
  for (let i = 0; i < CardProductsList.length; i++) {
    CardProductsList[i].classList.add("hidden");
  }
};

//crea la lista de articulos en la main page

//crear la lista de descuentos
const descuento = () => {
  headerProductslist[0].innerHTML = `
          <h3>Top Save Today</h3>
          <img src="" alt="HrPlant">
          <p>Dont miss this opportunity at a special discount just for this week.</p>
          <button><img src="" alt="reloj"> Expires in: 349:3:45:37 </button>
`;
};

let user = JSON.parse(localStorage.getItem("user"));
let userWishlist = JSON.parse(localStorage.getItem("userWishlist"));
const idWishIcon = document.addEventListener("DOMContentLoaded", async () => {
  await getProducts();
  descuento();
  const productContainer = document.querySelectorAll(".productContainer");
  productContainer.forEach((element) => {
    const localProduct = element.getAttribute("id");
    const btnPlus = document.getElementById(`plus${localProduct}`);
    const btnMinus = document.getElementById(`minus${localProduct}`);
    const counter = document.getElementById(`counter${localProduct}`);
    const favIcon = document.getElementById(`wishIcon${localProduct}`);
    const heartActivated = JSON.parse(localStorage.getItem("userWishlist"));
    heartActivated.forEach((heart) => {
      if (heart == localProduct) {
        favIcon.classList.add("activated");
    }})
    btnPlus.addEventListener("click", () => {
      let currentValue = Number(counter.innerText);
      counter.innerText = currentValue + 1;
    });
    btnMinus.addEventListener("click", () => {
      let currentValue = Number(counter.innerText);
      if (currentValue > 0) {
        counter.innerText = currentValue - 1;
      } else {
        counter.innerText = 0;
      }
    });
    favIcon.addEventListener("click", () => {
      if (!favIcon.classList.contains("activated")) {
        console.log("Hola soy yo");
        favIcon.classList.add("activated");
        userWishlist.push(localProduct);
        localStorage.setItem("userWishlist", JSON.stringify(userWishlist));
      } else {
        favIcon.classList.remove("activated");
        console.log("soy el else");
        userWishlist = userWishlist.filter((item) => item !== localProduct);
        localStorage.setItem("userWishlist", JSON.stringify(userWishlist));
      }
    });
  });
});

const adminbutton = document.getElementsByClassName('adminbutton')

adminbutton.addEventListener('click', () => {
  window.location.href = "/admin/admin.html"
})

window.saveCardElements = () => {};
