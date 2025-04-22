

import React from 'react'
import{ useElements, useStripe} from '@stripe/react-stripe-js'

function CheckoutForm () {

    const stripe = useStripe();
    const elemenst = useElements();

    const [errorMessage, setErrorMessage] = useState(null);

    
 



  return (
    <div>




    </div>
  )
}

export default CheckoutForm 