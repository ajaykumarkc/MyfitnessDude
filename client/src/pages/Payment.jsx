import React from 'react'
import { useEffect, useState } from "react";
import './payment.css'

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from '../components/CheckoutForm';

const Payment = () => {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
  
    useEffect(() => {
      fetch("http://localhost:8080/config").then(async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey));
      });
    }, []);
  
    useEffect(() => {
      fetch("http://localhost:8080/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({}),
      }).then(async (result) => {
        var { clientSecret } = await result.json();
        setClientSecret(clientSecret);
      });
    }, []);
  
    return (
      <>
      <div className='main2'>
        <h1>Buy Your Own GymKit for just ₹999</h1>
        
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
       
       </div>
      </>
    );
}

export default Payment