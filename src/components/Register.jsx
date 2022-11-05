import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Register() {
    const [username, setname] = useState("");
    const [email, setemail] = useState("");
    const navigate = useNavigate();
   
    // function handleRegister
    async function handleRegister(e) {
       e.preventDefault();
       try {
        const res = await Axios({
            url : 'http://localhost:5000/user/register',
            method : 'post',
            data :{
                username : username,
                email : email     
             }
          });
          alert(res.data.message);
          navigate('/');
          setname("");
          setemail("");
       } catch (error) {
         console.error(error);
       }
    }

    return (
        <div>
            <form className="form" onSubmit={handleRegister}>
                <h1>Register</h1>
                <input type="text" placeholder="Enter your username" value={username} onChange={e => setname(e.target.value)} required/><br />
                <input type="text" placeholder="Enter your email" value={email} onChange={e => setemail(e.target.value)} required/><br />
                <button type="submit">Register</button>
                <p>
                    Don't have an account{" "}
                    <Link to="/">Login</Link>
                </p>
            </form>
        </div>
    )
}

export default Register