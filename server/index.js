const express = require("express");
require("dotenv").config();
const cors = require("cors");
var cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
