const express = require("express");
const { v2: cloudinary } = require("cloudinary");

const app = express();
const PORT = process.env.PORT || 3000;

// Request handling
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));

// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
    res.send("Debby CAE Backend is running!");
});

// ==========================================
// API STATUS
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
// CLOUDINARY CONNECTION TEST
// ==========================================

app.get("/api/cloudinary-status", async (req, res) => {
    try {
        const result = await cloudinary.api.ping();

        res.json({
            success: true,
            message: "Cloudinary connected successfully!",
            cloudinary: result.status
        });
    } catch (error) {
        console.error("Cloudinary connection error:", error.message);

        res.status(500).json({
            success: false,
            message: "Cloudinary connection failed."
        });
    }
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
    res.json({
        success: true,
        message: "Single product endpoint is ready!",
        productId: req.params.id
    });
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
    console.log("================================");
    console.log("DEBBY CAE BACKEND");
    console.log("PROGRAMMED BY EZRA TECHNOLOGIES");
    console.log("================================");
    console.log(`Server running on port ${PORT}`);
    console.log("Status: ONLINE");
});
