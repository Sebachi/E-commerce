//
const URL_LOCAL = "https://ecommercefinalmodulo1back.onrender.com/stockFItems";
const wishlistContainer = document.getElementById("wishlistContainer");
const getWishlist = async () => {
  try {
    const response = await fetch(URL_LOCAL);
    const data = await response.json();
    let newArray = JSON.parse(localStorage.getItem("userWishlist"));
    console.log(newArray);
    data.forEach((element) => {
      newArray.forEach((newArrayelement) => {
        if (newArrayelement == element.id) {
          wishlistContainer.innerHTML += `
                      <div id="${element.id}" class="productContainer">
                          <figure class="productFigure">
                      <img src="${element.itemImage}" class="" alt="${element.itemName}">
                           </figure>
                          <button class="wishIcon activated" id="wishIcon${element.id}"><svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" transform="rotate(-45)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>heart</title> <path d="M0.256 12.16q0.544 2.080 2.080 3.616l13.664 14.144 13.664-14.144q1.536-1.536 2.080-3.616t0-4.128-2.080-3.584-3.584-2.080-4.16 0-3.584 2.080l-2.336 2.816-2.336-2.816q-1.536-1.536-3.584-2.080t-4.128 0-3.616 2.080-2.080 3.584 0 4.128z"></path> </g></svg>
                           </button>
                              <div class="productInfo">
                        <p class="productType">${element.itemType}</p>
                            <h3 class="productName">${element.itemName}</h3>
                            <p class="productWeight">${element.itemWeight}</p>
                         <p class="productPrice">${element.itemPrice}</p>
                           </div>
            <div class="qty_Modifier">
            <button class="operation minus" id="minus${element.id}"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.15" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="#000000"></path> <path d="M8 12H16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
            <span class="counter" id="counter${element.id}">0</span>
            <button class="operation plus" id="plus${element.id}"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.15" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill="#000000"></path> <path d="M12 7V17M7 12H17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
             </div>
          </div>
            `;

        }
      });
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await getWishlist();
  const productContainer = document.querySelectorAll(".productContainer");
  productContainer.forEach((element) => {
    const localProduct = element.getAttribute("id");
    const favIcon = document.getElementById(`wishIcon${localProduct}`);
    let userWishlist = JSON.parse(localStorage.getItem("userWishlist"));
    favIcon.addEventListener("click", () => {
      favIcon.classList.remove("activated");
      const index = userWishlist.indexOf(localProduct);
      if (index > -1) {
        userWishlist.splice(index, 1);
      }
      localStorage.setItem("userWishlist", JSON.stringify(userWishlist));
      wishlistContainer.innerHTML = ``;
      console.log(`soy el ${localProduct}`);
      getWishlist()
      location.reload()
    });
    //Botones carrito
    const btnPlus = document.getElementById(`plus${localProduct}`);
    const btnMinus = document.getElementById(`minus${localProduct}`);
    const counter = document.getElementById(`counter${localProduct}`);
    const currentCart = JSON.parse(localStorage.getItem(`usercart${localProduct}`));
    if(!currentCart) {
     counter.innerText = 0
    }
    else{
     counter.innerText = currentCart
   }

    btnPlus.addEventListener("click", () => {
      let currentValue = Number(counter.innerText);
      counter.innerText = currentValue + 1;
      let newCart = [

          Number(counter.innerText),

      ]
      localStorage.setItem(`usercart${localProduct}`, JSON.stringify(newCart))

    });
    btnMinus.addEventListener("click", () => {
      let currentValue = Number(counter.innerText);
      if (currentValue > 0) {
        counter.innerText = currentValue - 1;
      } else {
        counter.innerText = 0;
      }
      let newCart = [

         Number(counter.innerText),

      ]
      localStorage.setItem(`usercart${localProduct}`, JSON.stringify(newCart))
    });



  });
});
