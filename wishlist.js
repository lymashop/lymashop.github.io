// Wishlist Management Script (wishlist.js)
// This script manages the wishlist functionality across pages

// Wishlist Class
class Wishlist {
  constructor() {
    // Initialize wishlist from localStorage or empty array
    this.items = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    this.currency = localStorage.getItem('cartCurrency') || 'CFA'; // Use same currency as cart
    this.exchangeRate = 655.957; // 1 USD = 655.957 CFA Francs (same as cart)
    
    // DOM Elements - will be set in the init method
    this.wishlistItems = null;
    this.wishlistCount = null;
    this.clearWishlistBtn = null;
    
    // Bind methods
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateWishlistDisplay = this.updateWishlistDisplay.bind(this);
    this.clearWishlist = this.clearWishlist.bind(this);
    this.moveToCart = this.moveToCart.bind(this);
    this.showToast = this.showToast.bind(this);
  }
  
  // Initialize the wishlist functionality
  init() {
    // Get DOM elements
    this.wishlistItems = document.getElementById('wishlist-items');
    this.wishlistCount = document.getElementById('wishlist-count');
    this.clearWishlistBtn = document.getElementById('clear-wishlist');
    this.addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');
    
    // Set up event listeners
    if (this.clearWishlistBtn) {
      this.clearWishlistBtn.addEventListener('click', this.clearWishlist);
    }
    
    // Add to wishlist buttons
    if (this.addToWishlistButtons) {
      this.addToWishlistButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          const card = e.target.closest('.product-card');
          const productName = card.querySelector('h3').textContent;
          let productPrice = card.querySelector('.price').textContent;
          let priceValue = parseFloat(productPrice.replace(/[^\d.]/g, ''));
          
          // If the displayed price is in CFA but the internal storage is in USD
          if (productPrice.includes('CFA')) {
            priceValue = priceValue / this.exchangeRate;
          }
          
          this.addItem(productName, priceValue);
        });
      });
    }
    
    // Update wishlist display with current items
    this.updateWishlistDisplay();
    this.updateWishlistCount();
  }
  
  // Format price according to currency (same as cart)
  formatPrice(price) {
    if (this.currency === 'CFA') {
      return `${Math.round(price * this.exchangeRate).toLocaleString()} CFA`;
    }
    return `$${price.toFixed(2)}`;
  }
  
  // Add item to wishlist
  addItem(name, price) {
    // Check if item already exists in wishlist
    const existingItemIndex = this.items.findIndex(item => item.name === name);
    
    if (existingItemIndex !== -1) {
      this.showToast(`${name} is already in your wishlist!`, 'error');
      return;
    }
    
    this.items.push({
      name: name,
      price: price
    });
    
    // Save to localStorage
    this.saveWishlist();
    
    // Update UI
    this.updateWishlistCount();
    this.updateWishlistDisplay();
    
    // Show toast notification
    this.showToast(`${name} added to wishlist!`, 'success');
  }
  
  // Remove item from wishlist
  removeItem(index) {
    const removedItem = this.items[index];
    this.items.splice(index, 1);
    
    // Save to localStorage
    this.saveWishlist();
    
    // Update UI
    this.updateWishlistCount();
    this.updateWishlistDisplay();
    
    // Show toast notification
    this.showToast(`Item removed from wishlist!`, 'success');
  }
  
  // Move item from wishlist to cart
  moveToCart(index) {
    // Get the item
    const item = this.items[index];
    
    // Add to cart
    if (window.cart) {
      window.cart.addItem(item.name, item.price);
      
      // Remove from wishlist
      this.removeItem(index);
      
      // Show toast notification
      this.showToast(`${item.name} moved to cart!`, 'success');
    } else {
      this.showToast('Cart functionality not available!', 'error');
    }
  }
  
  // Update wishlist count badge
  updateWishlistCount() {
    if (this.wishlistCount) {
      this.wishlistCount.textContent = this.items.length;
    }
  }
  
  // Update wishlist display
  updateWishlistDisplay() {
    if (!this.wishlistItems) return;
    
    // Clear current items
    this.wishlistItems.innerHTML = '';
    
    // Check if wishlist is empty
    if (this.items.length === 0) {
      const emptyMessage = document.getElementById('wishlist-empty-message');
      if (emptyMessage) {
        emptyMessage.style.display = 'block';
      }
      
      // Hide clear button if wishlist is empty
      if (this.clearWishlistBtn) {
        this.clearWishlistBtn.style.display = 'none';
      }
      
      return;
    } else {
      const emptyMessage = document.getElementById('wishlist-empty-message');
      if (emptyMessage) {
        emptyMessage.style.display = 'none';
      }
      
      // Show clear button
      if (this.clearWishlistBtn) {
        this.clearWishlistBtn.style.display = 'inline-flex';
      }
    }
    
    // Add each item to the display
    this.items.forEach((item, index) => {
      const wishlistItem = document.createElement('div');
      wishlistItem.className = 'wishlist-item';
      wishlistItem.innerHTML = `
        <p>${item.name}</p>
        <div class="wishlist-actions">
          <span>${this.formatPrice(item.price)}</span>
          <button class="btn-move-to-cart" data-index="${index}">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <button class="btn btn-danger remove-item" data-index="${index}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      this.wishlistItems.appendChild(wishlistItem);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'));
        this.removeItem(index);
      });
    });
    
    // Add event listeners to "move to cart" buttons
    document.querySelectorAll('.btn-move-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'));
        this.moveToCart(index);
      });
    });
  }
  
  // Save wishlist to localStorage
  saveWishlist() {
    localStorage.setItem('wishlistItems', JSON.stringify(this.items));
  }
  
  // Clear wishlist
  clearWishlist() {
    this.items = [];
    this.saveWishlist();
    this.updateWishlistCount();
    this.updateWishlistDisplay();
    this.showToast('Wishlist cleared!', 'success');
  }
  
  // Toast notification (same implementation as cart for consistency)
  showToast(message, type = '') {
    // Check if toast container exists, if not create it
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.className = 'toast';
    
    if (type) {
      toast.classList.add(type);
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  
  // Update currency when cart currency changes
  updateCurrency(currency) {
    this.currency = currency;
    this.updateWishlistDisplay();
  }
}

// Create and initialize the wishlist when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create global wishlist instance
  window.wishlist = new Wishlist();
  
  // Initialize wishlist
  window.wishlist.init();
  
  // Listen for currency changes from cart
  if (window.cart) {
    // Initial currency sync
    window.wishlist.currency = window.cart.currency;
    
    // Watch for currency toggle in cart
    const currencyToggle = document.getElementById('currency-toggle');
    if (currencyToggle) {
      currencyToggle.addEventListener('click', () => {
        setTimeout(() => {
          window.wishlist.updateCurrency(window.cart.currency);
        }, 100);
      });
    }
  }
});

// Add a wishlist button component to product cards
function addWishlistButtonToProducts() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    // Check if wishlist button already exists
    if (!card.querySelector('.add-to-wishlist')) {
      const productActions = card.querySelector('.product-actions');
      if (productActions) {
        const wishlistBtn = document.createElement('button');
        wishlistBtn.className = 'add-to-wishlist';
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
        wishlistBtn.title = 'Add to Wishlist';
        
        productActions.appendChild(wishlistBtn);
        
        // Add event listener
        wishlistBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const productName = card.querySelector('h3').textContent;
          let productPrice = card.querySelector('.price').textContent;
          let priceValue = parseFloat(productPrice.replace(/[^\d.]/g, ''));
          
          // If the displayed price is in CFA but the internal storage is in USD
          if (productPrice.includes('CFA') && window.wishlist) {
            priceValue = priceValue / window.wishlist.exchangeRate;
          }
          
          if (window.wishlist) {
            window.wishlist.addItem(productName, priceValue);
            
            // Toggle heart icon
            const heartIcon = wishlistBtn.querySelector('i');
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            
            // Reset after a delay
            setTimeout(() => {
              heartIcon.classList.remove('fas');
              heartIcon.classList.add('far');
            }, 2000);
          }
        });
      }
    }
  });
}

// Run the function to add wishlist buttons when available
document.addEventListener('DOMContentLoaded', () => {
  // Run immediately
  addWishlistButtonToProducts();
  
  // Also run after a delay to ensure all dynamic content is loaded
  setTimeout(addWishlistButtonToProducts, 1000);
});