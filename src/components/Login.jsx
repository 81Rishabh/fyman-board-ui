import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
function Login() {
    const [phoneNumber, setphoneNumber] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    //  submit handleer
    async function handleLogin(e) {
        e.preventDefault();
        try {
         let res = await Axios({
             url : 'http://localhost:8080/user/login',
             method : 'post',
              data:{
                 phone_number : phoneNumber,
                 password : password     
              }
           });
        
        //  set user to localstorage
           let user = res.data.user;
           localStorage.setItem("user" , JSON.stringify({id : user._id , isLoggedIn : true}));
           localStorage.setItem("access_token" , res.data.access_token);
           navigate('/dashboard');
           setphoneNumber("");
        } catch (error) {
          console.error(error);
      }
    }

    return (
        <div>
            <form className="form" onSubmit={handleLogin}>
                <h1>Login</h1>
                <input type="text" placeholder="Enter your phone number" value={phoneNumber} onChange={e => setphoneNumber(e.target.value)} required/><br />
                <input type="text" placeholder="Enter your password" value={password} onChange={e => setpassword(e.target.value)} required/><br />
                <button type="submit">Login</button>
                <p>
                    Don't have an account{" "}
                    <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    )
}

export default Login