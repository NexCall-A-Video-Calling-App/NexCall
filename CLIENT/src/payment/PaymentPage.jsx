


import React from 'react'
import {CheckoutProvider, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm ';




const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY)


function PaymentPage() {



  return (
    <div>

        <Elements stripe={stripePromise}>
            
            <CheckoutForm/>

        </Elements>
       




    </div>
  )
}

export default PaymentPage