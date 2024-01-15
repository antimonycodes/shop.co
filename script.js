document.addEventListener("DOMContentLoaded", function () {
  let menuBtn = document.querySelector("#menubtn");
  let sideNav = document.querySelector("#sidenav");
  let menuImage = document.querySelector("#menubtn img");

  menuBtn.onclick = function () {
    let computedStyle = window.getComputedStyle(sideNav);
    let sideNavLeft = computedStyle.getPropertyValue("left");

    if (sideNavLeft === "0px") {
      sideNav.style.left = "-250px";
      menuImage.src = "/icons8-hamburger-menu-30.png";
    } else {
      sideNav.style.left = "0px";
      menuImage.src = "/closee.png";
    }
  };
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the dropdown icon element
  let dropDownIcon = document.querySelector(".drop-down");

  // Add click event listener to toggle dropdown visibility
  dropDownIcon.addEventListener("click", function () {
    let dropdownList = dropDownIcon
      .closest(".shop")
      .querySelector(".drop-down-list");
    dropdownList.style.display =
      dropdownList.style.display === "block" ? "none" : "block";
  });
});

// PRODUCT LIST
// Function to fetch and display products
const displayProducts = async (category, containerId) => {
  try {
    // Fetch a list of products from the specified API endpoint
    let response = await fetch(
      `https://fakestoreapi.com/products/category/${category}?limit=4`
    );

    // Convert the fetched data to JSON
    let products = await response.json();
    console.log(products);
    // **Save products to local storage**
    localStorage.setItem(`products_${category}`, JSON.stringify(products));

    // Get the container element where the products will be displayed
    const productDisplay = document.getElementById(containerId);

    // Loop through each product in the list
    products.forEach((product) => {
      // Create a div element to represent a product
      const productDiv = document.createElement("div");
      productDiv.classList.add("product"); // Add a CSS class for styling

      // Set the HTML content of the product div with product information
      productDiv.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <h3>${product.title}</h3>
        <h5>Rating: ${product.rating.rate}  Count: ${product.rating.count}</h5>
        <p>$${product.price}</p>    
      `;

      // Add a click event listener to redirect to the product details page when clicked
      productDiv.addEventListener("click", () => {
        window.location.href = `shop.html?id=${product.id}`;
      });

      // Append the product div to the container
      productDisplay.appendChild(productDiv);
    });

    // Create a "View All" button
    const button = document.createElement("button");
    button.id = "viewAllBtn";
    button.textContent = "View All";

    // Append the "View All" button to the parent container
    productDisplay.parentElement.appendChild(button);

    // Create an <hr> element and append it to the parent container
    const hr = document.createElement("hr");
    productDisplay.parentElement.appendChild(hr);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call the function to display a list of new arrival products.
displayProducts("electronics", "na-display");

// Call the function to display a list of top-selling products.
displayProducts("jewelery", "ts-display");

// To display product details
let getProductDetails = async (id) => {
  // Fetch product details based on the provided product ID
  let response = await fetch(`https://fakestoreapi.com/products/${id}`);
  // Convert the fetched data to JSON
  let product = await response.json();
  // Return the product details
  return product;
};

// Function to generate SVG rating icons
const generateRatingIcons = (rating) => {
  const maxRating = 5;
  let svgCode = "";
  for (let i = 0; i < maxRating; i++) {
    svgCode += `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
                      <path d="M11.7925 0L15.2932 7.53796L23.544 8.53794L17.4567 14.1966L19.0553 22.3526L11.7925 18.3119L4.52969 22.3526L6.12829 14.1966L0.0410357 8.53794L8.29182 7.53796L11.7925 0Z" fill="${
                        i < rating ? "#FFC633" : "none"
                      }"/>
                    </svg>`;
  }
  return svgCode;
};

// let starsIcon = document.getElementById("stars");
// function starss() {
//   generateRatingIcons();
// }
// starss();

let count = 0; // Counter variable, you can adjust the initial count as needed

// Function to increment the counter
function increment() {
  count++;
  updateCounter();
}

// Function to decrement the counter
function decrement() {
  if (count > 0) {
    count--;
    updateCounter();
  }
}

// Function to update the displayed counter value
function updateCounter() {
  document.querySelector(".count-el").innerText = count;
}

function updateCartCounter() {
  const cartCounter = document.querySelector(".cart-counter");
  if (cartCounter) {
    cartCounter.innerText = cart.length;
  }
}

// Function to save the cart to local storage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to add the product to the cart
let cart = [];
let cartCounter = document.querySelector(".cart-counter");

function addToCart() {
  // Check if it is in the cart and the quantity is greater than zero
  if (count > 0) {
    let existsInCart = cart.find((item) => item.id == details.id);
    if (existsInCart) {
      existsInCart.quantity += count; // Update quantity in cart based on the counter
    } else {
      details.quantity = count;
      cart.push(details);
    }

    // cartCounter.innerText = cart.length;
    // Save the cart to local storage
    saveCartToLocalStorage();

    // Update the cart counter
    updateCartCounter();
    console.log(cart);
    // Call displayCart to update the cart display
    displayCart();
  }
  // displayCart();
}

function displayCart() {
  console.log("Displaying cart...");
  // Get the cart display element
  // const cartDisplay = document.getElementsByClassName("cart-display");
  const cartDisplay = document.querySelector(".cart-container");

  // Check if the cart display element exists
  if (cartDisplay) {
    // Clear the previous content in the cart display
    cartDisplay.innerHTML = "";

    const cartItems = JSON.parse(localStorage.getItem("cart"));

    // Loop through each item in the cart
    cartItems.forEach((item, index) => {
      // Create a div element to represent a cart item
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-display"); // Add a CSS class for styling

      // Set the HTML content of the cart item div with item information
      cartItemDiv.innerHTML = `
       

        <div class="cart-items">
        <div class="cart-items-img">
              <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-items-info">
           <h3>${item.title}</h3>
          <h4>Quantity: ${item.quantity}</h4>
          <p>Price: $${item.price}</p>
        </div>
        <div class="del-btn">
        <img class="delete-btn" src="/Vector (6).png" alt="" onclick="removeCartItem(${index})">
         <div class="counter">
              <ion-icon class="minus" onclick="decrement()" name="remove-outline"></ion-icon>
              <h1 class="count-el">0</h1>
              <ion-icon  class="plus" onclick="increment()"  name="add-outline"></ion-icon>
            </div>
            </div>
        </div>
    <div class="summary">
  <h2>Order Summary</h2>
  <div class="summary-item">
    <span class="summary-label">Subtotal:</span>
    <span class="summary-value">$<span id="subTotal">${calculateSub()}</span></span>
  </div>
  <div class="summary-item">
    <span class="summary-label">Discount:</span>
    <span class="summary-value">-$${(calculateSub() * 0.2).toFixed(2)}</span>
  </div>
  <div class="summary-item">
    <span class="summary-label">Delivery fee:</span>
    <span class="summary-value">$5.00</span>
  </div>
  <hr/>
  <div class="summary-item">
    <span class="summary-label">Total:</span>
    <span class="summary-value">$<span id="totalCost">${calculateTotal()}</span></span>
  </div>
  <div class="promo">
<input type="text" id="promo-code" placeholder="Add promo code">
<button id="apply-btn">Apply</button>

</div>
<button class="checkout">Go to checkout<ion-icon name="arrow-forward-outline"></ion-icon></button>
</div>


      `;

      // Append the cart item div to the cart display
      cartDisplay.appendChild(cartItemDiv);
    });
  } else {
    console.error("Cart display element not found");
  }
  // Call the displayCart function whenever you want to refresh the cart display
}
displayCart();

// Function to remove a cart item by index
function removeCartItem(index) {
  let cartItems = JSON.parse(localStorage.getItem("cart"));

  // Remove the item at the specified index
  cartItems.splice(index, 1);

  // Update local storage with the modified cart
  localStorage.setItem("cart", JSON.stringify(cartItems));

  // Refresh the cart display
  displayCart();
}

// Call the displayCart function whenever you want to refresh the cart display
displayCart();

function calculateSub() {
  const cartItems = JSON.parse(localStorage.getItem("cart"));

  if (cartItems) {
    return cartItems.reduce((subtotal, item) => {
      return subtotal + item.price * item.quantity;
    }, 0);
  } else {
    return 0; // Default to 0 if there are no items in the cart
  }
}
function calculateTotal() {
  const subtotal = calculateSub();
  const discount = 20;
  const deliveryFee = 15;

  const discountAmount = (subtotal * discount) / 100;
  const totalCost = subtotal - discountAmount + deliveryFee;

  return totalCost.toFixed(2); // Round to two decimal places
}

let details;

let displayProductDetails = async () => {
  // Get the product ID from the URL query parameter
  let id = window.location.search.split("=")[1];
  // Fetch and display details of the specified product
  details = await getProductDetails(id);

  // Get the HTML elements where the product will be displayed
  let displayCon = document.getElementById("generalDisplayCon");

  const roundedPrice = Math.round(details.price + 40);

  // Set the HTML content of displayCon
  displayCon.innerHTML = `
        <div class="images-con">
          <div class="crop">
            <img src="${details.image}" alt="${details.title}" />
            <img src="${details.image}" alt="${details.title}" />
            <img src="${details.image}" alt="${details.title}" />
          </div>
          <div class="full-img">
            <img src="${details.image}" alt="${details.title}" />
          </div>
        </div>
         <div class="content-con">
          <h1>${details.title}</h1>
          <h5>${generateRatingIcons(details.rating.rate)} ${
    details.rating.rate
  }/<span>5<span></h5>
          <h2>$${
            details.price
          } <span>$${roundedPrice}</span>  <span class="off">-40%<span></h2>
          <p>${details.description}</p>
          <hr/>
          <p class="color">Select Colors</p>
          <div class="color-options">
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
              <circle cx="18.5" cy="18.5" r="18.5" fill="#4F4631"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
              <circle cx="18.5" cy="18.5" r="18.5" fill="#314F4A"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
              <circle cx="18.5" cy="18.5" r="18.5" fill="#31344F"/>
            </svg>
          </div>
          <hr/>
          <p>Choose Size</p>
          <div class="size-btn">
            <button>Small</button>
            <button>Medium</button>
            <button>Large</button>
            <button>X-large</button>
          </div>
          <hr/>
          <div class="count">
            <div class="counter">
              <ion-icon class="minus" onclick="decrement()" name="remove-outline"></ion-icon>
              <h1 class="count-el">0</h1>
              <ion-icon  class="plus" onclick="increment()"  name="add-outline"></ion-icon>
            </div>
            <button class="add" onclick="addToCart()">ADD to Cart</button>
          </div>
        </div>
      `;
  console.log(details);
};

// Call the function to display details of a specific product
displayProductDetails();

// similar products

const similarProd = document.getElementsByClassName("similar-prod");

async function similarDisplay() {
  try {
    let response = await fetch("https://fakestoreapi.com/products?limit=4");
    const similarProducts = await response.json();
    console.log(similarProducts);

    similarProducts.forEach((product) => {
      const similarProdDisplay = document.createElement("div");
      similarProdDisplay.classList.add("similar-display");

      similarProdDisplay.innerHTML += `
      <div class="similar-img">
         <img src="${product.image}" alt="${product.title}" />
         </div>
         <h1>${product.title}</h1>
 <h5>${generateRatingIcons(product.rating.rate)} ${
        product.rating.rate
      }/<span>5<span></h5>
</h2>$${product.price}  <span class="off">-40%<span></h2>
       
      `;
      similarProd[0].appendChild(similarProdDisplay);
    });
  } catch (err) {
    console.log(err);
  }
}

similarDisplay();

document.addEventListener("DOMContentLoaded", function () {
  let galleryContainer = document.getElementById("gallery-container");

  if (galleryContainer) {
    galleryContainer.addEventListener(
      "wheel",
      (evt) => {
        evt.preventDefault();
        galleryContainer.scrollLeft += evt.deltaX;
        galleryContainer.style.scrollBehavior = "auto";
      },
      { passive: true }
    );
  } else {
    console.error("Element with ID 'galleryContainer' not found.");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let backBtn = document.getElementById("back-arrow");
  let forwardBtn = document.getElementById("forward-arrow");
  let galleryContainer = document.getElementById("gallery-container");

  backBtn.addEventListener("click", () => {
    galleryContainer.scrollLeft -= 500;
  });

  forwardBtn.addEventListener("click", () => {
    galleryContainer.scrollLeft += 500;
  });
});

let toggleIcon = document.getElementById("filter-menu");
let filterContainer = document.getElementById("filter");
let casualContainer = document.getElementById("casual-products");

// Add a click event listener to the toggle icon
toggleIcon.addEventListener("click", function () {
  // Toggle the display property of the filter container
  if (filterContainer.style.display === "none") {
    filterContainer.style.display = "block";
  } else {
    filterContainer.style.display = "none";
  }

  // Hide the casual-products container
  casualContainer.style.display = "none";
});

