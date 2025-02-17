

const products = [
  { id: 1, name: "Sneakers Shoes", image: "/images/1.jpg", price: 800 },
  { id: 2, name: "Sneakers Shoes", image: "/images/3.jpg", price: 500 },
  { id: 3, name: "Sneakers Shoes", image: "/images/4.jpg", price: 100 },
  { id: 4, name: "Readmi Note 12 Pro Plus 5G (Gray)", image: "/images/gray.jpg", price: 890 },
  { id: 5, name: "Readmi Note 12 Pro Plus 5G (Green)", image: "/images/green.jpg", price: 550 },
  { id: 6, name: "Readmi Note 12 Pro Plus 5G (Black)", image: "/images/black.jpg", price: 1500 },
  { id: 7, name: "Sneakers Shoes", image: "/images/3.jpg", price: 80 },
  { id: 8, name: "Sneakers Shoes", image: "/images/4.jpg", price: 120 },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  updateCart();
});

// Display Products (Dynamically creating DOM elements)
function displayProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = ""; // Clear existing products

  products.forEach((product) => {
      const col = document.createElement("div");
      col.className = "col-md-3";

      const card = document.createElement("div");
      card.className = "card product-card";

      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.className = "card-img-top product-image";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = product.name;

      const price = document.createElement("p");
      price.className = "fw-bold";
      price.textContent = `$${product.price}`;

      const button = document.createElement("button");
      button.className = "btn btn-outline-primary";
      button.textContent = "Add to Cart";
      button.onclick = () => addToCart(product.id);

      // Append elements
      cardBody.appendChild(title);
      cardBody.appendChild(price);
      cardBody.appendChild(button);
      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      productList.appendChild(col);
  });
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
  document.getElementById("cartCount").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = ""; // Clear cart before rendering

  cart.forEach((item) => {
      const cartRow = document.createElement("div");
      cartRow.className = "d-flex justify-content-between align-items-center mb-2";

      const productInfo = document.createElement("div");
      productInfo.className = "d-flex align-items-center";

      const img = document.createElement("img");
      img.src = item.image;
      img.style.width = "50px";
      img.style.height = "50px";
      img.style.objectFit = "contain";

      const details = document.createElement("div");
      details.className = "ms-2";

      const name = document.createElement("h6");
      name.textContent = item.name;

      const price = document.createElement("p");
      price.textContent = `$${item.price} x ${item.quantity}`;

      details.appendChild(name);
      details.appendChild(price);
      productInfo.appendChild(img);
      productInfo.appendChild(details);

      const actions = document.createElement("div");

      const decreaseBtn = document.createElement("button");
      decreaseBtn.className = "btn btn-sm btn-outline-secondary";
      decreaseBtn.textContent = "-";
      decreaseBtn.onclick = () => updateQuantity(item.id, item.quantity - 1);

      const quantitySpan = document.createElement("span");
      quantitySpan.className = "mx-2";
      quantitySpan.textContent = item.quantity;

      const increaseBtn = document.createElement("button");
      increaseBtn.className = "btn btn-sm btn-outline-secondary";
      increaseBtn.textContent = "+";
      increaseBtn.onclick = () => updateQuantity(item.id, item.quantity + 1);

      const removeBtn = document.createElement("button");
      removeBtn.className = "btn btn-sm btn-danger ms-2";
      removeBtn.textContent = "×";
      removeBtn.onclick = () => removeItem(item.id);

      actions.appendChild(decreaseBtn);
      actions.appendChild(quantitySpan);
      actions.appendChild(increaseBtn);
      actions.appendChild(removeBtn);

      cartRow.appendChild(productInfo);
      cartRow.appendChild(actions);
      cartItems.appendChild(cartRow);
  });

  document.getElementById("cartTotal").textContent = cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
}

// Update Quantity
function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
      removeItem(productId);
      return;
  }
  const item = cart.find((item) => item.id === productId);
  if (item) {
      item.quantity = newQuantity;
      updateCart();
  }
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
