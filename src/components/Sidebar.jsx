import React, { useState , useEffect } from 'react';
import Axios from 'axios';
function Sidebar({show ,setshow, isOrderCreated, setisOrderCreated,accessToken,loggedInUser}) {
  const [subtotal , setsubtotal] = useState(0);
  const [phoneNumber, setphoneNumber] = useState("");
  
  function createOrders(e) {
    e.preventDefault();
    Axios({
      url : 'http://localhost:8080/orders/create',
      method :'post',
      data : {
        user_id : loggedInUser.id,
        sub_total : subtotal,
        phone_number : phoneNumber
      },
      headers : {
        Authorization : `Bearer ${accessToken}`
      }
    })
    .then((res) => {
      alert(res.data.message);
      
      setisOrderCreated(!isOrderCreated);
      setsubtotal(0);
      setphoneNumber("");
      setshow(false);
    }).catch((err) => {
      console.log(err);  
      alert(err.reponse.data.message);
    });
  }

  return (
    <section className="add-order-form" style={{
        display: show ? 'block' : 'none'
    }}>
      <h4>Add New Orders</h4>
      <form className="form" onSubmit={createOrders}>
         <input type="number" placeholder="Enter Subtotal" value={subtotal} onChange={e => setsubtotal(e.target.value)}/> 
         <input type="tel" id="phone" name="phone" placeholder="123-45-678" value={phoneNumber} onChange={e => setphoneNumber(e.target.value)}  required /> <br />
         <button type="submit" className="add-order-button">Add</button>
      </form>
    </section>
  )
}

export default Sidebar;