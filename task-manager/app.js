require("dotenv").config();

const express = require("express");
const app = express();
const taskRouter = require("./routes/task.routes");
const connectDatabase = require("./database/dbconnection");
app.use(express.json());

app.use("/api/v1/tasks", taskRouter);

const port = 3000;

const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_URI);
    console.log("connected to MongoDB...");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Failed to connect to DB: ", error);
  }
};

start();
