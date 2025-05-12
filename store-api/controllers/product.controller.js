const ProductModel = require("../models/product.model");
const getAllProducts = async (req, res) => {
  const { name, company, price, featured, sort, fields, limit } = req.query;
  const query = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  if (company) {
    query.company = company;
  }
  if (price) {
    query.price = price;
  }
  if (featured) {
    query.featured = featured;
  }

  console.log("Query", query);

  let result = ProductModel.find(query);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
    // result = await result.sort(sortList).select("name price");
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  return res.json({ total: result.length, products: await result });
};

module.exports = {
  getAllProducts,
};
