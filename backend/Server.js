const express = require("express");
const mongoose = require("mongoose");
const saveRoutes = require("./routes/Save");
const cors = require("cors");

require("dotenv").config();

const port = 3001;
const mongoString = process.env.DATABASE_URL;

const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use("/steps", saveRoutes);

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
