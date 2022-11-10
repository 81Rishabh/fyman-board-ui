import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Axios from "axios";
import { useEffect } from "react";
import OrderList from "./OrderList";

function Dashboard() {
  const [user, setuser] = useState({});
  const [show, setshow] = useState(false);
  const [initalOrder, setinitalOrder] = useState([]);
  const [isOrderCreated, setisOrderCreated] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const accessToken = localStorage.getItem("access_token");

  // get logged in user
  useEffect(() => {
    if (loggedInUser != null) {
      getLoggedInUser();
    }
  }, []);


  function getLoggedInUser() {
    Axios({
      url: "http://localhost:8080/user/" + loggedInUser.id,
      method: "get",
    })
      .then((res) => {
        setuser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    Axios({
      url: "http://localhost:8080/orders/" + loggedInUser.id,
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        setinitalOrder([...res.data.data]);
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isOrderCreated]);

  return (
    <div className="dashboard-container">
      <header>
        <div className="header-left">
          <h3>Orders</h3>
          <button onClick={() => setshow(!show)}>Add Order</button>
        </div>
        <h4 className="username">{user && user.username}</h4>
      </header>
      <main>
        <Sidebar
          show={show}
          setshow={setshow}
          isOrderCreated={isOrderCreated}
          setisOrderCreated={setisOrderCreated}
          accessToken={accessToken}
          loggedInUser={loggedInUser}
        />
        <section className="orders-container">
          <ul>
            {
              !initalOrder ? 'Empty Orders' : <OrderList initalOrder={initalOrder} />
            } 
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
