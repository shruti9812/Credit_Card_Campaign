import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDetails.css'; // Import CSS file for styling

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) {
      setUser(dummyUserDetails);
    } else {
      axios.get(`/api/user/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [userId]);

  const dummyUserDetails = {
    fullName: '',
    email: '',
    employeeId: '',
    position: '',
   
  };

  return (
    <div className="user-page-container">
      <div className="user-details-container">
      <h3 className="user-Details-heading">User Details</h3>
        
        {user ? (
          <div>
            <p><strong>Full Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Employee ID:</strong> {user.employeeId}</p>
            <p><strong>Position:</strong> {user.position}</p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
