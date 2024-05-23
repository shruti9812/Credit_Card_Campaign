import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';//
import './Page.css';
import logo from './EYLogo.jpg';
import bannerImage from './creditcards.jpg';
import userIcon from './User.jpg';
import UserManual from './UserManual.jpg';
 
const HomePage = ({  }) => {
  const navigate = useNavigate();//
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userData, setUserData] = useState(null);
 
  const handleUserIconClick = async () => {
    try {
      // Simulated fetch user details from MySQL database
      const response = await fetch('your_user_details_endpoint');
      const data = await response.json();
      setUserData(data);
      setShowUserDetails(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
 
  const handleCloseButtonClick = () => {
    setShowUserDetails(false);
  };
 
  return (
    <div className="container">
      <header className="header">
        <div className="top-header">
          <div className="Logo">
            <img src={logo} alt="Bank Logo" className="logo" />
          </div>
          <h2 className="header">SilverLine Savings Bank</h2>
          <div className="user-icon-container">
            <img
              src={UserManual}
              alt="User Manual"
              className="user-Manual"
              title="User Manual Guide"
            />
            <img
              src={userIcon}
              alt="User Icon"
              className="user-icon"
              title="user details"
              onClick={handleUserIconClick}
            />
          </div>
        </div>
      </header>
 
      <main className="main-content">
        <div className="content-container">
          <h2 className="heading h1">
            Welcome to Silverline Savings Credit Card Department
          </h2>
          <p className="description">
            Welcome to Silverline Savings Bank's Credit Card Department. We are
            dedicated to providing you with the best credit card services
            tailored to your financial needs. Whether you're looking for
            cashback rewards, travel perks, or low-interest rates, we have the
            perfect solution for you.
          </p>
          <h2 className="heading h3">
            Fill in the campaign mechanics and calculate the cashback amount
          </h2>
        </div>
        <div className="action-buttons">
          <button className="go-home" onClick={() => navigate('/login')}>
            View Campaign
          </button>
          <button
            className="go-home"
            onClick={() => navigate('/Create_Campaign')}
          >
            Create Campaign
          </button>
        </div>
        <p>
          Our team of experts is committed to ensuring that you have a seamless
          banking experience.
        </p>
      </main>
      <footer className="footer">
        <div className="footer-info">
          <p>Contact Us: 123-456-7890</p>
          <p>Email: info@yourbank.com</p>
        </div>
        <p>&copy; 2024 Silverline Savings Bank. All rights reserved.</p>
      </footer>
 
      {/* User Details Popup */}
      {showUserDetails && (
        <div className="user-details-popup">
          <div className="popup-content">
            <button className="close-button" onClick={handleCloseButtonClick}>
              Close
            </button>
            {userData ? (
              <div className="user-details">
                <h2>User Details</h2>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                {/* Add more user details here */}
              </div>
            ) : (
              <p>Loading user details...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
 
export default HomePage;