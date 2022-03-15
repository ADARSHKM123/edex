console.log('login')

const login = async (email,password)=>{
    console.log(email,password);
    try{
        const result =  await axios({
              method:'POST',
              url:'http://localhost:3000/api/v1/users/login',
              data:{
                  email:email,
                  password:password,
       
              }
          });
          console.log(result);
    } catch(errr){
        console.log(err.response.data);
    }
}


document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    console.log('clicked');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email)
    console.log(password);
    login(email, password);
})    

