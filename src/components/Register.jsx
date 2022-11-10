import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Register() {
    const [username, setname] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();
   
    // function handleRegister
    async function handleRegister(e) {
       e.preventDefault();
       try {
        const res = await Axios({
            url : 'http://localhost:8080/user/create',
            method : 'post',
            data :{
                username : username,
                phone_number : phoneNumber,
                password : password     
             }
          });
          alert(res.data.message);
          navigate('/');
          setname("");
          setphoneNumber("");
       } catch (error) {
        alert(error.response.data.message);
         console.error(error);
       }
    }

    return (
        <div>
            <form className="form" onSubmit={handleRegister}>
                <h1>Register</h1>
                <input type="text" placeholder="Enter your username" value={username} onChange={e => setname(e.target.value)} required/><br />
                <input type="text" placeholder="Enter your phone number" value={phoneNumber} onChange={e => setphoneNumber(e.target.value)} required/><br />
                <input type="text" placeholder="Enter your password" value={password} onChange={e => setpassword(e.target.value)} required/><br />
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