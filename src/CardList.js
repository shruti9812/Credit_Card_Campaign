import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CardList.css'; // Import CSS file for styling
import logo from './EYLogo.jpg';
import { IoArrowBack } from "react-icons/io5";


const CardList = (navigateTo) => {
  const [cards, setCards] = useState([]);
  const [hardcodedData] = useState([
    { CardId: 1, "Cashback amount": 10 },
    { CardId: 2, "Cashback amount": 20 },
    { CardId: 3, "Cashback amount": 15 }
  ]);

  const handleBack = () => {
    // Redirect to the Landing page
    window.location.href = '/home';
  };

  useEffect(() => {
    axios.get('/api/cards')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="card-list-container">
      
       <div className="Card-list-heading">
          <img src={logo} alt="Bank Logo" className="logo" />
          <h3 >Card Cashback Reccomendation List</h3>
          <button type='button' className="Card-Back-Button" onClick={handleBack}> <IoArrowBack />Back</button>
          </div>
      <div className="card-section">
        <h2>Hardcoded Data:</h2>
        <ul>
          {hardcodedData.map(card => (
            <li key={card.CardId} className="card-item">
              <span>Card ID: {card.CardId}</span>
              <span>Cashback Amount: {card['Cashback amount']}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-section">
        <h2>Data fetched from backend:</h2>
        <ul>
          {cards.map(card => (
            <li key={card.CardId} className="card-item">
              <span>Card ID: {card.CardId}</span>
              <span>Cashback Amount: {card['Cashback amount']}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardList;
