/* =========================================
   DEBBY CAE ADMIN DASHBOARD
   Developed by Ezra Technologies

   PART 1 OF 3
   FOUNDATION & DASHBOARD
========================================= */


/* =========================================
   1. DOM ELEMENTS
========================================= */

const adminSidebar = document.getElementById("sidebar");
const adminMenuToggle = document.getElementById("menuToggle");

const adminNavItems = document.querySelectorAll(
    ".nav-item[data-section]"
);

const adminSections = document.querySelectorAll(
    ".admin-section"
);

const adminPageTitle = document.getElementById("pageTitle");
const adminYear = document.getElementById("adminYear");


/* DASHBOARD */

const totalProductsElement =
    document.getElementById("totalProducts");

const totalCategoriesElement =
    document.getElementById("totalCategories");

const availableProductsElement =
    document.getElementById("availableProducts");

const unavailableProductsElement =
    document.getElementById("unavailableProducts");

const recentProductsContainer =
    document.getElementById("recentProducts");


/* PRODUCT MANAGEMENT */

const adminProductList =
    document.getElementById("adminProductList");

const adminSearch =
    document.getElementById("adminSearch");

const adminCategoryFilter =
    document.getElementById("adminCategoryFilter");

const tableEmpty =
    document.getElementById("tableEmpty");


/* PRODUCT FORM */

const productForm =
    document.getElementById("productForm");

const formTitle =
    document.getElementById("formTitle");

const productNameInput =
    document.getElementById("productName");

const productPriceInput =
    document.getElementById("productPrice");

const productCategoryInput =
    document.getElementById("productCategory");

const productDescriptionInput =
    document.getElementById("productDescription");

const productAvailabilityInput =
    document.getElementById("productAvailability");

const productImageInput =
    document.getElementById("productImage");

const imageUploadArea =
    document.getElementById("imageUploadArea");

const uploadPlaceholder =
    document.getElementById("uploadPlaceholder");

const imagePreview =
    document.getElementById("imagePreview");

const removeImageButton =
    document.getElementById("removeImage");

const saveProductButton =
    document.getElementById("saveProduct");

const cancelFormButton =
    document.getElementById("cancelForm");


/* DELETE MODAL */

const deleteModal =
    document.getElementById("deleteModal");

const cancelDeleteButton =
    document.getElementById("cancelDelete");

const confirmDeleteButton =
    document.getElementById("confirmDelete");


/* TOAST */

const adminToast =
    document.getElementById("adminToast");

const adminToastIcon =
    document.getElementById("adminToastIcon");

const adminToastMessage =
    document.getElementById("adminToastMessage");


/* CATEGORY COUNTERS */

const fashionCount =
    document.getElementById("fashionCount");

const accessoriesCount =
    document.getElementById("accessoriesCount");

const beautyCount =
    document.getElementById("beautyCount");

const othersCount =
    document.getElementById("othersCount");


/* =========================================
   2. APPLICATION SETTINGS
========================================= */

const STORAGE_KEY = "debbyCAE_admin_products_v1";

const CATEGORIES = [
    "fashion",
    "accessories",
    "beauty",
    "others"
];

const CATEGORY_NAMES = {
    fashion: "Fashion",
    accessories: "Accessories",
    beauty: "Beauty",
    others: "Others"
};


/* =========================================
   3. APPLICATION STATE
========================================= */

// All saved products
let products = [];

// Product currently being edited
let editingProductId = null;

// Product awaiting deletion
let deletingProductId = null;

// Temporary image preview
let currentImage = "";

// Toast timer
let toastTimer;


/* =========================================
   4. LOAD SAVED PRODUCTS
========================================= */

function loadProducts() {

    try {

        const savedProducts =
            localStorage.getItem(STORAGE_KEY);

        if (savedProducts) {

            products = JSON.parse(savedProducts);

        } else {

            products = [];

        }

    } catch (error) {

        console.error(
            "Could not load products:",
            error
        );

        products = [];

        showAdminToast(
            "Could not load saved products.",
            "!"
        );

    }

}


/* =========================================
   5. SAVE PRODUCTS
========================================= */

function saveProducts() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(products)
        );

        return true;

    } catch (error) {

        console.error(
            "Could not save products:",
            error
        );

        showAdminToast(
            "Storage full. Try a smaller image.",
            "!"
        );

        return false;

    }

}


/* =========================================
   6. GENERATE PRODUCT ID
========================================= */

function generateProductId() {

    return (
        "product_" +
        Date.now() +
        "_" +
        Math.random().toString(36).substring(2, 9)
    );

}


