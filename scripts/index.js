/* =========================================
   DEBBY CAE
   PART 0.3 — JAVASCRIPT
========================================= */


/* =========================================
   CONFIGURATION
========================================= */

// Business WhatsApp number
const WHATSAPP_NUMBER = "2348056055575";

// Favorites storage
const FAVORITES_KEY = "debbyCAE_favorites";


/* =========================================
   DOM ELEMENTS
========================================= */

const header = document.getElementById("header");

const searchToggle = document.getElementById("searchToggle");
const searchContainer = document.getElementById("searchContainer");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

const favoritesToggle = document.getElementById("favoritesToggle");
const favoriteCount = document.getElementById("favoriteCount");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const productGrid = document.getElementById("productGrid");
const productCount = document.getElementById("productCount");

const favoritesSection = document.getElementById("favorites");
const favoritesGrid = document.getElementById("favoritesGrid");
const emptyFavorites = document.getElementById("emptyFavorites");

const noProducts = document.getElementById("noProducts");

const detailsOverlay = document.getElementById("detailsOverlay");
const detailsClose = document.getElementById("detailsClose");

const detailsTitle = document.getElementById("detailsTitle");
const detailsPrice = document.getElementById("detailsPrice");
const detailsCategory = document.getElementById("detailsCategory");
const detailsAvailability = document.getElementById("detailsAvailability");
const detailsDescription = document.getElementById("detailsDescription");
const detailsWhatsapp = document.getElementById("detailsWhatsapp");

const toast = document.getElementById("toast");
const toastIcon = document.getElementById("toastIcon");
const toastMessage = document.getElementById("toastMessage");

const offlineMessage = document.getElementById("offlineMessage");
const offlineIcon = document.getElementById("offlineIcon");
const offlineTitle = document.getElementById("offlineTitle");
const offlineDescription = document.getElementById("offlineDescription");

const backToShop = document.getElementById("backToShop");

const currentYear = document.getElementById("currentYear");


/* =========================================
   GENERAL FUNCTIONS
========================================= */


/* Format prices in Nigerian Naira */

function formatPrice(price) {

    return "₦" + Number(price).toLocaleString("en-NG");

}


/* Convert category names to readable text */

function formatCategory(category) {

    if (!category) return "General";

    return category.charAt(0).toUpperCase() + category.slice(1);

}


/* =========================================
   TOAST NOTIFICATIONS
========================================= */

let toastTimer;


function showToast(message, icon = "✓") {

    clearTimeout(toastTimer);

    toastMessage.textContent = message;

    toastIcon.textContent = icon;

    toast.classList.add("active");

    toastTimer = setTimeout(() => {

        toast.classList.remove("active");

    }, 2800);

}


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================
   SEARCH SYSTEM
========================================= */


/* Open and close search */

searchToggle.addEventListener("click", () => {

    searchContainer.classList.toggle("active");

    if (searchContainer.classList.contains("active")) {

        searchInput.focus();

    } else {

        searchInput.value = "";

        searchProducts();

    }

});


/* Search products */

function searchProducts() {

    const searchTerm = searchInput.value.trim().toLowerCase();

    const products = document.querySelectorAll(
        "#productGrid .product-card"
    );

    let visibleCount = 0;


    products.forEach(product => {

        const name = product.dataset.name.toLowerCase();

        const category = product.dataset.category.toLowerCase();

        const description = product.dataset.description.toLowerCase();

        const matches =
            name.includes(searchTerm) ||
            category.includes(searchTerm) ||
            description.includes(searchTerm);


        if (matches) {

            product.style.display = "";

            visibleCount++;

        } else {

            product.style.display = "none";

        }

    });


    productCount.textContent = visibleCount;


    if (visibleCount === 0) {

        noProducts.classList.add("active");

    } else {

        noProducts.classList.remove("active");

    }

}


/* Search while typing */

searchInput.addEventListener("input", searchProducts);


/* Clear search */

clearSearch.addEventListener("click", () => {

    searchInput.value = "";

    searchProducts();

    searchInput.focus();

});


/* Reset search */

document.getElementById("resetSearch").addEventListener("click", () => {

    searchInput.value = "";

    searchProducts();

});


/* =========================================
   PRODUCT CATEGORY FILTERS
========================================= */

const filterButtons = document.querySelectorAll(".filter-btn");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.category;


        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const products = document.querySelectorAll(
            "#productGrid .product-card"
        );

        let visibleCount = 0;


        products.forEach(product => {

            const category = product.dataset.category;

            const matches =
                selectedCategory === "all" ||
                category === selectedCategory;


            if (matches) {

                product.style.display = "";

                visibleCount++;

            } else {

                product.style.display = "none";

            }

        });


        productCount.textContent = visibleCount;


        if (visibleCount === 0) {

            noProducts.classList.add("active");

        } else {

            noProducts.classList.remove("active");

        }


        searchInput.value = "";

    });

});


