import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';//
import './LLMRecommendation.css';
import { IoArrowBack } from "react-icons/io5";
import logo from './EYLogo.jpg';

const App = ({ }) => {
  const navigate = useNavigate();//
  const [response,setResponse]  = useState(["first Recommendation", "second Recommendation", "third Recommendation"])
  const [selectedTab, setSelectedTab] = useState('recommendation1');
  const [criteria, setCriteria] = useState('');
  const [data, setData] = useState([]);
  const [submit,setSubmit ] = useState(false)
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleResubmit = () => {
    setSubmit(true)
    setSelectedTab("User")
    let data = response
    data.push("Enter By user")
    console.log(data)
    setResponse([...data])
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
            <button onClick={() => handleTabClick('recommendation1')} className={selectedTab  === 'recommendation1' ? 'selected' : ''}>Recommendation1</button>
            <button onClick={() => handleTabClick('recommendation2')} className={selectedTab  === 'recommendation2' ? 'selected' : ''}>Recommendation2</button>
            <button onClick={() => handleTabClick('recommendation3')}className={selectedTab  === 'recommendation3' ? 'selected' : ''}>Recommendation3</button>
          </div>
          <p>If you don't find relevant recommendation, please write your prompt below:</p>
         
          <textarea name="postContent" className='Recomm-input' onChange={(e) => setCriteria(e.target.value)} rows={4} cols={40} />
          <button className="submit-button" onClick={handleResubmit}>Resubmit</button>
        </div>
        <div className="Recomm-right">
          <h2>Criteria</h2>
          <h2>{selectedTab}</h2>
          { selectedTab === 'recommendation1' && !submit && <div>
            <p>{response[0]}</p>
          </div>}
          { selectedTab === 'recommendation2' &&  !submit &&<div>
          <p>{response[1]}</p>
          </div>}
          { selectedTab === 'recommendation3' && !submit && <div>
          <p>{response[2]}</p>
          </div>}
          {submit && <div> <p>{response[3]}</p> </div>}
        </div>
      </div>
    </div>
  );
};

export default App;