/* =========================================
   7. FORMAT PRICE
========================================= */

function formatAdminPrice(price) {

    return (
        "₦" +
        Number(price).toLocaleString("en-NG")
    );

}


/* =========================================
   8. FORMAT CATEGORY
========================================= */

function formatCategory(category) {

    return CATEGORY_NAMES[category] || "Others";

}


/* =========================================
   9. ADMIN TOAST NOTIFICATION
========================================= */

function showAdminToast(message, icon = "✓") {

    adminToastMessage.textContent = message;

    adminToastIcon.textContent = icon;

    adminToast.classList.add("active");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        adminToast.classList.remove("active");

    }, 3000);

}


/* =========================================
   10. NAVIGATION
========================================= */

function navigateToSection(sectionId) {

    const targetSection =
        document.getElementById(sectionId);

    if (!targetSection) return;


    // Hide all sections

    adminSections.forEach(section => {

        section.classList.remove("active");

    });


    // Show selected section

    targetSection.classList.add("active");


    // Update navigation

    adminNavItems.forEach(item => {

        item.classList.remove("active");

        if (item.dataset.section === sectionId) {

            item.classList.add("active");

        }

    });


    // Update page title

    const titles = {

        dashboard: "Dashboard",

        products: "Products",

        "add-product": "Add Product",

        categories: "Categories"

    };

    adminPageTitle.textContent =
        titles[sectionId] || "Dashboard";


    // Close mobile sidebar

    adminSidebar.classList.remove("active");


    // Scroll to top

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   11. NAVIGATION BUTTON EVENTS
========================================= */

// Sidebar navigation

adminNavItems.forEach(item => {

    item.addEventListener("click", () => {

        navigateToSection(
            item.dataset.section
        );

    });

});


// Quick action buttons

document.querySelectorAll(
    "button[data-section]"
).forEach(button => {

    button.addEventListener("click", function () {

        const sectionId = this.dataset.section;

        if (sectionId) {

            navigateToSection(sectionId);

        }

    });

});


/* =========================================
   12. MOBILE SIDEBAR
========================================= */

adminMenuToggle.addEventListener("click", () => {

    adminSidebar.classList.toggle("active");

});


// Close sidebar when clicking outside

document.addEventListener("click", event => {

    const clickedInsideSidebar =
        adminSidebar.contains(event.target);

    const clickedMenu =
        adminMenuToggle.contains(event.target);

    if (
        window.innerWidth <= 700 &&
        !clickedInsideSidebar &&
        !clickedMenu
    ) {

        adminSidebar.classList.remove("active");

    }

});


/* =========================================
   13. UPDATE DASHBOARD STATISTICS
========================================= */

function updateDashboard() {

    const total = products.length;


    const available = products.filter(product => {

        return product.availability === "Available";

    }).length;


    const unavailable = products.filter(product => {

        return product.availability === "Unavailable";

    }).length;


    totalProductsElement.textContent = total;

    availableProductsElement.textContent = available;

    unavailableProductsElement.textContent = unavailable;

    totalCategoriesElement.textContent =
        CATEGORIES.length;


    // Category counts

    fashionCount.textContent =
        countCategory("fashion") + " products";

    accessoriesCount.textContent =
        countCategory("accessories") + " products";

    beautyCount.textContent =
        countCategory("beauty") + " products";

    othersCount.textContent =
        countCategory("others") + " products";


    // Recent products

    renderRecentProducts();

}


/* =========================================
   14. COUNT PRODUCTS BY CATEGORY
========================================= */

function countCategory(category) {

    return products.filter(product => {

        return product.category === category;

    }).length;

}


/* =========================================
   15. RENDER RECENT PRODUCTS
========================================= */

function renderRecentProducts() {

    recentProductsContainer.innerHTML = "";


    if (products.length === 0) {

        recentProductsContainer.innerHTML = `

            <div class="empty-dashboard">

                <div class="empty-icon">□</div>

                <h3>No products yet</h3>

                <p>
                    Your products will appear here
                    once you add them.
                </p>

            </div>

        `;

        return;

    }


    // Display latest four products

    const recentProducts = [...products]
        .reverse()
        .slice(0, 4);


    recentProducts.forEach(product => {

        const card =
            createRecentProductCard(product);

        recentProductsContainer.appendChild(card);

    });

}


/* =========================================
   16. CREATE RECENT PRODUCT CARD
========================================= */

function createRecentProductCard(product) {

    const card = document.createElement("div");

    card.className = "recent-product-item";


    card.style.cssText = `

        display: flex;

        align-items: center;

        gap: 15px;

        padding: 15px 20px;

        border-bottom:
            1px solid rgba(255,255,255,0.05);

    `;


    // Product image

    const image = document.createElement("img");

    image.src = product.image || "";

    image.alt = product.name;

    image.style.cssText = `

        width: 50px;

        height: 60px;

        object-fit: cover;

        border-radius: 6px;

        background: #171717;

    `;


    // Product information

    const info = document.createElement("div");

    info.style.flex = "1";


    // Product name

    const name = document.createElement("h4");

    name.textContent = product.name;

    name.style.cssText = `

        font-size: 12px;

        font-weight: 500;

        margin-bottom: 6px;

        color: white;

    `;


    // Product category

    const category = document.createElement("p");

    category.textContent =
        formatCategory(product.category);

    category.style.cssText = `

        font-size: 10px;

        color: #999999;

    `;


    // Product price

    const price = document.createElement("span");

    price.textContent =
        formatAdminPrice(product.price);

    price.style.cssText = `

        font-size: 12px;

        font-weight: 600;

        color: #E5BB70;

    `;


    // Assemble card

    info.append(name, category);

    card.append(image, info, price);


    return card;

}


/* =========================================
   END OF PART 1 OF 3

   All functions above are complete.

   DO NOT add initialization yet.
   Continue directly with PART 2.
========================================= */

/* =========================================
   DEBBY CAE ADMIN DASHBOARD
   PART 2 OF 3
   PRODUCTS & FORM MANAGEMENT
========================================= */


/* =========================================
   17. RENDER ALL PRODUCTS
========================================= */

function renderProducts() {

    adminProductList.innerHTML = "";

    const searchTerm = adminSearch.value
        .trim()
        .toLowerCase();

    const selectedCategory =
        adminCategoryFilter.value;


    // Filter products

    const filteredProducts = products.filter(
        product => {

            const productName =
                (product.name || "").toLowerCase();

            const productDescription =
                (product.description || "").toLowerCase();


            const matchesSearch =
                productName.includes(searchTerm) ||
                productDescription.includes(searchTerm);


            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;


            return matchesSearch && matchesCategory;

        }
    );


    // Empty state

    tableEmpty.classList.toggle(
        "active",
        filteredProducts.length === 0
    );


    // Generate product rows

    filteredProducts.forEach(product => {

        const row = createProductRow(product);

        adminProductList.appendChild(row);

    });

}


/* =========================================
   18. CREATE PRODUCT TABLE ROW
========================================= */

function createProductRow(product) {

    const row = document.createElement("tr");


    /* PRODUCT CELL */

    const productCell = document.createElement("td");

    const productContainer =
        document.createElement("div");

    productContainer.className = "table-product";


    // Product image

    const image = document.createElement("img");

    image.src = product.image || "";

    image.alt = product.name;

    image.loading = "lazy";


    // Product information

    const productInfo =
        document.createElement("div");

    const productName =
        document.createElement("h4");

    productName.textContent = product.name;


    const productId =
        document.createElement("span");

    productId.textContent =
        (product.id || "").slice(0, 15);


    productInfo.append(
        productName,
        productId
    );

    productContainer.append(
        image,
        productInfo
    );

    productCell.appendChild(productContainer);


    /* CATEGORY CELL */

    const categoryCell =
        document.createElement("td");

    categoryCell.textContent =
        formatCategory(product.category);


    /* PRICE CELL */

    const priceCell =
        document.createElement("td");

    priceCell.textContent =
        formatAdminPrice(product.price);


    /* STATUS CELL */

    const statusCell =
        document.createElement("td");

    const statusBadge =
        document.createElement("span");

    statusBadge.className = "status-badge";


    if (product.availability === "Available") {

        statusBadge.classList.add("status-available");

    } else {

        statusBadge.classList.add("status-unavailable");

    }


    statusBadge.textContent = product.availability;

    statusCell.appendChild(statusBadge);


    /* ACTIONS CELL */

    const actionsCell =
        document.createElement("td");

    const actionsContainer =
        document.createElement("div");

    actionsContainer.className = "table-actions";


    // EDIT BUTTON

    const editButton =
        document.createElement("button");

    editButton.className = "table-action-btn";

    editButton.type = "button";

    editButton.textContent = "✎";

    editButton.title = "Edit product";


    editButton.addEventListener("click", () => {

        editProduct(product.id);

    });


    // DELETE BUTTON

    const deleteButton =
        document.createElement("button");

    deleteButton.className =
        "table-action-btn delete";

    deleteButton.type = "button";

    deleteButton.textContent = "×";

    deleteButton.title = "Delete product";


   deleteButton.addEventListener("click", () => {
    console.log("Product ID:", product.id);
    openDeleteModal(product.id);
});


    // Assemble action buttons

    actionsContainer.append(
        editButton,
        deleteButton
    );

    actionsCell.appendChild(actionsContainer);


    // Assemble table row

    row.append(
        productCell,
        categoryCell,
        priceCell,
        statusCell,
        actionsCell
    );


    return row;

}
/* =========================================
   19. SEARCH PRODUCTS
========================================= */

adminSearch.addEventListener("input", () => {

    renderProducts();

});


/* =========================================
   20. FILTER PRODUCTS BY CATEGORY
========================================= */

adminCategoryFilter.addEventListener(
    "change",
    () => {

        renderProducts();

    }
);


/* =========================================
   21. IMAGE UPLOAD CLICK
========================================= */

imageUploadArea.addEventListener("click", () => {

    productImageInput.click();

});


/* =========================================
   22. IMAGE PREVIEW
========================================= */

productImageInput.addEventListener(
    "change",
    event => {

        const file = event.target.files[0];

        if (!file) return;


        // Check image file type

        if (!file.type.startsWith("image/")) {

            showAdminToast(
                "Please select a valid image.",
                "!"
            );

            productImageInput.value = "";

            return;

        }


        // Maximum image size: 2 MB

        const maxSize =
            2 * 1024 * 1024;


        if (file.size > maxSize) {

            showAdminToast(
                "Image is too large. Maximum size is 2 MB.",
                "!"
            );

            productImageInput.value = "";

            return;

        }


        // Read image

        const reader = new FileReader();


        reader.onload = function () {

            currentImage = reader.result;

            imagePreview.src = currentImage;

            imagePreview.hidden = false;

            uploadPlaceholder.hidden = true;

            removeImageButton.hidden = false;

        };


        reader.onerror = function () {

            showAdminToast(
                "Could not read this image.",
                "!"
            );

        };


        reader.readAsDataURL(file);

    }
);


/* =========================================
   23. REMOVE IMAGE
========================================= */

removeImageButton.addEventListener(
    "click",
    event => {

        event.stopPropagation();


        currentImage = "";

        productImageInput.value = "";


        imagePreview.src = "";

        imagePreview.hidden = true;


        uploadPlaceholder.hidden = false;

        removeImageButton.hidden = true;


        showAdminToast(
            "Image removed.",
            "✓"
        );

    }
);


/* =========================================
   24. RESET PRODUCT FORM
========================================= */

function resetProductForm() {

    productForm.reset();


    // Clear editing state

    editingProductId = null;

    currentImage = "";


    // Reset image preview

    imagePreview.src = "";

    imagePreview.hidden = true;


    uploadPlaceholder.hidden = false;

    removeImageButton.hidden = true;


    // Restore form title

    formTitle.textContent =
        "Add New Product";


    // Restore button text

    saveProductButton.textContent =
        "Save Product →";

}


/* =========================================
   25. CANCEL FORM
========================================= */

cancelFormButton.addEventListener("click", () => {

    resetProductForm();

    navigateToSection("products");

});


/* =========================================
   26. ADD NEW PRODUCT
========================================= */

function addProduct(productData) {

    const newProduct = {

        id: generateProductId(),

        name: productData.name,

        price: Number(productData.price),

        category: productData.category,

        description: productData.description,

        availability: productData.availability,

        image: productData.image,

        dateAdded: new Date().toISOString()

    };


    // Add product to array

    products.push(newProduct);


    // Save product

    if (!saveProducts()) {

        products.pop();

        return false;

    }


    return true;

}


/* =========================================
   27. UPDATE EXISTING PRODUCT
========================================= */

function updateProduct(
    productId,
    productData
) {

    const index = products.findIndex(
        product => {

            return product.id === productId;

        }
    );


    // Product not found

    if (index === -1) {

        showAdminToast(
            "Product not found.",
            "!"
        );

        return false;

    }


    // Preserve original product

    const oldProduct = products[index];


    // Create updated product

    const updatedProduct = {

        ...oldProduct,

        name: productData.name,

        price: Number(productData.price),

        category: productData.category,

        description: productData.description,

        availability: productData.availability,

        image: productData.image

    };


    // Replace old product

    products[index] = updatedProduct;


    // Save changes

    if (!saveProducts()) {

        products[index] = oldProduct;

        return false;

    }


    return true;

}


/* =========================================
   28. PRODUCT FORM SUBMISSION
========================================= */

productForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        // Collect form data

        const name =
            productNameInput.value.trim();

        const price =
            Number(productPriceInput.value);

        const category =
            productCategoryInput.value;

        const description =
            productDescriptionInput.value.trim();

        const availability =
            productAvailabilityInput.value;


        // Validate product name

        if (!name) {

            showAdminToast(
                "Please enter a product name.",
                "!"
            );

            productNameInput.focus();

            return;

        }


        // Validate price

        if (
            !Number.isFinite(price) ||
            price <= 0
        ) {

            showAdminToast(
                "Please enter a valid price.",
                "!"
            );

            productPriceInput.focus();

            return;

        }


        // Validate category

        if (!CATEGORIES.includes(category)) {

            showAdminToast(
                "Please select a valid category.",
                "!"
            );

            return;

        }


        // Validate availability

        if (
            availability !== "Available" &&
            availability !== "Unavailable"
        ) {

            showAdminToast(
                "Please select product availability.",
                "!"
            );

            return;

        }


        // Prepare product data

        const productData = {

            name: name,

            price: price,

            category: category,

            description: description,

            availability: availability,

            image: currentImage

        };


        // UPDATE EXISTING PRODUCT

        if (editingProductId) {

            const success = updateProduct(
                editingProductId,
                productData
            );


            if (!success) return;


            showAdminToast(
                "Product updated successfully!",
                "✓"
            );

        } else {

            // ADD NEW PRODUCT

            const success = addProduct(
                productData
            );


            if (!success) return;


            showAdminToast(
                "Product added successfully!",
                "✓"
            );

        }


        // Refresh dashboard

        updateDashboard();


        // Refresh product table

        renderProducts();


        // Reset form

        resetProductForm();


        // Return to products section

        navigateToSection("products");

    }
);


