import React , {useState} from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import './App.css';
import AuthContainer from './components/AuthContainer';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
          <Route path="/" element={<AuthContainer />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
     </BrowserRouter>,
    </div>
  );
}

export default App;
