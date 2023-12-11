require("dotenv").config();
const express = require("express");
const cors = require("cors");

// create express app
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

require("./bootstrapApplication").bootstrap(app);
app.get("/", function (req, res, next) {
  res.send("HELLO WORD");
});

// listen for requests
var port = process.env.PORT || 3012;
app.listen(port, () => {
  console.log(`Hi!!! Server is listening on port ${port}`);
});
