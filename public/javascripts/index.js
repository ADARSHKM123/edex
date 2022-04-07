
import '@babel/polyfill';
import { login } from './login';

const loginform = document.querySelector('.form');


// const header = document.querySelector('.header');
if(loginform)
document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
})    



//Account ///////////////////////////////////////////////////////
// window.onload=function(){
    // document.querySelector('.form').addEventListener('submit',function(e){
    //     e.preventDefault();
    //     const email = document.getElementById('email').value;
    //     const password = document.getElementById('password').value;
    //     console.log(email);
    // })
//   }