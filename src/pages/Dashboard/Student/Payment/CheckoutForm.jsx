import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  const { classId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || processing) {
      return;
    }

    setProcessing(true); // Start processing

    const card = elements.getElement(CardElement);
    console.log(card);
    if (card == null) {
      setProcessing(false); // Stop processing in case of error
      return;
    }

    // Make a request to your server to create a payment intent
    const response = await axiosSecure.post("/create-payment-intent", {
      classId: classId,
    });

    const { clientSecret } = response.data;

    // Confirm the card payment using the client secret
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );

    if (error) {
      setCardError(error?.message);
      console.log("[error]", error);
    } else if (paymentIntent.status === "succeeded") {
      setCardError("");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Enrolled",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("[PaymentIntent]", paymentIntent);
      // Redirect to /dashboard/selectedClasses
      navigate("/dashboard/selectedClasses");

      // Student payment information
      const paymentInfo = {
        email: user?.email,
        transactionId: paymentIntent?.id,
        classId: classId,
        price: paymentIntent?.amount / 100,
        status: paymentIntent?.status,
        createdAt: paymentIntent?.created,
      };
      try {
        const response = await axiosSecure.post("/payment", paymentInfo);
        console.log("Payment Info", response.data);
      } catch (error) {
        console.log("Error occurred while submitting payment info", error);
      }
    } else {
      setCardError("Payment failed");
      console.log("[PaymentIntent]", paymentIntent);
    }

    setProcessing(false); // Stop processing after payment attempt
  };

  return (
    <>
      <form
        className="max-w-lg border p-10 rounded-3xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-warning btn-sm mt-10"
          type="submit"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : "Pay"}
        </button>
      </form>
      {cardError && (
        <p className="bg-rose-50 px-10 py-3 rounded-lg text-rose-500 text-center mt-10 w-fit mx-auto">
          {cardError}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
