import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';//
import './LLMRecommendation.css';
import { IoArrowBack } from "react-icons/io5";
import logo from './EYLogo.jpg';

const App = ({ }) => {
  const navigate = useNavigate();//
  
  const [selectedTab, setSelectedTab] = useState('recommendation1');
  const [criteria, setCriteria] = useState('');
  const [data, setData] = useState([]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    // Fetch data from database based on selected tab
    // For example, you can use fetch or axios to get data
    // setData(fetchedData);
  };

  const handleResubmit = () => {
    // Fetch data based on criteria
    // For example, you can use fetch or axios to get data
    // setData(fetchedDataBasedOnCriteria);
  };
  // const handleBack = () => {
  //   // Redirect to the home page
  //   window.location.href = "/home";
    
  // };

  return (
    <div className="Recomm-App">
      <header className="Recomm-App-header">
      <button className='BackButton' onClick={() => navigate('/Create_Campaign')}>
                  <IoArrowBack /> Back
                </button>
                AI-Driven Cashback Recommendations
    
          {/* <img src={logo} alt="Bank Logo" className="logo" /> */}
          
      </header>
      <div className="Recomm-content">
        <div className="Recomm-left">
          <div className="Recomm-tabs">
            <button onClick={() => handleTabClick('recommendation1')}>Recommendation1</button>
            <button onClick={() => handleTabClick('recommendation2')}>Recommendation2</button>
            <button onClick={() => handleTabClick('recommendation3')}>Recommendation3</button>
          </div>
          <p>If you don't find relevant recommendation, please write your prompt below:</p>
          <input className='Recomm-input'
            type="text"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
          />
          <button className="submit-button" onClick={handleResubmit}>Resubmit</button>
        </div>
        <div className="Recomm-right">
          <h2>Criteria</h2>
          <p>{criteria}</p>
          <h2>Data</h2>
          <div>
            {data.length ? (
              <ul>
                {data.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
