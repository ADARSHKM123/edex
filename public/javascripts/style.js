console.log('Hey there'); 


// const login = async (email, password) => {
//     // console.log(email,password);
//     try {
//         const result = await axios({method: 'POST', url: 'http://127.0.0.1:3000/api/v1/users/login', data: {
//             email,
//             password
//         },
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//           },
//         withCredentials: true})
//         console.log(result);
//     } catch (err) {
//         console.log(err.response.data);
//     }
// }   

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    console.log('clicked');
    // const email = document.getElementById('email').value;
    // const password = document.getElementById('password').value;
    // console.log(email)
    // login(email, password);
})    