/* =========================================
   END OF PART 2 OF 3

   All functions above are complete.

   Continue with PART 3 directly below this.
========================================= */

/* =========================================
   DEBBY CAE ADMIN DASHBOARD
   PART 3 OF 3
   EDIT, DELETE & INITIALIZATION
========================================= */


/* =========================================
   29. EDIT EXISTING PRODUCT
========================================= */

function editProduct(productId) {

    // Find selected product

    const product = products.find(item => {

        return item.id === productId;

    });


    // Check whether product exists

    if (!product) {

        showAdminToast(
            "Product not found.",
            "!"
        );

        return;

    }


    // Store editing ID

    editingProductId = productId;


    // Fill form fields

    productNameInput.value =
        product.name || "";

    productPriceInput.value =
        product.price || "";

    productCategoryInput.value =
        product.category || "others";

    productDescriptionInput.value =
        product.description || "";

    productAvailabilityInput.value =
        product.availability || "Available";


    // Load product image

    currentImage = product.image || "";


    if (currentImage) {

        imagePreview.src = currentImage;

        imagePreview.hidden = false;

        uploadPlaceholder.hidden = true;

        removeImageButton.hidden = false;

    } else {

        imagePreview.src = "";

        imagePreview.hidden = true;

        uploadPlaceholder.hidden = false;

        removeImageButton.hidden = true;

    }


    // Change form title

    formTitle.textContent =
        "Edit Product";


    // Change submit button

    saveProductButton.textContent =
        "Update Product →";


    // Open form section

    navigateToSection("add-product");


    // Notify administrator

    showAdminToast(
        "Editing " + product.name,
        "✎"
    );

}


