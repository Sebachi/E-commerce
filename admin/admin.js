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

const btnNewProduct = document.querySelector(".nav__item");
const formNewProduct = document.getElementById("formNewProduct");
const URL_API = "https://ecommercefinalmodulo1back.onrender.com/stockFItems";
const allProductsContainer = document.getElementById("allProductsContainer");
const inputName = document.querySelector("#name");
const inputPrice = document.querySelector("#price");
const inputAmount = document.querySelector("#amount");
const inputWeight = document.querySelector("#weight");
const inputType = document.querySelector("#type");
const inputImage = document.querySelector("#image");
const titleForm = document.querySelector(".subtitle");
const btnForm = document.querySelector(".form__btn");

//Codigo
let isEdit = false;
let idProductEdit;

const handleToggleForm = () => {
  formNewProduct.classList.toggle("hidden");
  titleForm.innerHTML = "Nuevo producto";
  btnForm.innerHTML = "Save";
  formNewProduct.reset();
  isEdit = false;
};
//Metodo Get
const getAdmin = async () => {
  const response = await fetch(URL_API);
  const data = await response.json();
  allProductsContainer.innerHTML = "";
  data.forEach((element) => {
    allProductsContainer.innerHTML += `
    <div id="${element.id}" class="productContainer">
      <figure class="productFigure">
       <img src="${element.itemImage}" class="" alt="${element.itemName}" />
      </figure>
      <div class="productInfo">
        <p class="productType">${element.itemType}</p>
        <h3 class="productName">${element.itemName}</h3>
        <p class="productWeight">${element.itemWeight}</p>
        <p class="productPrice">${element.itemPrice}</p>
        <span class="counter" id="counter${element.itemAmount}">Cantidad actual: ${element.itemAmount}</span>
      </div>
      <div class="edit_delete">
          <button class="operation edit" id="edit${element.id}">
          ✏️
          </button>
          <button class="operation delete" id="delete${element.id}">
          ❌
          </button>
        </div>
      </div>

      `;
  });
};



document.addEventListener("DOMContentLoaded", async () => {
  await getAdmin();
  const productContainer = document.querySelectorAll(".productContainer");
  productContainer.forEach((element) => {
    const localProduct = element.getAttribute("id");
    const btnEdit = document.getElementById(`edit${localProduct}`);
    const btnDelete = document.getElementById(`delete${localProduct}`);


 



    btnEdit.addEventListener("click", () => {
      console.log('he recibido el edit');
      handleEdit(localProduct)
    });
    btnDelete.addEventListener("click", () => {
      handleDelete(localProduct)
      console.log('he recibido el delete');
     
    });

  });


});

const handleSubmit = async (event) => {
  event.preventDefault()
  if (!inputName.value || !inputPrice.value || !inputAmount.value || !inputWeight.value || !inputImage.value || !inputType.value) {
      alert('hay campos obligatorios por llenar')
      return
  }
  const newProduct = {
      itemName: inputName.value,
      itemPrice: Number(inputPrice.value),
      itemAmount: Number(inputAmount.value),
      itemWeight: inputWeight.value,
      itemType: inputType.value,
      itemImage: inputImage.value,
  }
  if (isEdit) {
      const response = await updateProduct(newProduct);
      if(response.status == 200) {
          alert('Producto actualizado exitosamente')
      } else {
          alert('Hubo un error al actualizar producto')
      }
  }else {
      const response = await saveProduct(newProduct);
      if(response.status == 201) {
          alert('Producto guardado exitosamente')
      } else {
          alert('Hubo un error al guardar producto')
      }
  }
  formNewProduct.reset()
  formNewProduct.classList.add('hidden')
  location.reload()
  getAdmin()
}



    const updateProduct = async (product) => {
      try {
          const response = await fetch(`${URL_API}/${idProductEdit}`, {
              method: 'PATCH',
              body: JSON.stringify(product),
              headers: {
                  "Content-type": "application/json"
              }
          })
          return response;
      } catch (error) {
          console.log(error);
          return error;
      }
  }
  
  const saveProduct = async (product) => {
      try {
          const response = await fetch(URL_API, {
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
  


    const handleEdit = async (localProduct) => {
      isEdit = true;
      idProductEdit = localProduct;
      //Show the form for editing
      formNewProduct.classList.remove('hidden');
      //Get the product info
      const response = await fetch(`${URL_API}/${localProduct}`);
      const product = await response.json();
      console.log(product)
      //Fill the form with the product
      inputName.value = product.itemName;
      inputPrice.value = product.itemPrice;
      inputAmount.value = product.itemAmount;
      inputWeight.value = product.itemWeight;
      inputType.value = product.itemType;
      inputImage.value = product.inputImage;
      titleForm.innerHTML = 'Actualizar producto';
      btnForm.innerHTML = 'Actualizar';
  }

  const handleDelete = async (localProduct) => {
    console.log(localProduct)
    const response = await fetch(`${URL_API}/${localProduct}`, {
        method: 'DELETE',
    });
    if(response.status === 200) {
        alert('Producto eliminado exitosamente')
    } else {
        alert('Hubo un error al eliminar productos')
    }
    location.reload()
    getAdmin()
  }

  btnNewProduct.addEventListener('click', handleToggleForm)

formNewProduct.addEventListener('submit', (event)=> {
    handleSubmit(event) })