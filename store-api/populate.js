require("dotenv").config();
const connectDB = require("./db/dbconnection");
const dummyProducts = require("./db/dummy-products.json");
const ProductModel = require("./models/product.model");

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to MongoDB...");
    await ProductModel.deleteMany();
    await ProductModel.create(dummyProducts);
    console.log("Populated!!!");
    process.exit(0);
  } catch (error) {
    console.log("Failed to connect", error);
    process.exit(1);
  }
};

populate();
