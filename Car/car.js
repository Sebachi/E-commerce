const hamburguesa = document.querySelector('.hamburguesa');
const burgerIco = document.getElementById('burgerIco');
const menuMobile = document.querySelector('.ulMobile');

let isOpen = false;

hamburguesa.addEventListener('click', (e) => {
    menuMobile.classList.toggle('inactive');
    if (isOpen) {
        burgerIco.src = '/resources/icon-hamburger.svg';
    } else {
        burgerIco.src = '/resources/icon-close.svg';
    }
    isOpen = !isOpen;
});
// Codigo
const CartContainer = document.getElementById('CartContainer')
const URL_LOCAL = "https://ecommercefinalmodulo1back.onrender.com/stockFItems";
const URL_BUYED = "http://localhost:4000/BuyedItems";
// const cartTotal = document.getElementById('cartTotal')
const subtotal = document.getElementById('subtotal')
const total = document.getElementById('total')
const getCart = async () => {
    try {
      const response = await fetch(URL_LOCAL);
      const data = await response.json();
      data.forEach((element) => {
        let newArray = JSON.parse(localStorage.getItem(`usercart${element.id}`));
        if (!(newArray == null)){
            CartContainer.innerHTML += `
            <article class="product_buy_detail productContainer" id="${element.id}">
            <div><figure class="productFigure"><img src="${element.itemImage}" alt=""> </figure></div>
            <div><h3>${element.itemName}</h3>
            <p> Categorie: <span>${element.itemType}</span></p>
            <p> Weight: <span>${element.itemWeight}</span></p>
            </div>
            <div><h3>Price</h3>
              <p id="precio${element.id}"> $ ${element.itemPrice} </p>
            </div>
            <div><h3>Qty</h3>
              <div class="qty_Modifier">
              <button class="operation minus" id="minus${element.id}"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.15" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="#000000"></path> <path d="M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
              <span class="counter" id="counter${element.id}">${newArray}</span>
              <button class="operation plus" id="plus${element.id}"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.15" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="#000000"></path> <path d="M12 7V17M7 12H17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
              </div>
            </div>
            <div><h3>Total</h3>
              <p id="total${element.id}">${element.itemPrice * newArray}</p>
            </div>
            <div><h3>Action</h3>
              <p class="saveForLater">Save for later</p>
              <span class="remove" id="remove${element.id}">Remove</span>
            </div>
          </article>
          <div class="product__divider"></div>
              `;

        ;
    }
    else {

    }
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
// Funcion post
  const saveProduct = async (product) => {
    try {
        const response = await fetch(URL_BUYED, {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                "Content-type": "application/json"
            }
        })
        return response
    } catch(error) {
        console.log(error)
        return error
    }
}
// Document loaded
document.addEventListener("DOMContentLoaded", async () => {
    await getCart();

    const productContainer = document.querySelectorAll(".productContainer");
    let counterTotal =  0
    let productsBuyed = []
    productContainer.forEach((element) => {
      const localProduct = element.getAttribute("id");
      const btnPlus = document.getElementById(`plus${localProduct}`);
      const btnMinus = document.getElementById(`minus${localProduct}`);
      const counter = document.getElementById(`counter${localProduct}`);
    //   const total = document.getElementById(`total${element.id}`)
    //   const precio = document.getElementById(`precio${element.id}`)
      const remove = document.getElementById(`remove${element.id}`)

      btnPlus.addEventListener("click", () => {
        let currentValue = Number(counter.innerText);
        counter.innerText = currentValue + 1;
        let newCart = [

         Number(counter.innerText),

        ]
        localStorage.setItem(`usercart${localProduct}`, JSON.stringify(newCart))
        // let currentTotal = Number(precio.innerText) * Number(counter.innerText)
        // total.innerText  = currentTotal
        location.reload()
      });
      btnMinus.addEventListener("click", () => {
        let currentValue = Number(counter.innerText);
        if (currentValue > 1) {
          counter.innerText = currentValue - 1;
        }
        let newCart = [
           Number(counter.innerText),
        ]
        localStorage.setItem(`usercart${localProduct}`, JSON.stringify(newCart))
        location.reload()
      });
      remove.addEventListener('click', () => {
        localStorage.removeItem(`usercart${localProduct}`)

        location.reload()
      })
      const checkout = document.getElementById('checkout')
      const cartTotal = document.getElementById('cartTotal')
      const formBuyer = document.getElementById('formBuyer')
      const cancelBuy = document.getElementById('cancelBuy')
      const buyNow = document.getElementById('buyNow')

      const subtotal = document.getElementById('subtotal')
      const total = document.getElementById('total')
      checkout.addEventListener('click', () => {
        formBuyer.classList.remove('hidden')
        CartContainer.classList.add('hidden')
        cartTotal.classList.add('hidden')
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
      })
      cancelBuy.addEventListener('click', () => {
        CartContainer.classList.remove('hidden')
        cartTotal.classList.remove('hidden')
        formBuyer.classList.add('hidden')
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
      })
      const itemAmount = localStorage.getItem(`usercart${localProduct}`);
      const nameBuyer = document.getElementById('nameBuyer')
      const form = document.getElementById("form1");

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(nameBuyerValue);
        console.log(document.getElementById("addressBuyer").value);
        productsBuyed =
        {
            id : localProduct,
            itemAmount : itemAmount,
            nameBuyer:  document.getElementById("nameBuyer").value,
            addressBuyer: document.getElementById("addressBuyer").value,
            phoneBuyerValue: document.getElementById("phoneBuyer").value
        }
        saveProduct(productsBuyed)
        alert('Producto comprado exitosamente')
      })





      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
     const currentTotal = document.getElementById(`total${localProduct}`)
     const totalCurrentNumber =  Number(currentTotal.innerText)
     counterTotal += totalCurrentNumber
    });
    const applyBtn = document.getElementById('applyBtn')
    applyBtn.addEventListener('click', () => {
        alert('COUPON NO FOUND')
      })
      subtotal.innerText = counterTotal
      total.innerText = `$ ${counterTotal + 6000}`
  });
