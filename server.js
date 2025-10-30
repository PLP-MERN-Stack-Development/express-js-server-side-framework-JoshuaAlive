const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const productRoutes = require("./routes/productRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

// Middleware setup
// Use express's built-in JSON parser; body-parser is not necessary here.
app.use(express.json()); // Parse JSON
app.use(logger); // Custom logger middleware

// Routes
app.use("/api/products", productRoutes);

// Global error handler
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port:http://localhost:${PORT}`));

// Hello World route
app.get("/", (req, res) => res.send("Hello World"));
