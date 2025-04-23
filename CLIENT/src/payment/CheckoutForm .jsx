import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

function CheckoutForm({price,name}) {

  const { user, userLogOut } = useAuth();
  console.log(price*100, ' price');



  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  // Fetch Payment Intent from Backend
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await axios.post('http://localhost:5000/create-payment-intent', {
          amount: price, 
          currency: 'usd'
        });
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        setError('Failed to initialize payment');
        console.error('Payment intent error:', err.response?.data || err.message);
      }
    };
    fetchPaymentIntent();




    

  }, []);
  console.log(clientSecret);

  // Handle Payment Submission
  const handleSubmit = async (event) => {

    console.log(clientSecret, " submit");


    

    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setError(null);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user?.email,
              // Add more dynamic data as needed:
              // email: userEmail,
              // address: {
              //   line1: shippingAddress,
              //   postal_code: zipCode
              // }
            },
          },
        }
      );

      if (stripeError) {
        throw stripeError;
      }

      await axios.post('http://localhost:5000/payment-success',{email:user.email,
        plan:name,
        price:price,
        name:user?.name




      })




      setPaymentSuccess(true);
      console.log('Payment succeeded:', paymentIntent);
      
    } catch (err) {
      setError(err.message || 'Payment failed');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {paymentSuccess ? (
        <div className="p-4 text-center bg-green-50 rounded-lg text-green-700">
          <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Payment successful! Thank you for your purchase.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 border border-gray-300 rounded-md">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#ff5252',
                  },
                },
              }}
            />
          </div>
          
          {error && (
            <div className="p-3 text-red-600 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={!stripe || loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
              (!stripe || loading) ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            } transition-colors`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Pay $10.00`
            //   convert to dynamic 
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default CheckoutForm;