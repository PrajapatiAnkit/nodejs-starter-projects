require("dotenv").config();
const express = require("express");
const app = express();

const productRouter = require("./routes/product.routes");
const connectDB = require("./db/dbconnection");

app.use(express.json());

app.use("/api/v1/products", productRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to MongoDB...");

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Failed to connect", error);
  }
};

start();
