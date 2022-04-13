import axios from 'axios';
import {Showalert} from './alert';



export const addtoCart = async (productId) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `http://localhost:3000/api/v1/user/${productId}/cart`,

        })
        if (res.data.status == 'success')
        console.log(productId);
        setTimeout(() => {                 
        Showalert('success', 'Added Sucessfully!'); 
        }, 1000);
        location.reload('http://localhost:3000/api/v1/user/');

    } catch (err) {
        console.log(productId);
        Showalert('error', 'Error Try again');
    }
} 



export const deleteCartItem = async (id) => { 
    try {
        const res = await axios({
            method: 'GET',
            url: `http://localhost:3000/api/v1/mycart/deleteCartItem/${id}`,

        })
        if (res.data.status == 'success') 
        Showalert('success', 'Deleted Successfully');
        location.reload('http://localhost:3000/api/v1/user/mycart');

    } catch (err) {
        Showalert('error', 'Error Try again');
    } 
} 


export const deleteAllCart = async cartId=>{
    try{
       const deleted = await axios({
            method:'DELETE',
            url:`http://localhost:3000/api/v1/mycart/deleteCart/${cartId}`
        })
    }catch (err) {
        console.log(err);
        Showalert('error', err);
      }
}
