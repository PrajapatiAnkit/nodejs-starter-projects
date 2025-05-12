require("dotenv").config();
const connectMongoDB = require("./src/db/dbconnect");
const express = require("express");
const app = express();
const jobsRouter = require("./src/routes/jobs.route");
const userRouter = require("./src/routes/user.route");

app.use(express.json());

app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  await connectMongoDB(process.env.MONGO_URI);
  console.log("Connected to MongoDB...");

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

start();
