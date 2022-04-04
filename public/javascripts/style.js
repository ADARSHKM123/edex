

const dropdownNav = document.querySelector('.dropdown')
const myuser = document.querySelector('.dropdown-content')
const container = document.querySelector('.existed');

dropdownNav.addEventListener('mouseenter',e=>{
    console.log('entered');
    myuser.classList.remove("default-hidden");
    
})
// document.querySelector('.html').addEventListener('click',e=>{
//     e.preventDefault();
//     console.log('clicked');
//     myuser.classList.add("default-hidden"); 
// })