/* =========================================
   30. OPEN DELETE CONFIRMATION
========================================= */
function openDeleteModal(productId) {

    console.log("1. Function reached!");

    deletingProductId = productId;

    console.log("2. Product selected:", deletingProductId);

    console.log("3. Modal element:", deleteModal);

    deleteModal.classList.add("active");

    console.log("4. Modal classes:", deleteModal.className);

}


/* =========================================
   31. CLOSE DELETE MODAL
========================================= */

function closeDeleteModal() {

    deleteModal.classList.remove("active");


    // Clear pending deletion

    deletingProductId = null;

}


/* =========================================
   32. CANCEL DELETION
========================================= */

cancelDeleteButton.addEventListener(
    "click",
    () => {

        closeDeleteModal();

    }
);


/* =========================================
   33. CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

deleteModal.addEventListener(
    "click",
    event => {

        if (event.target === deleteModal) {

            closeDeleteModal();

        }

    }
);


/* =========================================
   34. CONFIRM PRODUCT DELETION
========================================= */

confirmDeleteButton.addEventListener(
    "click",
    () => {

        // Check selected product

        if (!deletingProductId) {

            closeDeleteModal();

            return;

        }


        // Find product index

        const index = products.findIndex(
            product => {

                return product.id === deletingProductId;

            }
        );


        // Product not found

        if (index === -1) {

            showAdminToast(
                "Product not found.",
                "!"
            );

            closeDeleteModal();

            return;

        }


        // Preserve deleted product temporarily

        const deletedProduct = products[index];


        // Remove product

        products.splice(index, 1);


        // Save changes

        if (!saveProducts()) {

            // Restore product if saving fails

            products.splice(
                index,
                0,
                deletedProduct
            );

            closeDeleteModal();

            return;

        }


        // Close modal

        closeDeleteModal();


        // Refresh dashboard

        updateDashboard();


        // Refresh product table

        renderProducts();


        // Notify administrator

        showAdminToast(
            "Product deleted successfully.",
            "✓"
        );

    }
);


