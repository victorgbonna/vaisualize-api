require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const consolelog = require("./utils/consolelog");
const routes = require("./routes/api");
const path = require("path");

const app = express();


app.use(cors());
app.use(express.urlencoded({ limit: "1000000mb", extended: true }));
app.use(express.json({ limit: "1000000mb", extended: true }));

const db = require("./configs/constants").mongoURI;


mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected")
  })
  .catch((err) => console.log(err));

global.appRoot = path.resolve(__dirname);

const PORT = process.env.PORT || 5001;
app.listen(PORT, (err) => {
  console.log("Server now running on port " + PORT);
});

routes(app);
