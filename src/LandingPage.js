import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';//
import './landingPage.css';
import logo from './EYLogo.jpg';
import creditCard from './creditcards.jpg';
 
const LandingPage = ({  }) => {
  const navigate = useNavigate();//
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const userdetails = JSON.parse(localStorage.getItem('userdetails'));
 
  useEffect(()=>{
   if(userdetails !==null){
    setIsLoggedIn(true)
   }
  },[userdetails])
  return (
 
    <div className="container">
      <header className="header">
        <div className="top-header">
        <div className="Logo">
          <img src={logo} alt="Bank Logo" className="logo" />
          </div>
          <h2>SilverLine Savings Bank</h2>
         
        </div>
        <div className="action-buttons">
          {!isLoggedIn && <>
          <button type='button' className="go-home" onClick={() => navigate('/register')}>Register</button>
          <button type='button' className="go-home" onClick={() => navigate('/login')}>Login</button> </>}
          {isLoggedIn &&<button type='button' className="go-home" onClick={() => navigate('/home')}>Home</button>}
        </div>
      </header>
   
        <div className="welcome-message">
          <h2>Welcome to SilverLine Savings Bank</h2>
          <p>Where your financial goals become reality.</p>
        </div>
         <div className="banner-container">
          <img src={creditCard} alt="Promotional Banner" className="banner-image" />
        </div>
       
      <footer className="footer">
        <p>&copy; 2024 SilverLine Savings Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}
 
export default LandingPage;