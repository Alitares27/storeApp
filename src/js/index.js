let products = [];
fetch("./src/js/data.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts(products);
    })


const productsContainer = document.querySelector(".productsContainer");
const btnsCategory = document.querySelectorAll(".btnCategory");
const mainTitle = document.querySelector(".mainTitle");
let addCart = document.querySelectorAll('.addCart');
const number = document.querySelector('.number')

btnsCategory.forEach(btn => btn.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function displayProducts(filteredProducts) {

    productsContainer.innerHTML = "";

    filteredProducts.forEach(product => {

        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
        <img class='productImage' src='${product.image}' alt='${product.title}' />
        <div class='productDetails'>
          <h3 class='productName'>${product.title}</h3>
          <p class='productPrice'>$ ${product.price}</p>
          <button class='addCart' id='${product.id}'>Add Cart</button>
        </div>`;

        productsContainer.append(div);
    })

    updateAddCartBtn()
}


btnsCategory.forEach(btn => {
    btn.addEventListener("click", (e) => {

        btnsCategory.forEach(btn => btn.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "all") {
            const productCategory = products.find(product => product.category.id === e.currentTarget.id);
            mainTitle.innerText = productCategory.category.name;
            const productsBtn = products.filter(product => product.category.id === e.currentTarget.id);
            displayProducts(productsBtn);
        } else {
            mainTitle.innerText = "All Products";
            displayProducts(products);
        }

    })
});

function updateAddCartBtn() {
    addCart = document.querySelectorAll('.addCart');

    addCart.forEach(btn => {
        btn.addEventListener("click", addToCart);
    });
}

let productsInCart;

const productsInCartLS = JSON.parse(localStorage.getItem('products-In-Cart'));

if (productsInCartLS) {
    productsInCart = JSON.parse(productsInCartLS);
    updateQtt();
} else {
    productsInCart = [];
}

function addToCart(e) {

    Toastify({
        text: "product Added",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBtn = e.currentTarget.id;
    const productAdded = products.find(product => product.id === idBtn);
  
    if(productsInCart.some(product => product.id === idBtn))  {
        const index = productsInCart.findIndex(product => product.id === idBtn);
        productsInCart[index].quantity++;
    } else {
        productAdded.quantity = 1;
        productsInCart.push(productAdded);
    }
    updateQtt();

    localStorage.setItem('products-In-Cart',JSON.stringify(productsInCart));
}

function updateQtt() {
    let newNumber = productsInCart.reduce((acc, product) => acc + product.quantity, 0);
    number.innerText = newNumber;
}