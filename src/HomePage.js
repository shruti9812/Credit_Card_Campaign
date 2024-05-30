import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Page.css';
import logo from './EYLogo.jpg';
import bannerImage from './creditcards.jpg';
import userIcon from './User.jpg';
import UserManual from './UserManual.jpg';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

const HomePage = () => {
  const hasReloaded = localStorage.getItem('hasReloaded');
  useEffect(() => {
    if(hasReloaded === null){
      localStorage.setItem('hasReloaded', false);
    
    }
  }, []);
  const navigate = useNavigate();
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userData, setUserData] = useState(null);
  const [show, setShow] = useState(false);
  const userdetails = JSON.parse(localStorage.getItem('userdetails'));

  // useEffect(() => {
  //   if (userdetails === null) {
  //     navigate('/login');
  //   }
  // }, [userdetails]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUserIconClick = async () => {
    try {
      // Simulated fetch user details from MySQL database
      const response = await fetch('your_user_details_endpoint');
      const data = await response.json();
      setUserData(data);
      setShowUserDetails(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userdetails');
    navigate('/');
  };

  return (
    <div className="Landing-container">
      <header className="Home-header">
        <div className="Home-left">
          <div className="Logo">
            <img src={logo} alt="Bank Logo" className="logo" />
          </div>
          <h2>SilverLine Savings Bank</h2>
        </div>
        <div className="Home-right">
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
            title="User Details"
            onClick={handleShow}
          />
        </div>
      </header>

      <main className="main-content">
        <div className="content-container">
          <h2 className="welcome-message">
            Welcome to Silverline Savings Credit Card Department
          </h2>
          <p className="welcome-message">
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
          <button className="go-home" onClick={() => navigate('/dashboard')}>
            View Campaign
          </button>
          <button className="go-home" onClick={() => navigate('/Create_Campaign')}>
            Create Campaign
          </button>
        </div>
        <p>
          Our team of experts is committed to ensuring that you have a seamless
          banking experience.
        </p>
      </main>
      <footer className="Landing-footer">
        <div className="footer-info">
          <p>Contact Us: 123-456-7890</p>
          <p>Email: info@yourbank.com</p>
        </div>
        <p>&copy; 2024 Silverline Savings Bank. All rights reserved.</p>
      </footer>

    <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton className="custom-modal-header" style={{backgroundColor:"black"}} >
          <img src={logo} alt="Bank Logo" className="logo"  height={"100px"} width={"100px"}/>
          <Modal.Title className="custom-modal-title" style={{color:"yellow"}}>User Details</Modal.Title>
        </Modal.Header>
        {userdetails !== null && userdetails !== undefined && (
          <Modal.Body>
            <p><strong>Name:</strong> {userdetails.username}</p>
            <p><strong>Email:</strong> {userdetails.email}</p>
            <p><strong>EmployeeId:</strong> {userdetails.employeeid}</p>
            <p><strong>Position:</strong> {userdetails.position}</p>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" style={{backgroundColor:"black"}} onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HomePage;

    