const express = require("express");
const productRouter = express.Router();

const { getAllProducts } = require("../controllers/product.controller");

productRouter.route("/").get(getAllProducts);

module.exports = productRouter;
