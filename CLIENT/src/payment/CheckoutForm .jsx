

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

        if(error)
        {
            console.log("error form checkout page",error);
        }else{
            console.log("paymnet done ",paymentMethod.id);
        }




    }

    
 



  return (
    <div>
        <form onSubmit={handelSubmit}>
            <CardElement>
                <button type='submit' disabled={!stripe}>
                    Pay
                </button>

            </CardElement>


        </form>




    </div>
  )
}

export default CheckoutForm 