import '@babel/polyfill';
import { login,logout } from './login';
import {addtoCart,myCart,deleteCartItem,deleteAllCart} from './cart';
import {checkout} from './stripe';
import { addProduct,deleteProduct } from './admin-addproduct';


const loginform = document.querySelector('.form');
const logOutBtn = document.querySelector('.logout');
let addToCart = document.querySelectorAll('.to-cart');
const deleteItem = document.querySelectorAll('.deleting');

//Cart
const CartTotal = document.querySelectorAll('.total-each'); 
const CartPrice = document.querySelectorAll('.price-each'); 
const CartQuantity = document.querySelectorAll('.quantityEach'); 
const grantTotal = document.querySelector('.grant-total');
const cartBtn = document.querySelector('.cart-checkout');                 
const productDelete = document.querySelectorAll('.delete-btn');  



if(loginform)
document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
})   

if(logOutBtn){
    logOutBtn.addEventListener('click',logout)   
} 

if(addToCart){
    addToCart.forEach(btn=>btn.addEventListener('click',e=>{
        addtoCart(btn.dataset.id)
    }))
}

if(deleteItem){
    deleteItem.forEach(btn=>btn.addEventListener('click',e=>{
        deleteCartItem(btn.dataset.id);
    }))
}

if(productDelete){
    productDelete.forEach(el=> {
        el.addEventListener('click',e=>{
            e.preventDefault();
            const productId =el.dataset.productid
            deleteProduct(productId);
            // console.log(productId);
        })
    })
}


//Cart Garnt Total///////////////

let newOnePrice = [];
let newOneQty = [];
let newCartTtl = [];
CartPrice.forEach((e,i)=> newOnePrice[i] = e.textContent);
CartQuantity.forEach((e,i)=> newOneQty[i] = e.textContent);
CartTotal.forEach((el,i)=> el.innerHTML = newOnePrice[i] * newOneQty[i]);

// Cart Grant Total ////
const initialValue = 0;
CartTotal.forEach((e,i)=>  newCartTtl[i] = +e.textContent);
 const CartSum = newCartTtl.reduce(getSum, initialValue);
function getSum(total, num) {
  return total + Math.round(num);
}
grantTotal.innerHTML = CartSum;

//Cart Checkout /////////////////////////////

if(cartBtn)
    cartBtn.addEventListener('click',e=>{
        e.target.textContent = 'Processing....'
        const cartId = cartBtn.dataset.cart;
        checkout(cartId); 
        deleteAllCart(cartId);
    })
  
