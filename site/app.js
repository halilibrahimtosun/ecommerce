const navToggle = document.querySelector(".nav-toggle");
const closeBtnSideBar = document.querySelector(".close-btn");
const cartItem = document.querySelector(".cart-item");
const cartNumber = document.querySelector(".cart-numbers"); // Number of the trolley
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverLay = document.querySelector(".cart-overlay");
const cartCenter = document.querySelector(".cart-center");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");
const linkBtn = document.querySelector(".links");
let cart = [];
let buttonsDOM = [];
const products = [
  {
    id: 1,
    title: "botas rosadas",
    category: "mujer",
    price: 2500,
    img: "./images/image1.png",
  },
  {
    id: 2,
    title: "urbanas",
    category: "hombre",
    price: 2600,
    img: "./images/image6.png",
  },
  {
    id: 3,
    title: "zapatillas rosadas",
    category: "infantil",
    price: 1400,
    img: "./images/item-11.jpg",
  },
  {
    id: 4,
    title: "ındumentarias",
    category: "mujer",
    price: 2800,
    img: "./images/image2.png",
  },
  {
    id: 5,
    title: "zapatos hombre",
    category: "hombre",
    price: 3800,
    img: "./images/image7.png",
  },
  {
    id: 6,
    title: "bebes 	&#38 infantes",
    category: "infantil",
    price: 700,
    img: "./images/image12.png",
  },
  {
    id: 7,
    title: "deportiva",
    category: "mujer",
    price: 1800,
    img: "./images/image3.png",
  },
  {
    id: 8,
    title: "urban walking",
    category: "hombre",
    price: 1900,
    img: "./images/image8.png",
  },
  {
    id: 9,
    title: "campera infantil",
    category: "infantil",
    price: 1000,
    img: "./images/image13.png",
  },
  {
    id: 10,
    title: "Campera Roja ",
    category: "mujer",
    price: 2400,
    img: "./images/image4.jpg",
  },
  {
    id: 11,
    title: "Montañas",
    category: "deporte",
    price: 6000,
    img: "./images/image9.png",
  },
  {
    id: 12,
    title: "Camperas ",
    category: "infantil",
    price: 3200,
    img: "./images/image14.gif",
  },
  {
    id: 13,
    title: "Tacos altos",
    category: "mujer",
    price: 3400,
    img: "./images/image5.png",
  },
  {
    id: 14,
    title: "pantolones",
    category: "hombre",
    price: 2000,
    img: "./images/pantolon.jpg",
  },
  {
    id: 15,
    title: "Botas Infantiles",
    category: "infantil",
    price: 1700,
    img: "./images/image15.jpg",
  },
  {
    id: 16,
    title: "deportiva hombre",
    category: "hombre",
    price: 1600,
    img: "./images/image10.jpg",
  },
  {
    id: 17,
    title: "trekking",
    category: "deporte",
    price: 11000,
    img: "./images/kayland.jpg",
  },
  {
    id: 18,
    title: "sendero",
    category: "deporte",
    price: 11900,
    img: "./images/merrel.jpg",
  },
];

window.addEventListener("DOMContentLoaded", function () {
  displayProductsItems(products);
  displayLinks();

  setUpApp();
  cartLogic();
});

function displayProductsItems(productsItems) {
  let displayProducts = productsItems.map(function (item) {
    return ` <article class="product">
          <div class="img-container">
            <img src=${item.img} alt=${item.title} class="product-img" />
            <button class="bag-btn" data-id=${item.id}>
              <i class="fas fa-shopping-cart"></i>
              añadir bolsa
            </button>
          </div>
          <h3>${item.title}</h3>
          <h4>$${item.price}</h4>
        </article>`;
  });
  displayProducts = displayProducts.join("");
  productsDOM.innerHTML = displayProducts;
  getBagButton();
}

function displayLinks() {
  const categories = products.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["todo"]
  );

  const categoryLink = categories
    .map(function (category) {
      return `<li>
      <a class="links-access" href="#" data-access=${category}>${category}</a>
      </li>`;
    })
    .join("");
  linkBtn.innerHTML = categoryLink;
  const linksAccess = document.querySelectorAll(".links-access");
  linksAccess.forEach(function (click) {
    click.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.access;
      const productsCategory = products.filter(function (productsItem) {
        if (productsItem.category === category) {
          return productsItem;
        }
      });
      if (category === "todo") {
        displayProductsItems(products);
      } else {
        displayProductsItems(productsCategory);
      }
    });
  });
}

// Button For side  bar and closing cart

const sideBar = document.querySelector(".sidebar");

navToggle.addEventListener("click", function () {
  sideBar.classList.add("side-bar-add");
});
closeBtnSideBar.addEventListener("click", function () {
  sideBar.classList.remove("side-bar-add");
});
linkBtn.addEventListener("click", function () {
  sideBar.classList.remove("side-bar-add");
});

