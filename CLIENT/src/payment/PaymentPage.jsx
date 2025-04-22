


import React from 'react'
import {CheckoutProvider} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';




const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KET)
function PaymentPage() {
  return (
    <div>
       




    </div>
  )
}

export default PaymentPage