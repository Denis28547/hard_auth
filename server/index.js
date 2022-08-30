require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", (req, res) => res.send("works"));

async function startServer() {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

startServer();
