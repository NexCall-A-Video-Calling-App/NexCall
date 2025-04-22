

import React from 'react'
import{ CardElement, useElements, useStripe} from '@stripe/react-stripe-js'

function CheckoutForm () {

    const stripe = useStripe();
    const element = useElements();

    const [errorMessage, setErrorMessage] = useState(null);

    // create payment 
    // confrim


    const handelSubmit =async (event)=>{
        event.preventDefault();

        if(!stripe || !element){
            return;
        }

        // create payment method 

        const {error , paymentMethod } = await stripe.createPaymentMethod({
            type:'card',
            card:element.getElement(CardElement)
        });




    }

    
 



  return (
    <div>
        <form onSubmit={handelSubmit}>
            <CardElement>

            </CardElement>


        </form>




    </div>
  )
}

export default CheckoutForm 