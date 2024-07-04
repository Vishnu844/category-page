const tabs = document.querySelectorAll(".tab-button");

async function fetchProducts() {
  const response = await fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  );
  const data = await response.json();
  return data.categories;
}

function showCategory(categoryName) {
  fetchProducts().then((categories) => {
    const selectedCategory = categories.find(
      (category) =>
        category.category_name.toLowerCase() === categoryName.toLowerCase()
    );
    if (selectedCategory) {
      displayProducts(selectedCategory.category_products);
    }
  });
}

function displayProducts(products) {
  const productsContainer = document.getElementById("tab-content");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    let discountPercentage = Math.floor(
      [(product.compare_at_price - product.price) / product.price] * 100
    );
    let validProductBadge =
      product.badge_text == null ? "" : product.badge_text;
    const productDiv = document.createElement("div");
    productDiv.className = "content";
    productDiv.innerHTML = `
            <div class="image-box">
              <img
                src=${product.image}
                alt=${product.title}
              />
                <div class=${
                  validProductBadge !== "" ? "tag" : "none"
                }>${validProductBadge}</div>
            </div>
            <div class="product-name">
              <p>${product.title}</p>
              •
              <span>${product.vendor}</span>
            </div>
            <div class="price-details">
              <p>Rs ${product.price}.00</p>
              <p class="discount">Rs ${product.compare_at_price}.00</p>
              <span>${discountPercentage}% Off</span>
            </div>
            <button>Add to cart</button>
        `;
    productsContainer.appendChild(productDiv);
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    tabs.forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");
    showCategory(tab.textContent.trim());
  });
});

// Load men products by default
document.addEventListener("DOMContentLoaded", () => showCategory("Men"));