/* =========================================
   CATEGORY CARDS
========================================= */

const categoryCards = document.querySelectorAll(".category-card");


categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        const selectedCategory = card.dataset.category;


        // Return to the shop

        showShop();


        // Activate the matching filter

        const matchingButton = document.querySelector(
            `.filter-btn[data-category="${selectedCategory}"]`
        );


        if (matchingButton) {

            matchingButton.click();

        }


        // Scroll to products

        document.getElementById("shop").scrollIntoView({

            behavior: "smooth"

        });

    });

});


/* =========================================
   FAVORITES SYSTEM
========================================= */


/* Load saved favorites */

let favorites = [];


try {

    favorites = JSON.parse(
        localStorage.getItem(FAVORITES_KEY)
    ) || [];

} catch (error) {

    favorites = [];

}


/* Save favorites */

function saveFavorites() {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );

}


/* Check whether a product is liked */

function isFavorite(productId) {

    return favorites.includes(productId);

}


/* Update the favorite counter */

function updateFavoriteCount() {

    favoriteCount.textContent = favorites.length;

}


/* Update the heart icons */

function updateLikeButtons() {

    const products = document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productId = product.dataset.id;

        const likeButton = product.querySelector(".like-btn");


        if (!likeButton) return;


        if (isFavorite(productId)) {

            likeButton.innerHTML = "♥";

            likeButton.classList.add("liked");

            likeButton.setAttribute(
                "aria-label",
                "Remove from favorites"
            );

        } else {

            likeButton.innerHTML = "♡";

            likeButton.classList.remove("liked");

            likeButton.setAttribute(
                "aria-label",
                "Add to favorites"
            );

        }

    });

}


/* Toggle favorite */

function toggleFavorite(productId) {

    if (isFavorite(productId)) {

        favorites = favorites.filter(
            id => id !== productId
        );

        showToast("Removed from favorites", "♡");

    } else {

        favorites.push(productId);

        showToast("Added to favorites", "♥");

    }


    saveFavorites();

    updateFavoriteCount();

    updateLikeButtons();

    renderFavorites();

}


/* Attach like buttons */

document.querySelectorAll(".like-btn").forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();


        const product = button.closest(".product-card");

        const productId = product.dataset.id;


        toggleFavorite(productId);

    });

});


/* =========================================
   RENDER FAVORITES
========================================= */

function renderFavorites() {

    favoritesGrid.innerHTML = "";


    const allProducts = document.querySelectorAll(
        "#productGrid .product-card"
    );


    let favoriteProducts = [];


    allProducts.forEach(product => {

        if (isFavorite(product.dataset.id)) {

            favoriteProducts.push(product);

        }

    });


    favoriteProducts.forEach(product => {

        const clone = product.cloneNode(true);


        // Make sure cloned product displays correctly

        clone.style.display = "";


        // Attach cloned like button

        const likeButton = clone.querySelector(".like-btn");


        likeButton.addEventListener("click", event => {

            event.stopPropagation();

            toggleFavorite(product.dataset.id);

        });


        // Attach cloned details button

        const detailsButton = clone.querySelector(".details-btn");


        detailsButton.addEventListener("click", () => {

            openProductDetails(product);

        });


        // Attach cloned quick-view button

        const quickViewButton = clone.querySelector(
            ".quick-view-btn"
        );


        quickViewButton.addEventListener("click", () => {

            openProductDetails(product);

        });


        // Add product to favorites display

        favoritesGrid.appendChild(clone);

    });


    // Show empty message when no favorites exist

    if (favoriteProducts.length === 0) {

        emptyFavorites.classList.add("active");

    } else {

        emptyFavorites.classList.remove("active");

    }

}


/* =========================================
   SHOW FAVORITES SECTION
========================================= */

favoritesToggle.addEventListener("click", () => {

    if (favoritesSection.classList.contains("active")) {

        showShop();

    } else {

        showFavorites();

    }

});


function showFavorites() {

    favoritesSection.classList.add("active");

    document.getElementById("shop").style.display = "none";

    document.getElementById("categories").style.display = "none";

    document.getElementById("about").style.display = "none";

    document.getElementById("contact").style.display = "none";

    favoritesSection.style.display = "block";


    renderFavorites();


    favoritesSection.scrollIntoView({

        behavior: "smooth"

    });

}


/* =========================================
   RETURN TO SHOP
========================================= */

function showShop() {

    favoritesSection.classList.remove("active");

    favoritesSection.style.display = "none";


    document.getElementById("shop").style.display = "";

    document.getElementById("categories").style.display = "";

    document.getElementById("about").style.display = "";

    document.getElementById("contact").style.display = "";

}


