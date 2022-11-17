import React , {useState} from 'react';
import AddTopicForm from './AddTopicForm';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import { useEffect } from 'react';

function Dashboard() {
  const [topics ,settopics] = useState([]);
  const [isAdded , setisAdded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
   async function fetchTopic(){
      try {
         const res = await Axios({
           url: 'http://localhost:5000/topic',
           method: 'get',
         });
         settopics(res.data.data);
       } catch (error) {
         console.error(error);
       }
    }
    fetchTopic();
  },[isAdded]);

  return (
    <div className="dashboard-container">
       <header>
          <button className="logout-btn" onClick={() => {
            localStorage.removeItem("user");
            navigate('/');
          }}>Logout</button>
       </header>
       <div className="dashboard">
          <AddTopicForm setidAdded={setisAdded} isAdded={isAdded}/>
          <div className="main-dashboard">
              <header>
                <h3>Topics</h3>
              </header>
              <div className="Topic-container">
                 {
                  topics.length > 0 && topics.map(item => {
                     return <li key={item._id}>
                       <span>{item.TopicName}</span>
                       <span>{item.percent}%</span>
                      </li>
                  })
                 }
              </div>
          </div>
       </div>
    </div>
  )
}

export default Dashboard;