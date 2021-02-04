const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
const { response } = require("express");

const app = express();

const stripe = new Stripe(
  "sk_test_51IGoRvBzMJ7KcpX6LoGrWu3t5EoJVFNfVAaYU1ieVo8ugewNpvhrjAcCjefRLiUrURqPtSZ25v6j1maNHQJKHyeS00AKS0uqOS"
);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/api/createCharge", async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Donitas bimbo",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    res.send("Successful payment");
  } catch (error) {
    console.log(error);
    res.send("Successful fail");
    res.json({ message: error.raw.message})
  }
 


});

app.listen(3001, () => {
  console.log("Server on run port", 3001);
});
