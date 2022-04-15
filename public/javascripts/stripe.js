import axios from 'axios';
import {Showalert} from './alert';


const stripe = Stripe('pk_test_51Ki0l3SAJq8NpmmnqGpKVFpjKeA77QIj9tMzhRTu7qUgOoPX891r5KERrXS2Eg63hMYcAFZWunxvx717O1YXPCZS00BxfbxzbR');

export const checkout = async cartId=>{
   try{
       const session = await axios(
           `http://localhost:3000/api/v1/booking/checkout-session/${cartId}`
       );
       await stripe.redirectToCheckout({
        sessionId: session.data.session.id
      });

   }catch (err) {
    console.log(err);
    Showalert('error', err);
  }
} 

