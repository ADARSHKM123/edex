import '@babel/polyfill';
import { login,logout } from './login';
import {addtoCart,myCart,deleteCartItem} from './cart';
import {checkout} from './stripe';



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


// const MyCartHandler = document.querySelector('.to-mycart');

// const header = document.querySelector('.header');
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
        console.log(btn.dataset.id);
        deleteCartItem(btn.dataset.id);
    }))
}
// if(MyCartHandler){
//     console.log('add to cart');
//     MyCartHandler.addEventListener('click',e=>{
//         console.log('clicked');
//         myCart
//     }); 
// }
  

//Account ///////////////////////////////////////////////////////
// window.onload=function(){
    // document.querySelector('.form').addEventListener('submit',function(e){
    //     e.preventDefault();
    //     const email = document.getElementById('email').value;
    //     const password = document.getElementById('password').value;
    //     console.log(email);
    // })
//   }
let newOnePrice = [];
let newOneQty = [];
let newCartTtl = [];
CartPrice.forEach((e,i)=> newOnePrice[i] = e.textContent);
CartQuantity.forEach((e,i)=> newOneQty[i] = e.textContent);
CartTotal.forEach((el,i)=> el.innerHTML = newOnePrice[i] * newOneQty[i]);
// Cart Grant Total 
CartTotal.forEach((e,i)=>  newCartTtl[i] = e.textContent);
grantTotal.innerHTML = newCartTtl.reduce(getSum, 0);
function getSum(total, num) {
  return total + Math.round(num);
}
 

if(cartBtn)
    cartBtn.addEventListener('click',e=>{
        console.log('clicked');
        e.target.textContent = 'Processing....'
        const cartId = cartBtn.dataset.cart;
        console.log(cartId);
        checkout(cartId); 
    })
  
