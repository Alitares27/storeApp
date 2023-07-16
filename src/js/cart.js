const productsInCart = JSON.parse(localStorage.getItem('products-In-Cart'));
console.log(productsInCart)

const emptyCart = document.querySelector('.emptyCart');
const productsCart = document.querySelector('.productsCart');
const cartActions = document.querySelector('.cartActions');
const ShopCart = document.querySelector('.ShopCart');

if (productsInCart){
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
                <small>${product.title}</small>
                <h3>Name</h3>
              </div>
              <div class="cartQtt">
                <small>${product.quantity}</small>
                <p>1</p>
              </div>
              <div class="cartPrice">
                <small>${product.price}</small>
                <p>1000</p>
              </div>
              <div class="carSubtotal">
                <small>$ ${product.precio * product.quantity}</small>
                <p>2000</p>
              </div>
              <button class="cartDelProduct" id="${product.id}">
                <i class="bi bi-trash3-fill"></i>
              </button>`;
              productsCart.append(div)
    });

}else{

}