import axios from 'axios';
import {Showalert} from './alert';


export const addProduct = async (productData)=>{

    console.log(productData);

    try{
        const successData = await axios({
            method:'POST',
            url:`http://localhost:3000/api/v1/products`,
            data:productData
        })
        if(successData.data.status === 'success'){
            Showalert('success','Added successfully!');
            //   window.setTimeout(()=>{
            //       location.assign('/');
            //   },1500);
          }

    }catch (err) {
        Showalert('error', 'Error Try again');
    }

}


export const deleteProduct = async(productid)=>{
    try{
        const successData = await axios({
            method:'DELETE',
            url:`http://localhost:3000/api/v1/products/${productid}`
        })
        if(successData === 'null'){
            Showalert('success','Deleted successfully!');
            //   window.setTimeout(()=>{
            //       location.assign('/');
            //   },1500);
          }

    }catch (err) {
        Showalert('error', 'Error Try again');
    }

}