import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import axios from 'axios';
import "./RegisterFinal.css";

const Register = ({navigateTo}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    employeeId: "",
    position: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    if (password.length >= 8 && password.length <= 14) {
      return true;
    }
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/store_user/', formData);
      console.log('Form submitted');
      console.log('Response:', response.data);      
      } catch (error) {
      console.error('Error:', error);
      }
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!validateEmail(formData.email.trim())) {
      errors.email = "Enter a valid email";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (!validatePassword(formData.password)) {
      errors.password =
        "Password length should be in between 8 to 14 characters";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.employeeId.trim()) {
      errors.employeeId = "Employee ID is required";
    }
    if (!formData.position.trim()) {
      errors.position = "Position is required";
    }

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
      setErrors({});
      setFormData({
        fullName: "",
        email: "",
        password: "",
        // confirmPassword: "",
        employeeId: "",
        position: "",
      });
      setSubmitted(true);
      // Redirect or perform further actions upon successful submission
      // window.location.href = "/home";
    } else {
      // Set errors to display to the user
      setErrors(errors);
    }
  };

  const handleBack = () => {
    // Redirect to the home page
    window.location.href = "/home";
  };

  return (
    <section>
      <div className='container'>
        <div className='user signinBx'>
          <div className='imgBx'>
            <img
              //   src='https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg'
              src='ey.jpeg'
              alt=''
            />
          </div>
          <div className='formBx'>
            <form>
              
             
              <div className='header-container'>
                <button className='BackButton' onClick={handleBack}>
                  <IoArrowBack /> Back
                </button>
                <h3>Register as Bank Credit Card Department Employee</h3>
              </div>
              <input
                type='text'
                id='fullName'
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
                placeholder='Full Name *'
              />
              {errors.fullName && (
                <span className='error'>{errors.fullName}</span>
              )}
              <input
                type='text'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email Address *'
              />
              {errors.email && <span className='error'>{errors.email}</span>}
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Create Password *'
              />
              {errors.password && (
                <span className='error'>{errors.password}</span>
              )}

              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm Password *'
              />
              {errors.confirmPassword && (
                <span className='error'>{errors.confirmPassword}</span>
              )}
              <input
                type='text'
                id='employeeId'
                name='employeeId'
                value={formData.employeeId}
                onChange={handleChange}
                placeholder='Employee ID *'
              />
              {errors.employeeId && (
                <span className='error'>{errors.employeeId}</span>
              )}

              <input
                type='text'
                id='position'
                name='position'
                value={formData.position}
                onChange={handleChange}
                placeholder='Position *'
              />
              {errors.position && (
                <span className='error'>{errors.position}</span>
              )}
              <br />
              <input
                type='submit'
                name=''
                value='Register'
                onClick={handleSubmit}
              />
              {(submitted && <h6>You have been succesfully registered! Please Login <button className="error" onClick={() => navigateTo('login')}>Login</button></h6>)
              
            } 
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
