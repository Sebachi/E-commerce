// Reponsive Section
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

//Declaramos elementos del DOM para manipularlos
const category1 = document.getElementById("categories__1");
const category2 = document.getElementById("categories__2");
const category3 = document.getElementById("categories__3");
const category4 = document.getElementById("categories__4");
const category5 = document.getElementById("categories__5");
const category6 = document.getElementById("categories__6");
const category7 = document.getElementById("categories__7");
const TopSaveToday = document.getElementById("TopSaveToday");

//elimentos aun no existentes
let mainContainer; //se utilizara para posicionar
const headerProductslist = document.getElementsByClassName("headerProductslist")
//lista de todas las categorias 0-6
const CardProductsList = document.getElementsByClassName("CardProductsList");

//const productContainer = document.getElementsByClassName("productContainer");

//eventos

document.addEventListener('DOMContentLoaded', (e) => {
  descuento();
  demasCategorias();
  handleCreateArticle();
})

//mostrar primera categoria
category1.addEventListener('click', (e) => {
  console.log("me undiste 1");
  e.preventDefault();
  handleToggleArticle();
  CardProductsList[0].classList.remove("hidden");
  console.log("funciono 1");
});
category2.addEventListener('click', (e) => {
  e.preventDefault();
  handleToggleArticle();

  CardProductsList[1].classList.remove("hidden");
  console.log("me undiste 2");
});
category3.addEventListener('click', (e) => {
  e.preventDefault();
  handleToggleArticle();

  CardProductsList[2].classList.remove("hidden");
  console.log("me undiste 3");
});
category4.addEventListener('click', (e) => {
  e.preventDefault();
  handleToggleArticle();

  CardProductsList[3].classList.remove("hidden");
  console.log("me undiste 4");
});
category5.addEventListener('click', (e) => {
  e.preventDefault();
  handleToggleArticle();

  CardProductsList[4].classList.remove("hidden");
  console.log("me undiste 5");
});
category6.addEventListener('click', (e) => {
  e.preventDefault();
  handleToggleArticle();

  CardProductsList[5].classList.remove("hidden");
  console.log("me undiste 6");
});
category7.addEventListener('click', (e) => {
  e.preventDefault();
  handleToggleArticle();

  CardProductsList[6].classList.remove("hidden");
  console.log("me undiste 7");
});

//funciones de eventos

//ocultar todas las categorias

const handleToggleArticle = () => {
  headerProductslist[0].classList.add('hidden');
  for (let i = 0; i < CardProductsList.length; i++) {
    CardProductsList[i].classList.add('hidden');
  }
}

//crea la lista de articulos en la main page
const handleCreateArticle = () => {
  stockFItems.forEach(product => {

    //crear elementos de las carta de productos
    const productContainer = document.createElement("div");
    const productFigure = document.createElement("figure");
    const productImage = document.createElement("img");
    const productInfo = document.createElement("div");
    const productType = document.createElement("p");
    const productName = document.createElement("h3");
    const productWeight = document.createElement("p");
    const productPrice = document.createElement("p");

    //seleccionar la categoria a la que ira el producto
    if (product.itemType == "Vegetables" || product.itemType == "Fruits") {
      mainContainer = CardProductsList[0];

    } else if (product.itemType == "Beverages") {
      mainContainer = CardProductsList[1];

    } else if (product.itemType == "Meats" || product.itemType == "Fish") {
      mainContainer = CardProductsList[2];

    } else if (product.itemType == "Frozen Foods") {
      mainContainer = CardProductsList[3];

    } else if (product.itemType == "Biscuits" || product.itemType == "Snacks") {
      mainContainer = CardProductsList[4];

    } else if (product.itemType == "Staples") {
      mainContainer = CardProductsList[5];

    } else {
      mainContainer = CardProductsList[6];
    }

    //propiedad de su articulo principal

    //darle propiedades
    productContainer.setAttribute('id', product.itemId)
    productImage.src = product.itemImage;
    productImage.setAttribute('alt', product.itemName);
    productType.innerText = product.itemType;
    productName.innerText = product.itemName;
    productWeight.innerText = product.itemWeight;
    productPrice.innerText = `$ ${product.itemPrice}`;

    //darle clases
    productContainer.classList.add('productContainer')

    productFigure.classList.add("productFigure");
    productImage.classList.add("productImage");

    productInfo.classList.add("productInfo");
    productType.classList.add("productType");
    productName.classList.add("productName");
    productWeight.classList.add("productWeight");
    productPrice.classList.add("productPrice");

    //posicionarlos en el HTML
    mainContainer.appendChild(productContainer)
    productContainer.appendChild(productFigure);
    productFigure.appendChild(productImage);
    productContainer.appendChild(productInfo);
    productInfo.appendChild(productType);
    productInfo.appendChild(productName);
    productInfo.appendChild(productWeight);
    productInfo.appendChild(productPrice);
  }
  )
};

//crear la lista de descuentos
const descuento = () => {
  headerProductslist[0].innerHTML = `
          <h3>Top Save Today</h3>
          <img src="" alt="HrPlant">
          <p>Dont miss this opportunity at a special discount just for this week.</p>
          <button><img src="" alt="reloj"> Expires in: 349:3:45:37 </button>
`
};

const demasCategorias = () => {
  TopSaveToday.innerHTML += `
  <article id="CardProductsList1" class="CardProductsList hidden">
  </article>
  <article id="CardProductsList2" class="CardProductsList hidden">
  </article>
  <article id="CardProductsList3" class="CardProductsList hidden">
  </article>
  <article id="CardProductsList4" class="CardProductsList hidden">
  </article>
  <article id="CardProductsList5" class="CardProductsList hidden">
  </article>
  <article id="CardProductsList6" class="CardProductsList hidden">
  </article>
  <article id="CardProductsList7" class="CardProductsList hidden">
  </article>
  `
}