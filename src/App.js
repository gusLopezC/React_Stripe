import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "bootswatch/dist/lux/bootstrap.min.css";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51IGoRvBzMJ7KcpX6knJmPiuZdDanULBsmS9ILs3F68pWeaweb9uPxCBn7jvM9Llu54BYKikZWoEPwkRSetiK1wex001CbwZekN"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const element = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: element.getElement(CardElement),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img src="https://riodoce.mx/wp-content/uploads/2019/11/donitas1-768x768.jpg" alt="bimbo" className="img-fluid"></img>
      <CardElement />
      <button>Buy</button>
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
