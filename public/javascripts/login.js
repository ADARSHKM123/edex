import axios from 'axios';

export const login = async (email,password)=>{
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
        //   if(result.response.data.statusText)
    } catch(err){
        console.log(err.response.data);
    }
}
