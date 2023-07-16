const baseURL = "./src/js/data.json";

async function fetchProducts() {
  const response = await fetch(baseURL);
  const data = await response.json();
  console.log(data);
  displayProducts(data);
}
fetchProducts();



function displayProducts(filteredProducts) {

  const productsContainer = document.querySelector(".productsContainer");

  productsContainer.innerHTML = "";

  filteredProducts.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <img class='productImage' src='${product.image}' alt='${product.title}' />
    <div class='productDetails'>
      <h3 class='productName'>${product.title}</h3>
      <p class='productPrice'>$ ${product.price}</p>
      <button class='addCart' id='${product.id}'>Add Cart</button>
    </div>`;
    productsContainer.appendChild(productDiv);

  });
  updateAddCartBtn()
  console.log(addCart)
}
const btnsCategory = document.querySelectorAll(".btnCategory");
const mainTitle = document.querySelector(".mainTitle");

btnsCategory.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btnsCategory.forEach((btn) => btn.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "All") {
      const productCategory = data.find(product => product.category.id === e.currentTarget.id);

      mainTitle.innerHTML = productCategory.category.name;

      const productsBtn = data.filter(
        (product) => product.category.id === e.currentTarget.id);
      displayProducts(productsBtn);
    }else{
      mainTitle.innerHTML = "All Products"
      displayProducts(products);
    }
  });
});

let addCart = document.querySelectorAll('.addCart');

function updateAddCartBtn(){
  addCart = document.querySelectorAll('.addCart');

  addCart.forEach(btn => {
    btn.addEventListener("click", addToCart);
  })
}

let productsInCart;

const number = document.querySelector('number')

const productsInCartLS = JSON.parse(localStorage.getItem('products-In-Cart'));
if (productsInCartLS){
    productsInCart = productsInCartLS
    updateQtt()
}else{
  productsInCart = []
}
const productsCart = []

function addToCart(e){
  const idBtn = e.currentTarget.id;
  console.log(idBtn)

  const productAdded = products.find(product.id === idBtn)
  console.log(productAdded)

if (productsInCart.some(product => product.id === idBtn)){
  const index = productsInCart.findIndex(product => product.id === idBtn);
  productsInCart[index].quantity++;
  console.log(index)
}else{
  productAdded.quantity = 1
  productsInCart.push(productAdded);
  console.log(productsInCart)
}

updateQtt()
console.log(productsInCart)

localStorage.setItem('products-In-Cart',JSON.stringify(productsCart));

}
function updateQtt(){
  let newNumber = productsInCart.reduce((acc,product) => acc + product.quantity,0);
  number.innerHTML = newNumber;
}

