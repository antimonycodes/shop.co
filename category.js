// fetch category products
// const categoriesContainer = document.getElementById("categories-con");

// const categoryProducts = async (category, containerId) => {
//   try {
//     let response = await fetch(
//       `https://fakestoreapi.com/products/category/${category}`
//     );
//     let products = await response.json();

//     // Clear the existing products in the container
//     categoriesContainer.innerHTML = "";

//     products.forEach((product) => {
//       let CategoriesProductDiv = document.createElement("div");
//       CategoriesProductDiv.classList.add("casual-productD");
//       CategoriesProductDiv.innerHTML += `
//         <div class="images">
//           <img src="${product.image}" />
//         </div>
//         <h2>${product.title}</h2>
//         <div class="rating">
//           <div class="stars">
//             ${Array.from(
//               { length: Math.floor(product.rating.rate) },
//               () => `
//               <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
//                 <path d="M9.24494 0.255066L11.8641 5.89498L18.0374 6.64316L13.4829 10.877L14.679 16.9793L9.24494 13.9561L3.8109 16.9793L5.00697 10.877L0.452479 6.64316L6.62573 5.89498L9.24494 0.255066Z" fill="#FFC633"/>
//               </svg>
//             `
//             ).join("")}
//           </div>
//           <p>${product.rating.rate}/5</p>
//         </div>
//         <h3>${product.price}</h3>
//       `;
//       categoriesContainer.appendChild(CategoriesProductDiv);
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
// categoryProducts("electronics", "categories-con");

// const categoriesContainer = document.getElementById("categories-con");

// const categoryProducts = async (category, containerId) => {
//   try {
//     // const categoriesContainer = document.getElementById(containerId);
//     // Fetch a list of products from the specified API endpoint
//     let response = await fetch(
//       `https://fakestoreapi.com/products/category/${category}`
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     // Convert the fetched data to JSON
//     let products = await response.json();

//     // Clear the existing products in the container
//     categoriesContainer.innerHTML = "";

//     products.forEach((product) => {
//       let CategoriesProductDiv = document.createElement("div");
//       CategoriesProductDiv.classList.add("casual-productD");
//       CategoriesProductDiv.innerHTML += `
//         <div class="images">
//           <img src="${product.image}" />
//         </div>
//         <h2>${product.title}</h2>
//         <div class="rating">
//           <div class="stars">
//             ${Array.from(
//               { length: Math.floor(product.rating.rate) },
//               () => `
//               <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
//                 <path d="M9.24494 0.255066L11.8641 5.89498L18.0374 6.64316L13.4829 10.877L14.679 16.9793L9.24494 13.9561L3.8109 16.9793L5.00697 10.877L0.452479 6.64316L6.62573 5.89498L9.24494 0.255066Z" fill="#FFC633"/>
//               </svg>
//             `
//             ).join("")}
//           </div>
//           <p>${product.rating.rate}/5</p>
//         </div>
//         <h3>${product.price}</h3>
//       `;
//       categoriesContainer.appendChild(CategoriesProductDiv);
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
// categoryProducts("electronics", "categories-con");
// Function to redirect to a specific category and fetch products

// function redirectToCategory(category, event) {
//   event.preventDefault();
//   const encodedCategory = encodeURIComponent(category);
//   // Your logic for fetching products and displaying them
//   return false;
// }

const categoryProducts = async (category, containerId) => {
  // const encodedCategory = encodeURIComponent(category);
  try {
    // Fetch a list of products from the specified API endpoint
    let response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );

    // Convert the fetched data to JSON
    let products = await response.json();
    console.log(products);
    console.log("Response:", response);
    console.log("Products:", products);

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
       <div class="images">
          <img src="${product.image}" />
        </div>
        <h2>${product.title}</h2>
        <div class="rating">
          <div class="stars">
            ${Array.from(
              { length: Math.floor(product.rating.rate) },
              () => `
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                <path d="M9.24494 0.255066L11.8641 5.89498L18.0374 6.64316L13.4829 10.877L14.679 16.9793L9.24494 13.9561L3.8109 16.9793L5.00697 10.877L0.452479 6.64316L6.62573 5.89498L9.24494 0.255066Z" fill="#FFC633"/>
              </svg>
            `
            ).join("")}
          </div>
          <p>${product.rating.rate}/5</p>
        </div>
        <h3>${product.price}</h3>   
      `;

      // Add a click event listener to redirect to the product details page when clicked
      productDiv.addEventListener("click", () => {
        window.location.href = `shop.html?id=${product.id}`;
      });

      // Append the product div to the container
      productDisplay.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Call the function to display a list of new arrival products.
categoryProducts("electronics", "casual-products-display");

// Call the function to display a list of top-selling products.
// categoryProducts("jewelery", "ts-display");
