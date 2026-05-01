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

// 4. Modal Logic
window.openModal = (id) => {
    const product = products.find(p => p.id === id);
    const modal = document.getElementById('product-modal');
    const body = document.getElementById('modal-body');
    
    body.innerHTML = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:2rem; align-items:center;">
            <img src="${product.image}" style="width:100%; border-radius:15px;">
            <div>
                <h2 style="font-size:2rem; margin-bottom:1rem;">${product.name}</h2>
                <p style="color:#888; margin-bottom:1.5rem;">${product.desc}</p>
                <p style="font-size:1.5rem; font-weight:700;">$${product.price}</p>
                <button class="btn-premium" style="margin-top:2rem; width:100%;" onclick="addToCart(${product.id})">Add to Bag</button>
            </div>
        </div>
    `;
    modal.style.display = 'flex';
};

// 5. Scroll & Reveal Logic
function handleScroll() {
    // Sticky Header
    const header = document.getElementById('header');
    window.scrollY > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');

    // Reveal elements on scroll
    const reveals = document.querySelectorAll('.reveal, .reveal-delay, .reveal-delay-2');
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
}

function setupEventListeners() {
    window.addEventListener('scroll', handleScroll);
    document.getElementById('cart-toggle').onclick = () => toggleCart(true);
    document.getElementById('close-cart').onclick = () => toggleCart(false);
    document.getElementById('cart-overlay').onclick = () => toggleCart(false);
    
    document.querySelector('.close-modal').onclick = () => {
        document.getElementById('product-modal').style.display = 'none';
    };

    // Form Submission
    document.getElementById('contact-form').onsubmit = (e) => {
        e.preventDefault();
        const status = document.getElementById('form-status');
        status.innerText = "Processing Inquiry...";
        setTimeout(() => {
            status.innerText = "Thank you. Our team will contact you shortly.";
            status.style.color = "#00ff00";
            e.target.reset();
        }, 1500);
    };
}