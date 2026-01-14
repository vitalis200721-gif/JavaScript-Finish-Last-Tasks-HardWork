const API_URL = 'https://6960b249e7aa517cb796d458.mockapi.io/products';

const form = document.getElementById('add-product-form');
const message = document.getElementById('message');
const backBtn = document.getElementById('back-btn');

backBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Paimam input reikšmes
  const newProduct = {
    title: document.getElementById('title').value.trim(),
    price: parseFloat(document.getElementById('price').value),
    image: document.getElementById('image').value.trim(),
    description: document.getElementById('description').value.trim(),
    location: document.getElementById('location').value.trim()
  };

  // Siunčiam POST į MockAPI
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct)
  })
  .then(res => {
    if (!res.ok) throw new Error('Failed to add product');
    return res.json(); 
  })
  .then(data => {
    message.textContent = 'Product added successfully!';
    message.style.color = 'green';
    form.reset();
  })
  .catch(error => {
    console.error(error);
    message.textContent = 'Failed to add product.';
    message.style.color = 'red';
  });
});
