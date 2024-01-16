const categoriesContainer = document.getElementById("categories-con");
const categoryDropdown = document.getElementById("categoryDropdown");

const displayProducts = async (category) => {
  try {
    // Fetch a list of products from the specified API endpoint
    let response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Convert the fetched data to JSON
    let products = await response.json();

    // Clear the existing products in the container
    categoriesContainer.innerHTML = "";

    products.forEach((product) => {
      let CategoriesProductDiv = document.createElement("div");
      CategoriesProductDiv.classList.add("casual-productD");
      CategoriesProductDiv.innerHTML += `
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
      categoriesContainer.appendChild(CategoriesProductDiv);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Add an event listener to the dropdown to trigger the function on change
categoryDropdown.addEventListener("change", (event) => {
  const selectedCategory = event.target.value;
  displayProducts(selectedCategory);
});
