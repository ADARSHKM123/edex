
// window.onload=function(){
    document.querySelector('.form').addEventListener('submit',function(e){
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email);
    })
//   }