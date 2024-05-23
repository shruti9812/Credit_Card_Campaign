import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';//
import { IoArrowBack } from "react-icons/io5";
import './LoginFinal.css';
import axios from 'axios';


const Login = ({  }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleBack = () => {
    // Redirect to the Landing page
    navigate('/')
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login/', formData);
      console.log('login successfull');
      console.log('Response:', response.data);  
      window.location.href = '/home';
      localStorage.setItem('userdetails', JSON.stringify(response.data));
      } catch (error) {
      console.error('Error:', error);
      }

  

    // Basic validation
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length === 0) {
      try {
        // Simulate authentication API call
        // Replace this with your actual authentication logic
        // For demonstration, assuming successful login if username is "user" and password is "password"
        if (formData.username === 'username' && formData.password === 'password') {
          // Successful login
          console.log("Login successful");
          setFormData({ username: '', password: '' });
          setErrors({});
          setSubmitted(true);
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            // Redirect to another page after 1.5 seconds
            navigate('/home')
          }, 1500);
        } else {
          // Incorrect username or password
          console.error("Incorrect username or password");
          setErrors({ loginError: "Incorrect username or password" });
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrors({ loginError: "An error occurred during login. Please try again later." });
      }
    } else {
      // Set errors to display to the user
      setErrors(errors);
    }
  };

  return (
    <section>
      <div className="R-container">
        <div className="user signinBx">
          <div className='imgBx'>
            <img
              src="ey.jpeg"
              alt=''
            />
          </div>
          <div className='formBx'>
            <form>
              {(submitted && showSuccessMessage && <h3 className="success">Logged in successfully!</h3>)}
              {errors.loginError && (
                <span className='error'>{errors.loginError}</span>
              )}
              <div>
                <button className='BackButton' onClick={handleBack}>
                  <IoArrowBack />Back
                </button>
                <h2>Please Log in to your Account</h2>
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder='Username'
                required
              />
              {errors.username && (
                <span className='error'>{errors.username}</span>
              )}
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                required
              />
              {errors.password && (
                <span className='error'>{errors.password}</span>
              )}
              <br />
              <input
                type='submit'
                name=''
                value='Login'
                onClick={handleSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
