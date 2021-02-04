import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

import "bootswatch/dist/lux/bootstrap.min.css";
import "./App.css";
import { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51IGoRvBzMJ7KcpX6knJmPiuZdDanULBsmS9ILs3F68pWeaweb9uPxCBn7jvM9Llu54BYKikZWoEPwkRSetiK1wex001CbwZekN"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const element = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: element.getElement(CardElement),
    });

    setLoading(true);
    if (!error) {
      console.log(paymentMethod);

      try {
        const { id } = paymentMethod;
        const { data } = await axios.post(
          "http://localhost:3001/api/createCharge",
          {
            id,
            amount: 10000,
          }
        );

        console.log(data);
        element.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img
        src="https://riodoce.mx/wp-content/uploads/2019/11/donitas1-768x768.jpg"
        alt="bimbo"
        className="img-fluid"
      ></img>

      <div className="form-group">
        <CardElement className="form-control" />
      </div>
      <button className="btn btn-success" disabled={!stripe}>
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Buy"
        )}
      </button>
    </form>
  );
};

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
