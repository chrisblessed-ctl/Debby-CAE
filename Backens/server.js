// ==========================================
// DEBBY CAE BACKEND
// PROGRAMMED BY EZRA TECHNOLOGIES
// ==========================================

// Import Express
const express = require("express");

// Create our application
const app = express();

// Set the port
const PORT = process.env.PORT || 3000;

// Allow the server to receive JSON data
app.use(express.json());

// Allow larger image data temporarily
app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));

// ==========================================
// BASIC HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.send("Debby CAE Backend is running!");
});

// ==========================================
// API STATUS ROUTE
// ==========================================

app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "Debby CAE API is working!",
        developer: "Ezra Technologies",
        status: "Online"
    });
});

// ==========================================
// GET ALL PRODUCTS
// ==========================================

app.get("/api/products", (req, res) => {
    res.json({
        success: true,
        message: "Products endpoint is ready!",
        products: []
    });
});


// ==========================================
// GET A SINGLE PRODUCT
// ==========================================

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;

    res.json({
        success: true,
        message: "Single product endpoint is ready!",
        productId: productId
    });
});

// ==========================================
// START THE SERVER
// ==========================================

app.listen(PORT, () => {
    console.log("================================");
    console.log("DEBBY CAE BACKEND");
    console.log("PROGRAMMED BY EZRA TECHNOLOGIES");
    console.log("================================");
    console.log(`Server running on port ${PORT}`);
    console.log("Status: ONLINE");
});