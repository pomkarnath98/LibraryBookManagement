const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

mongoose.connect(
    process.env.ATLAS_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("The database is up and running");
  }
);

const authRoute = require("./routes/auth");

app.use("/api/user", authRoute);

app.listen(9000, () => {
  console.log("The server is running on PORT 9000");
});
