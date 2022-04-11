
import '@babel/polyfill';
import { login,logout } from './login';
import {addtoCart,myCart,deleteCartItem} from './Cart';


const loginform = document.querySelector('.form');
const logOutBtn = document.querySelector('.logout');
let addToCart = document.querySelectorAll('.to-cart');
const deleteItem = document.querySelectorAll('.deleting');

//Cart
const CartTotal = document.querySelectorAll('.totalPrice');
const CartPrice = document.querySelectorAll('.price');
const CartQuantity = document.querySelectorAll('.quantity');

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
        console.log('clicked');
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
CartPrice.forEach((e,i)=> newOnePrice[i] = e.textContent);
console.log(newOnePrice);
CartQuantity.forEach((e,i)=> newOneQty[i] = e.textContent);
console.log(newOneQty);
CartTotal.forEach((el,i)=> el.innerHTML = newOnePrice[i] * newOneQty[i]);


