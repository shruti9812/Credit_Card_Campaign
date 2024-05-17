import './ThankYouPage.css';
import React, { useState } from "react";

const ThankYouPage = ({navigateTo}) => {
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
            <button className='go-home' onClick={() => navigateTo('CardList')}>View Distributed Cashback</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;