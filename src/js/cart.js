let productsInCart = localStorage.getItem("products-in-cart");
productsInCart = JSON.parse(productsInCart);

const emptyCart = document.querySelector('.emptyCart');
const productsCart = document.querySelector('.productsCart');
const cartActions = document.querySelector('.cartActions');
const ShopCart = document.querySelector('.ShopCart');
let cartDelProduct = document.querySelectorAll(".cartDelProduct");
const cleanCart = document.querySelector(".cleanCart");
const total = document.querySelector(".total");
const cartActCheck = document.querySelector(".cartActCheck");


function loadCart() {
  if (productsInCart && productsInCart.length > 0) {
    emptyCart.classList.add('disable');
    productsCart.classList.remove('disable');
    cartActions.classList.remove('disable');
    ShopCart.classList.add('disable');

    productsCart.innerHTML = ''

    productsInCart.forEach(product => {
      const divCart = document.createElement('div');
      divCart.classList.add('prodCart');
      divCart.innerHTML = `
        <img class="cartImage" src="${product.image}" alt="${product.title}" />
                  <div class="carTitle">
                    <small>Name</small>
                    <h3>${product.title}</h3>
                  </div>
                  <div class="cartQtt">
                    <small>Quantity</small>
                    <p>${product.quantity}</p>
                  </div>
                  <div class="cartPrice">
                    <small>Price</small>
                    <p>${product.price}</p>
                  </div>
                  <div class="carSubtotal">
                    <small>SubTotal</small>
                    <p>$ ${product.precio * product.quantity}</p>
                  </div>
                  <button class="cartDelProduct" id="${product.id}">
                    <i class="bi bi-trash3-fill"></i>
                  </button>`;
                  productsCart.append(divCart)
    });
    btnUpdate();
    updateTotal();
  }else{
    emptyCart.classList.remove('disabled')
    productsCart.classList.add('disabled')
    cartActions.classList.add('disabled')
    ShopCart.classList.add('disabled')
  }
}
loadCart()

function btnUpdate(){
  cartDelProduct = document.querySelectorAll('.cartDelProduct');
  cartDelProduct.forEach(btn => {
    btn.addEventListener('click',deleteItem);
  })
}
function deleteItem(e) {
  Toastify({
      text: "Product Deleted",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true, 
      style: {
        background: "linear-gradient(to right, darkcyan, darkblue)",
        borderRadius: "2rem",
        textTransform: "uppercase",
        fontSize: ".75rem"
      },
      offset: {
          x: '1.5rem', 
          y: '1.5rem' 
        },
      onClick: function(){}
    }).showToast();

  const idBtn = e.currentTarget.id;
  const index = productsInCart.findIndex(product => product.id === idBtn);
  
  productsInCart.splice(index, 1);
  loadCart();

  localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));

}
cleanCart.addEventListener('click',cartcleaner());

function cartcleaner(){
  Swal.fire({
    title: 'Are you sure?',
    icon: 'question',
    /*tml: `You will remove ${productsInCart.reduce((acc, product) => acc + product.quantity, 0)} products.`,*/
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
}).then((result) => {
    if (result.isConfirmed) {
      productsInCart.length == 0;
        localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
        loadCart();
    }
  })
}
function updateTotal(){
  const totalCalc = productsInCart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    total.innerText = `$${totalCalc}`;
}
cartActCheck.addEventListener("click", checkingCart);
function checkingCart() {

    productsInCart.length = 0;
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
    
    emptyCart.classList.add("disabled");
    productsCart.classList.add("disabled");
    cartActions.classList.add("disabled");
    ShopCart.classList.remove("disabled");

}

