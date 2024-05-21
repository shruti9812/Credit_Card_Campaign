import './ThankYouPage.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';//

const ThankYouPage = ({ }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    // Redirect to the home page
    window.location.href = '/home';
  };

  return (
    <div className='main'>
      <div className='content'>
        <div className='wrapper-1'>
          <div className='wrapper-2'>
            <h1 className='T-headers'>Thank you !</h1>
            <p>Your details have been successfully submitted.</p>
            <button className='go-home' onClick={() => navigate('/recommendation')}>View Distributed Cashback</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;