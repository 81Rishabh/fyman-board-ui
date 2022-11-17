import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
function Login() {
    const [email, setemail] = useState("");
    const navigate = useNavigate();

    //  submit handleer
    async function handleLogin(e) {
        e.preventDefault();
        e.preventDefault();
        try {
         let res = await Axios({
             url : 'http://localhost:5000/user/login',
             method : 'post',
             data :{
                 email : email     
              }
           });
        
        //  set user to localstorage
           let user = res.data.user;
           localStorage.setItem("user" , JSON.stringify({id : user._id , isLoggedIn : true}));
           navigate('/dashboard');
           setemail("");
        } catch (error) {
          console.error(error);
      }
    }

    return (
        <div>
            <form className="form" onSubmit={handleLogin}>
                <h1>Login</h1>
                <input type="text" placeholder="Enter your email address..." value={email} onChange={e => setemail(e.target.value)} /><br />
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