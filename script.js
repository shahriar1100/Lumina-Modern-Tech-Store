// Product Data
const products = [
    { id: 1, name: "Neural Buds Pro", price: 299, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800", desc: "Industry-leading noise cancellation with spatial audio technology." },
    { id: 2, name: "Zenith Watch", price: 449, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800", desc: "A masterpiece of sapphire glass and aerospace-grade titanium." },
    { id: 3, name: "Vapor Keyboard", price: 189, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800", desc: "Ultra-thin mechanical switches for the ultimate typing experience." },
    { id: 4, name: "Aura Mouse", price: 99, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800", desc: "Ergonomic precision with a seamless glass finish." }
];

let cart = [];

// Initialize Functions
document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Animation
    const loaderLine = document.querySelector('.loader-line');
    loaderLine.style.width = '100%';
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => document.getElementById('loader').style.display = 'none', 800);
    }, 600);

    renderProducts();
    setupEventListeners();
    handleScroll();
});

// 2. Render Products to UI
function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = products.map(p => `
        <div class="product-card reveal">
            <img src="${p.image}" alt="${p.name}" onclick="openModal(${p.id})">
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
            <button class="btn-add" onclick="addToCart(${p.id})">Add to Bag</button>
        </div>
    `).join('');
}

// 3. Cart Logic
window.addToCart = (id) => {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
    toggleCart(true);
};

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('cart-total-price');

    cartCount.innerText = cart.length;
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:1.5rem; align-items:center;">
            <div>
                <p style="font-weight:500;">${item.name}</p>
                <p style="color:#888; font-size:0.8rem;">$${item.price}</p>
            </div>
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer;">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.innerText = `$${total}`;
}

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartUI();
};

function toggleCart(isOpen) {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (isOpen) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    } else {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}