/* =========================================
   35. CATEGORY CARD NAVIGATION
========================================= */

document.querySelectorAll(
    ".category-card"
).forEach(card => {

    card.addEventListener("click", () => {

        // Identify category

        const category =
            card.dataset.category;


        // Navigate to products section

        navigateToSection("products");


        // Apply category filter

        if (category) {

            adminCategoryFilter.value =
                category;

        } else {

            adminCategoryFilter.value =
                "all";

        }


        // Refresh product table

        renderProducts();

    });

});


/* =========================================
   36. VIEW WEBSITE
========================================= */

const viewWebsiteLink =
    document.querySelector(
        '.nav-item[href="index.html"]'
    );


if (viewWebsiteLink) {

    viewWebsiteLink.addEventListener(
        "click",
        () => {

            // Website opens normally through href

        }
    );

}


/* =========================================
   37. UPDATE COPYRIGHT YEAR
========================================= */

if (adminYear) {

    adminYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   38. INITIALIZE ADMIN DASHBOARD
========================================= */

function initializeAdminDashboard() {

    // Load saved products

    loadProducts();


    // Update dashboard statistics

    updateDashboard();


    // Render product table

    renderProducts();


    // Start on dashboard

    navigateToSection("dashboard");


    // Log successful initialization

    console.log(
        "Debby CAE Admin Dashboard initialized."
    );

}


/* =========================================
   39. START APPLICATION
========================================= */

// Wait until HTML is fully loaded

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initializeAdminDashboard
    );

} else {

    initializeAdminDashboard();

}

