

import React from 'react'
import{ CardElement, useElements, useStripe} from '@stripe/react-stripe-js'

function CheckoutForm () {

    const stripe = useStripe();
    const elemenst = useElements();

    const [errorMessage, setErrorMessage] = useState(null);

    // create payment 
    // confrim


    const handelSubmit = (event)=>{
        event.preventDefault();



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