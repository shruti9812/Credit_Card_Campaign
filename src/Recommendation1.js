import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LLMRecommendation.css';
import { IoArrowBack } from "react-icons/io5";
import axios from 'axios';

const App = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState(["", "", ""]); // Initialize responses as an array with three empty strings
  const [selectedTab, setSelectedTab] = useState('recommendation1');
  const [criteria, setCriteria] = useState("Generate a promotional campaign brief...");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    callLLMAPI();
  }, []);

  const callLLMAPI = async () => {
    try {
      const payload = { prompt: criteria };
      const response = await axios.post('http://127.0.0.1:8000/fetch-data', payload);
      setResponses(response.data.responses); // Update responses state with the received data
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors as needed
    }
  }

  const handleResubmit = () => {
    setSelectedTab("recommendation1");
    callLLMAPI();
  };

  return (
    <div className="Recomm-App">
      <header className="Recomm-App-header">
        <button className='BackButton' onClick={() => navigate('/Create_Campaign')}>
          <IoArrowBack /> Back
        </button>
        AI-Driven Cashback Recommendations
      </header>
      <div className="Recomm-content">
        <div className="Recomm-left">
          <div className="Recomm-tabs">
            <button onClick={() => handleTabClick('recommendation1')} className={selectedTab === 'recommendation1' ? 'selected' : ''}>Recommendation1</button>
            <button onClick={() => handleTabClick('recommendation2')} className={selectedTab === 'recommendation2' ? 'selected' : ''}>Recommendation2</button>
            <button onClick={() => handleTabClick('recommendation3')} className={selectedTab === 'recommendation3' ? 'selected' : ''}>Recommendation3</button>
          </div>
          <p>If you don't find relevant recommendation, please write your prompt below:</p>
          <textarea name="postContent" className='Recomm-input' value={criteria} onChange={(e) => setCriteria(e.target.value)} rows={4} cols={40} />
          <button className="submit-button" onClick={handleResubmit}>Resubmit</button>
        </div>
        <div className="Recomm-right">
          <h2>Criteria</h2>
          <h2>{selectedTab}</h2>
          <div>
            <p>{responses[selectedTab === 'recommendation1' ? 0 : selectedTab === 'recommendation2' ? 1 : 2]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