// ==========================================
// DEBBY CAE - SECOND DELETE BUTTON
// PROGRAMMED BY EZRA TECHNOLOGIES
// ==========================================

function addSecondDeleteButtons() {

    const actionRows = document.querySelectorAll(
        "#adminProductList .table-actions"
    );

    actionRows.forEach(actions => {

        // Avoid creating duplicates
        if (actions.querySelector(".second-delete-btn")) {
            return;
        }

        // Find the original Delete button
        const originalDelete = [...actions.querySelectorAll("button")]
            .find(button =>
                /delete/i.test(
                    button.textContent + " " +
                    button.title + " " +
                    button.getAttribute("aria-label")
                )
            );

        if (!originalDelete) return;

        // Create another Delete button
        const newDelete = document.createElement("button");

        newDelete.type = "button";
        newDelete.className = "second-delete-btn";

        newDelete.innerHTML = `
            <span>🗑</span>
            <span>Delete</span>
        `;

        newDelete.title = "Delete Product";

        // Trigger the original deletion functionality
        newDelete.addEventListener("click", function() {
            originalDelete.click();
        });

        actions.appendChild(newDelete);

    });

}

// ==========================================
// AUTOMATIC PRODUCT ROW DETECTION
// ==========================================

const productTable = document.getElementById(
    "adminProductList"
);

if (productTable) {

    // Add buttons already present
    addSecondDeleteButtons();

    // Watch for newly rendered product rows
    const deleteObserver = new MutationObserver(() => {
        addSecondDeleteButtons();
    });

    deleteObserver.observe(productTable, {
        childList: true,
        subtree: true
    });

}

/* =========================================
   END OF PART 3 OF 3

   ADMIN DASHBOARD JAVASCRIPT COMPLETE

   Developed by Ezra Technologies
========================================= */
