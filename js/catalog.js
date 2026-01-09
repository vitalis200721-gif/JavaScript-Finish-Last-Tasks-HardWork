// API nuoroda
const API_URL = 'https://6960b249e7aa517cb796d458.mockapi.io/products';

// Pagrindinė funkcija: gauname prekes
async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch products');
    let products = await res.json();

    // Rūšiuojam nuo mažiausios kainos
    products.sort((a, b) => a.price - b.price);

    displayProducts(products);
  } catch (error) {
    console.error(error);
    document.getElementById('catalog').textContent = 'Failed to load products.';
  }
}

// Atvaizduojam produktus kortelėmis
function displayProducts(products) {
  const catalog = document.getElementById('catalog');
  catalog.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image" />
      <div class="product-info">
        <div class="product-title">${product.title}</div>
        <div class="product-price">${product.price} €</div>
      </div>
    `;

    // Nukreipimas į detalų puslapį
    card.addEventListener('click', () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    catalog.appendChild(card);
  });
}

// Paleidžiam viską
fetchProducts();
