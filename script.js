const products = [
  { id: 1, name: "Sneakers Shoes" ,image: "/images/1.jpg", price: 800},
  { id: 2, name: "Sneakers Shoes", image:"/images/3.jpg", price: 500 },
  { id: 3, name: "Sneakers Shoes", image: "/images/4.jpg", price: 100 },
  { id: 4, name: "Readmi Note 12 pro plus 5g (Gray)", image: "/images/gray.jpg", price: 890 },
  { id: 5, name: "Readmi Note 12 pro plus 5g (Green)", image: "/images/green.jpg", price: 550 },
  { id: 6, name: "Readmi Note 12 pro plus 5g (Black)", image: "/images/black.jpg", price: 1500 },
  { id: 7, name: "Sneakers Shoes", image: "/images/3.jpg", price: 80 },
  { id: 8, name: "Sneakers Shoes", image: "/images/4.jpg", price: 120 },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  updateCart();
});

// Display Products
function displayProducts() {
  const productList = document.getElementById("productList");
  let productsArray = products.map(
    (product) => `
      <div class="col-md-3">
          <div class="card product-card">
              <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
              <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>                  
                  <p class="fw-bold">$${product.price}</p>
                  <button class="btn btn-outline-primary" onclick="addToCart(${product.id})">Add to Cart</button>
              </div>
          </div>
      </div>
  `
  );

  productList.innerHTML = productsArray.join("");
}

// Add to Cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Update Cart Display
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("cartCount").textContent = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex align-items-center">
                <img src="${item.image}" style="width: 50px; height: 50px; object-fit: contain;">
                <div class="ms-2">
                    <h6>${item.name}</h6>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
            </div>
            <div>
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${
                  item.id
                }, ${item.quantity - 1})">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${
                  item.id
                }, ${item.quantity + 1})">+</button>
                <button class="btn btn-sm btn-danger ms-2" onclick="removeItem(${
                  item.id
                })">&times;</button>
            </div>
        </div>
    `
    )
    .join("");

  document.getElementById("cartTotal").textContent = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);
}

// Update Quantity
function updateQuantity(productId, newQuantity) {
  const item = cart.find((item) => item.id === productId);
  if (item && newQuantity > 0) {
    item.quantity = newQuantity;
  } else {
    removeItem(productId);
  }
  updateCart();
}

// Remove Item
function removeItem(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

// Clear Cart
function clearCart() {
  cart = [];
  updateCart();
}