cartItem.addEventListener("click", (e) => {
  e.preventDefault();
  cartOverLay.classList.add("transparentBcg");
  cartDOM.classList.add("showCart");
});

closeCartBtn.addEventListener("click", () => {
  cartOverLay.classList.remove("transparentBcg");
  cartDOM.classList.remove("showCart");
});

// End of buttons.

function getBagButton() {
  const buttons = [...document.querySelectorAll(".bag-btn")];
  buttonsDOM = buttons;
  buttons.forEach((button) => {
    let id = button.dataset.id;
    let inCart = cart.find((item) => item.id === id);
    if (inCart) {
      button.innerText = "In Cart";
      button.disabled = true;
    }
    button.addEventListener("click", (event) => {
      event.target.innerText = "In Cart";
      event.target.disabled = true;

      // get product from products
      let cartItem = { ...getProduct(id), amount: 1 };

      //add product to the cart
      cart = [...cart, cartItem];

      // save the cart in local storage
      saveCart(cart);
      // set cart values
      this.setCartValues(cart);
      //display cart item
      this.addCartItem(cartItem);
      //show the cart
    });
  });
}

window.localStorage.setItem("products", JSON.stringify(products));
function getProduct(id) {
  let products = JSON.parse(localStorage.getItem("products"));
  return products.find((product) => product.id == id);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function setCartValues() {
  let tempTotal = 0;
  let itemsTotal = 0;
  cart.map((item) => {
    tempTotal += item.price * item.amount;
    itemsTotal += item.amount;
  });
  cartTotal.innerText = parseFloat(tempTotal.toFixed(4));
  cartNumber.innerText = itemsTotal;
}
function addCartItem(item) {
  const div = document.createElement("div");

  div.classList.add("cart-center");
  div.innerHTML = `<div>
              <img src=${item.img} alt="product" />
              <select name="sizes" id="select-size">
                <option value="">seleccione</option>
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
              </select>
            </div>
            <div class="cart-item">
              <h4>${item.title}</h4>
              <h5>$${item.price}</h5>
              <span class="remove-item fas fa-trash" data-id=${item.id}></span>
            </div>
            <div class="amounts">
              <i class="fas fa-plus" data-id=${item.id}></i>
              <p class="item-amount">${item.amount}</p>
              <i class="fas fa-minus" data-id=${item.id}></i>
            </div>`;
  cartContent.appendChild(div);
}
function getCart() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}
function setUpApp() {
  cart = getCart();
  this.setCartValues(cart);
  this.populateCart(cart);
}
function populateCart(cart) {
  cart.forEach((item) => this.addCartItem(item));
}

function cartLogic() {
  clearCartBtn.addEventListener("click", () => {
    this.clearCart();
  });
  cartContent.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
      let removeItem = event.target;
      let id = removeItem.dataset.id;
      cartContent.removeChild(removeItem.parentElement.parentElement);
      cart = cart.filter((item) => item.id != id);
      saveCart(cart);
      setCartValues(cart);
      let button = this.getSingleButton(id);
      button.disabled = false;
      button.innerHTML = ` <i class="fas fa-shopping-cart"></i>
              añadir bolsa`;
    } else if (event.target.classList.contains("fa-plus")) {
      let addAmount = event.target;
      let id = addAmount.dataset.id;
      let tempItem = cart.find((item) => item.id == id);
      tempItem.amount = tempItem.amount + 1;
      saveCart(cart);
      setCartValues(cart);
      addAmount.nextElementSibling.innerText = tempItem.amount;
    } else if (event.target.classList.contains("fa-minus")) {
      let lowerAmount = event.target;
      let id = lowerAmount.dataset.id;
      let tempItem = cart.find((item) => item.id == id);
      tempItem.amount = tempItem.amount - 1;
      if (tempItem.amount > 0) {
        saveCart(cart);
        setCartValues(cart);
        lowerAmount.previousElementSibling.innerText = tempItem.amount;
      } else {
        cartContent.removeChild(lowerAmount.parentElement.parentElement);
        cart = cart.filter((item) => item.id != id);
        saveCart(cart);
        setCartValues(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = ` <i class="fas fa-shopping-cart"></i>
              añadir bolsa`;
      }
    }
  });
}

function clearCart() {
  let cartItems = cart.map((item) => item.id);
  cartItems.forEach((id) => this.removeItem(id));

  while (cartContent.children.length > 0) {
    cartContent.removeChild(cartContent.children[0]);
  }
}
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  this.setCartValues(cart);
  saveCart(cart);
  let button = this.getSingleButton(id);
  button.disabled = false;
  button.innerHTML = ` <i class="fas fa-shopping-cart"></i>
              añadir bolsa`;
}

function getSingleButton(id) {
  return buttonsDOM.find((button) => button.dataset.id == id);
}

// For Google Map

function initMap() {
  let bariloche = { lat: -41.134752, lng: -71.29831 };
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: bariloche,
  });
  let marker = new google.maps.Marker({ position: bariloche, map: map });
}
