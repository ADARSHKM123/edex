import axios from 'axios';
import { Showalert } from './alert';



export const addtoCart = async (productId) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `/api/v1/user/${productId}/cart`,

        })
        if (res.data.status == 'success')
            setTimeout(() => {
                Showalert('success', 'Added Sucessfully!');
            }, 1000);
        location.reload('/api/v1/user/');

    } catch (err) {
        Showalert('error', 'Error Try again', err);
    }
}



export const deleteCartItem = async (id) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/mycart/deleteCartItem/${id}`,

        })
        if (res.data.status == 'success')
            Showalert('success', 'Deleted Successfully');
        location.reload('/api/v1/user/mycart');

    } catch (err) {
        Showalert('error', 'Error Try again');
    }
}


export const deleteAllCart = async cartId => {
    try {
        const deleted = await axios({
            method: 'DELETE',
            url: `/api/v1/mycart/deleteCart/${cartId}`
        })
    } catch (err) {
        console.log(err);
        Showalert('error', err);
    }
}