/* Back to shop button */

backToShop.addEventListener("click", () => {

    showShop();


    document.getElementById("shop").scrollIntoView({

        behavior: "smooth"

    });

});


/* =========================================
   PRODUCT DETAILS MODAL
========================================= */


/* Open product details */

function openProductDetails(product) {

    const name = product.dataset.name;

    const price = product.dataset.price;

    const category = product.dataset.category;

    const description = product.dataset.description;

    const availability = product.dataset.availability || "Available";


    // Fill modal information

    detailsTitle.textContent = name;

    detailsPrice.textContent = formatPrice(price);

    detailsCategory.textContent = formatCategory(category);

    detailsAvailability.textContent = availability;

    detailsDescription.textContent = description;


    // Automatically generate WhatsApp message

    const message =
        `Hello Debby CAE! 👋\n\n` +
        `I'm interested in this product:\n\n` +
        `Product: ${name}\n` +
        `Price: ${formatPrice(price)}\n` +
        `Category: ${formatCategory(category)}\n\n` +
        `Please provide more information. Thank you!`;


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    detailsWhatsapp.href = whatsappURL;


    // Open modal

    detailsOverlay.classList.add("active");

    document.body.classList.add("no-scroll");

}


/* Attach three-dot buttons */

document.querySelectorAll(".details-btn").forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();


        const product = button.closest(".product-card");


        openProductDetails(product);

    });

});


/* Attach quick-view buttons */

document.querySelectorAll(".quick-view-btn").forEach(button => {

    button.addEventListener("click", () => {

        const product = button.closest(".product-card");


        openProductDetails(product);

    });

});


/* Close modal */

function closeDetailsModal() {

    detailsOverlay.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


detailsClose.addEventListener("click", closeDetailsModal);


/* Close modal by clicking outside */

detailsOverlay.addEventListener("click", event => {

    if (event.target === detailsOverlay) {

        closeDetailsModal();

    }

});


/* Close modal with Escape key */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeDetailsModal();

        searchContainer.classList.remove("active");

        navLinks.classList.remove("active");

    }

});


/* =========================================
   MOBILE NAVIGATION
========================================= */

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");


    if (navLinks.classList.contains("active")) {

        menuToggle.innerHTML = "✕";

        menuToggle.setAttribute(
            "aria-label",
            "Close menu"
        );

    } else {

        menuToggle.innerHTML = "☰";

        menuToggle.setAttribute(
            "aria-label",
            "Open menu"
        );

    }

});


/* Close mobile menu after clicking a navigation link */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.innerHTML = "☰";

    });

});


/* =========================================
   ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll(
    "#home, #shop, #categories, #about, #contact"
);


window.addEventListener("scroll", () => {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    document.querySelectorAll(".nav-link").forEach(link => {

        link.classList.remove("active");


        if (link.getAttribute("href") === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   OFFLINE / ONLINE NOTIFICATIONS
========================================= */

let offlineTimer;


/* Display connection notification */

function showConnectionNotification(isOnline) {

    clearTimeout(offlineTimer);


    if (isOnline) {

        offlineMessage.classList.add("online");

        offlineIcon.textContent = "✓";

        offlineTitle.textContent = "Connection restored!";

        offlineDescription.textContent =
            "You're back online.";


    } else {

        offlineMessage.classList.remove("online");

        offlineIcon.textContent = "!";

        offlineTitle.textContent = "You're offline";

        offlineDescription.textContent =
            "Check your internet connection.";

    }


    offlineMessage.classList.add("active");


    // Automatically hide notification

    offlineTimer = setTimeout(() => {

        offlineMessage.classList.remove("active");

    }, 4000);

}


/* Detect loss of internet */

window.addEventListener("offline", () => {

    showConnectionNotification(false);

});


/* Detect restoration of internet */

window.addEventListener("online", () => {

    showConnectionNotification(true);

});


/* =========================================
   FOOTER YEAR
========================================= */

currentYear.textContent = new Date().getFullYear();


/* =========================================
   INITIALIZATION
========================================= */

function initializeWebsite() {

    updateFavoriteCount();

    updateLikeButtons();

    renderFavorites();


    // Set initial product count

    const products = document.querySelectorAll(
        "#productGrid .product-card"
    );


    productCount.textContent = products.length;


    // Ensure favorites section is initially hidden

    favoritesSection.style.display = "none";


    // Initial connection check

    if (!navigator.onLine) {

        showConnectionNotification(false);

    }

}


/* Start website */

initializeWebsite();


/* =========================================
   DEBBY CAE — END OF JAVASCRIPT
========================================= */