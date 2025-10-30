const { v4: uuidv4 } = require("uuid");
// Data file is named `product.js` (singular) in the data folder
let products = require("../data/product");

exports.getAllProducts = (req, res) => {
  const { category, page = 1, limit = 5 } = req.query;

  let filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + Number(limit));

  res.json({ total: filtered.length, data: paginated });
};

exports.getProductById = (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return next({ status: 404, message: "Product not found" });
  res.json(product);
};

exports.createProduct = (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return next({ status: 404, message: "Product not found" });

  Object.assign(product, req.body);
  res.json(product);
};

exports.deleteProduct = (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) return next({ status: 404, message: "Product not found" });

  products.splice(index, 1);
  res.status(204).send();
};

exports.searchProducts = (req, res) => {
  const { name } = req.query;
  const results = products.filter((p) =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );
  res.json(results);
};

exports.getProductStats = (req, res) => {
  const stats = {};
  products.forEach((p) => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
};
