import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LLMRecommendation.css';
import { IoArrowBack } from "react-icons/io5";
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { listArray } from './data';

const App = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState(["", "", ""]);
  const [text,setText] = useState("")
  const [selectedTab, setSelectedTab] = useState('recommendation1');
  const [criteria, setCriteria] = useState("Generate a promotional campaign brief for a cashback offer targeting customers of business bank by using the following input details - Campaign Title : Summer Purchase discount, Campaign Budget : 100000 ,Campaign Start Date : 22 May 2024, Campaign End Date : 30 May 2024, Card Type : MasterCard, Transaction Type : Purchase, Not Eligible ,Transaction Type : Loan ,Minimum Over All Transaction Amount : 5000, Minimum Cashback Amount : 100, Maximum Cashback Overall : 1000, Maximum Cashback Per Transaction : 1000 , The offer should guarantee cashback based on monthly spending tiers for the valid customers and provide us the output in the detailed description with campaign name, no of eligible cards, card types, total budget amount, pending amount after providing cashback etc. Note: the above dates mentioned are campaigned dates and not the trancation dates, this cannot be used for querying database");

  const [tabularData, setTabularData] = useState([]); // Initialize tabular data as an array with three empty arrays

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    callLLMAPI()
    // setText(listArray.common_offer)
    // setTabularData(listArray.user_data)
  };

  useEffect(() => {
    callLLMAPI();
    handleTabClick('recommendation1')
  }, []);

  const callLLMAPI = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/generate_offer');
      // setTabularData(response.data.tabularData); // Update tabular data state with the received data
      setText(response.common_offer)
      setTabularData(response.user_data)
    } catch (error) {
      console.error("Error fetching data:", error);
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
            <button onClick={() => handleTabClick('recommendation1')} className={selectedTab === 'recommendation1' ? 'selected' : ''}>Cashback Recommendation 1</button>
            <button onClick={() => handleTabClick('recommendation2')} className={selectedTab === 'recommendation2' ? 'selected' : ''}>Cashback Recommendation 2</button>
            <button onClick={() => handleTabClick('recommendation3')} className={selectedTab === 'recommendation3' ? 'selected' : ''}>Cashback Recommendation 3</button>
          </div>
          <p>If you don't find relevant recommendation, please write your prompt below:</p>
          <textarea name="postContent" className='Recomm-input' value={criteria} onChange={(e) => setCriteria(e.target.value)} rows={4} cols={40} />
          <button className="submit-button" onClick={handleResubmit}>Resubmit</button>
        </div>
        <div className="Recomm-right">
          <h2>Criteria</h2>
          <h6>{text}</h6>
          <h2>{selectedTab}</h2>
          <div>
            <p>{responses[selectedTab === 'recommendation1' ? 0 : selectedTab === 'recommendation2' ? 1 : 2]}</p>
          </div>
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>CardId</th>
                  <th>TransactionAmount</th>
                  <th>Cashback</th>
                  <th>SuggestedTransactionAmount</th>
                  <th>SuggestedCashback</th>
                  <th>MaximumCashbackLimit</th>
                </tr>
              </thead>
              <tbody>
                {tabularData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.CardId}</td>
                    <td>{row.TransactionAmount}</td>
                    <td>{row.Cashback}</td>
                    <td>{row.SuggestedTransactionAmount}</td>
                    <td>{row.SuggestedCashbackAmount}</td>
                    <td>{row.MaximumCashbackLimit}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
