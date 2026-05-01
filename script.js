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