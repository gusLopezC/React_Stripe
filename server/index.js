const express = require("express");
const stripe = require("stripe");
const cors = require("cors");

const app = express();


app.post('/api/createCharge');


app.listen(3001, () => {
  console.log("Server on run port", 3001);
});
