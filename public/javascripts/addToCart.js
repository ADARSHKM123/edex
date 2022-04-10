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