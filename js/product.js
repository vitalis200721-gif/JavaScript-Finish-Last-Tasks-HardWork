const API_URL = 'https://6960b249e7aa517cb796d458.mockapi.io/products';

// Gauname produkto ID iš URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Patikrinam, ar ID yra
if (!productId) {
  alert('No product ID provided. Redirecting to catalog.');
  window.location.href = 'index.html';
}

const main = document.getElementById('product-details');

async function fetchProduct() {
  try {
    const res = await fetch(`${API_URL}/${productId}`);
    if (!res.ok) throw new Error('Failed to fetch product');

    const product = await res.json();
    displayProduct(product);
  } catch (error) {
    console.error(error);
    main.innerHTML = '<p>Failed to load product. Maybe it was deleted or ID is wrong.</p>';
  }
}

function displayProduct(product) {
  main.innerHTML = `
    <div class="product-card" style="max-width: 500px; margin: auto;">
      <img src="${product.image}" alt="${product.title}" class="product-image" />
      <div class="product-info">
        <div class="product-title">${product.title}</div>
        <div class="product-price">${product.price} €</div>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Location:</strong> ${product.location}</p>
        <button id="delete-btn">Delete Product</button>
        <button id="back-btn">Back to Catalog</button>
        <p id="message" style="margin-top:10px; color: green;"></p>
      </div>
    </div>
  `;

  document.getElementById('delete-btn').addEventListener('click', () => deleteProduct(product.id));
  document.getElementById('back-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete product');

    document.getElementById('message').textContent = 'Product has been removed from the catalog.';
    document.getElementById('delete-btn').style.display = 'none';
  } catch (error) {
    console.error(error);
    alert('Failed to delete product.');
  }
}

fetchProduct();
