import React, { useState } from "react";
import ThankYouPage from "./ThankYouPage";
import { IoArrowBack } from "react-icons/io5";
import "./styles.css";
import axios from 'axios';

const FormPage = ({ navigateTo }) => {
  const [formData, setFormData] = useState({
    campaignTitle: "",
    campaignStartDate: "",
    campaignEndDate: "",
    cardType: "",
    campaignBudget: "",
    transactionType: "",
    notEligibletransactionType: "",
    minOverallTransactionAmount: "",
    minCashbackAmount: "",
    maxCashbackOverall: "",
    maxCashbackPerTransaction: "",
    frequency: "",
    additionalField: "", // New field
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/store_campaigndetails/', formData);
      console.log('Campaign Details Submitted');
      console.log('Response:', response.data);  
      //navigate("/hello")    
      } catch (error) {
      console.error('Error:', error);
      }
      e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const formErrors = {};
  //   // Validation logic
  //   setErrors(formErrors);
  //   if (Object.keys(formErrors).length === 0) {
  //     // Handle form submission if there are no errors
  //     console.log(formData);
  //   }

    
 

  const handleBack = () => {
    // Redirect to the home page
    window.location.href = "/home";
  };

  
    return (
      <div className='form-page-container'>
        <div className='form-container'>
          <div className='form-header'>
            <button className='BackButton' onClick={handleBack}>
                  <IoArrowBack /> Back
                </button>
                <h2 className='page-title'>
              Campaign Form to Calculate Cashback Amount
            </h2>
          </div>

          <form onSubmit={handleSubmit} className='full-width-form'>
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='campaignTitle'>Campaign Title:</label>
                <input
                  type='text'
                  id='campaignTitle'
                  name='campaignTitle'
                  value={formData.campaignTitle}
                  onChange={handleChange}
                  required
                  className='big-input'
                />
                {errors.campaignTitle && (
                  <span className='error'>{errors.campaignTitle}</span>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='campaignBudget'>Campaign Budget:</label>
                <input
                  type='text'
                  id='campaignBudget'
                  name='campaignBudget'
                  value={formData.campaignBudget}
                  onChange={handleChange}
                  required
                  className='big-input'
                />
                {errors.campaignBudget && (
                  <span className='error'>{errors.campaignBudget}</span>
                )}
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='campaignStartDate'>Campaign Start Date:</label>
                <input
                  type='date'
                  id='campaignStartDate'
                  name='campaignStartDate'
                  value={formData.campaignStartDate}
                  onChange={handleChange}
                  required
                  className='big-input'
                />
                {errors.campaignStartDate && (
                  <span className='error'>{errors.campaignStartDate}</span>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='campaignEndDate'>Campaign End Date:</label>
                <input
                  type='date'
                  id='campaignEndDate'
                  name='campaignEndDate'
                  value={formData.campaignEndDate}
                  onChange={handleChange}
                  required
                  className='big-input'
                />
                {errors.campaignEndDate && (
                  <span className='error'>{errors.campaignEndDate}</span>
                )}
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='cardType'>Card Type:</label>
                <select
                  id='cardType'
                  name='cardType'
                  value={formData.cardType}
                  onChange={handleChange}
                  required
                  className='big-input'
                >
                  <option value=''>Select a card type</option>
                  <option value='Card 1'>Visa</option>
                  <option value='Card 2'>Mastercard</option>
                  <option value='Card 3'>JCB</option>
                  <option value='Card 4'>American Express</option>
                  <option value='Card 5'>Discover</option>
                </select>
                {errors.cardType && (
                  <span className='error'>{errors.cardType}</span>
                )}
              </div>
              <div className='form-group'>
                <label htmlFor='transactionType'>Transaction Type:</label>
                <input
                  type='text'
                  id='transactionType'
                  name='transactionType'
                  value={formData.transactionType}
                  onChange={handleChange}
                  className='big-input'
                />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='notEligibletransactionType'>
                  Not Eligible Transaction Type:
                </label>
                <input
                  type='text'
                  id='notEligibletransactionType'
                  name='notEligibletransactionType'
                  value={formData.notEligibletransactionType}
                  onChange={handleChange}
                  className='big-input'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='minOverallTransactionAmount'>
                  Minimum Overall Transaction Amount:
                </label>
                <input
                  type='number'
                  id='minOverallTransactionAmount'
                  name='minOverallTransactionAmount'
                  value={formData.minOverallTransactionAmount}
                  onChange={handleChange}
                  className='big-input'
                />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='minCashbackAmount'>
                  Minimum Cashback Amount:
                </label>
                <input
                  type='number'
                  id='minCashbackAmount'
                  name='minCashbackAmount'
                  value={formData.minCashbackAmount}
                  onChange={handleChange}
                  className='big-input'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='maxCashbackOverall'>
                  Maximum Cashback Overall:
                </label>
                <input
                  type='number'
                  id='maxCashbackOverall'
                  name='maxCashbackOverall'
                  value={formData.maxCashbackOverall}
                  onChange={handleChange}
                  className='big-input'
                />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='maxCashbackPerTransaction'>
                  Maximum Cashback Per Transaction:
                </label>
                <input
                  type='number'
                  id='maxCashbackPerTransaction'
                  name='maxCashbackPerTransaction'
                  value={formData.maxCashbackPerTransaction}
                  onChange={handleChange}
                  className='big-input'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='frequency'>Frequency:</label>
                <input
                  type='text'
                  id='frequency'
                  name='frequency'
                  value={formData.frequency}
                  onChange={handleChange}
                  className='big-input'
                />
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group'>
                <label htmlFor='additionalField'>Additional Field:</label>
                <textarea
                  id='additionalField'
                  name='additionalField'
                  value={formData.additionalField}
                  onChange={handleChange}
                  className='big-input'
                />
              </div>
            </div>
            <button type='submit' className='submit-button' onClick={() => navigateTo('ThankYouPage')}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
 
};

export default FormPage;
