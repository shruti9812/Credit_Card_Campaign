import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LLMRecommendation.css';
import { IoArrowBack } from "react-icons/io5";
import axios from 'axios';
import { Table } from 'react-bootstrap';

const first = {
  common_offer:"The Customer will get guaranteed cashback if the customer increases it's transaction amount by 10%-15%.The cashback ranges between 1%-2% of the transaction amount. The minimum overall spend of the customer should be at least 55%-65% of the total card limit. Maximum cashback to be earned Rs.1000 per card. The eligible cards are Mastercard platinum , Visa gold.",
  user_data:[
    {
        "card_id": 1144673,
        "transaction_amount": 50678,
        "cashback": 519.4974185,
        "suggested_transaction_amount": 55747,
        "suggested_cashback_amount": 569.52,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144674,
        "transaction_amount": 32763,
        "cashback": 386.02,
        "suggested_transaction_amount": 35322.4,
        "suggested_cashback_amount": 416.448,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144675,
        "transaction_amount": 50981,
        "cashback": 500.89,
        "suggested_transaction_amount": 55106.8,
        "suggested_cashback_amount": 602.136,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144676,
        "transaction_amount": 44657,
        "cashback": 460.5025815,
        "suggested_transaction_amount": 49524.4,
        "suggested_cashback_amount": 512.488,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144677,
        "transaction_amount": 58234,
        "cashback": 580,
        "suggested_transaction_amount": 64862,
        "suggested_cashback_amount": 637.24,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144678,
        "transaction_amount": 81258,
        "cashback": 827.92,
        "suggested_transaction_amount": 90350.4,
        "suggested_cashback_amount": 937.008,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144679,
        "transaction_amount": 41654,
        "cashback": 437.92,
        "suggested_transaction_amount": 45550.4,
        "suggested_cashback_amount": 571.008,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144680,
        "transaction_amount": 39013,
        "cashback": 399.18,
        "suggested_transaction_amount": 43901.6,
        "suggested_cashback_amount": 439.032,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144681,
        "transaction_amount": 87606,
        "cashback": 880,
        "suggested_transaction_amount": 94894.8,
        "suggested_cashback_amount": 957.896,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144682,
        "transaction_amount": 50235,
        "cashback": 501.67,
        "suggested_transaction_amount": 55200.4,
        "suggested_cashback_amount": 564.008,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144683,
        "transaction_amount": 77324,
        "cashback": 780,
        "suggested_transaction_amount": 83294.8,
        "suggested_cashback_amount": 865.896,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144684,
        "transaction_amount": 50356,
        "cashback": 503.17,
        "suggested_transaction_amount": 55380.4,
        "suggested_cashback_amount": 567.608,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144685,
        "transaction_amount": 70345,
        "cashback": 717.77,
        "suggested_transaction_amount": 77132.4,
        "suggested_cashback_amount": 782.648,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144686,
        "transaction_amount": 21567,
        "cashback": 210.99,
        "suggested_transaction_amount": 23318.8,
        "suggested_cashback_amount": 226.376,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144687,
        "transaction_amount": 68567,
        "cashback": 680,
        "suggested_transaction_amount": 7400,
        "suggested_cashback_amount": 742,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144688,
        "transaction_amount": 68567,
        "cashback": 680,
        "suggested_transaction_amount": 7444.4,
        "suggested_cashback_amount": 742.888,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144689,
        "transaction_amount": 27321,
        "cashback": 278.11,
        "suggested_transaction_amount": 29373.2,
        "suggested_cashback_amount": 307.464,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144690,
        "transaction_amount": 38123,
        "cashback": 383.99,
        "suggested_transaction_amount": 41078.8,
        "suggested_cashback_amount": 411.576,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144691,
        "transaction_amount": 38567,
        "cashback": 380,
        "suggested_transaction_amount": 41014.4,
        "suggested_cashback_amount": 404.288,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144692,
        "transaction_amount": 58256,
        "cashback": 580,
        "suggested_transaction_amount": 63313.2,
        "suggested_cashback_amount": 636.264,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144673,
        "transaction_amount": 52890,
        "cashback": 519.4974185,
        "suggested_transaction_amount": 57476,
        "suggested_cashback_amount": 569.52,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144676,
        "transaction_amount": 46123,
        "cashback": 460.5025815,
        "suggested_transaction_amount": 45524.4,
        "suggested_cashback_amount": 512.488,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144677,
        "transaction_amount": 78451,
        "cashback": 780,
        "suggested_transaction_amount": 85862,
        "suggested_cashback_amount": 817.24,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144683,
        "transaction_amount": 48091,
        "cashback": 480,
        "suggested_transaction_amount": 53294.8,
        "suggested_cashback_amount": 365.896,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144688,
        "transaction_amount": 35789,
        "cashback": 356,
        "suggested_transaction_amount": 38144.4,
        "suggested_cashback_amount": 402.888,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144681,
        "transaction_amount": 90245,
        "cashback": 980,
        "suggested_transaction_amount": 100894.8,
        "suggested_cashback_amount": 1000,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144685,
        "transaction_amount": 90345,
        "cashback": 917.77,
        "suggested_transaction_amount": 101132.4,
        "suggested_cashback_amount": 992.648,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144678,
        "transaction_amount": 82712,
        "cashback": 827.92,
        "suggested_transaction_amount": 90350.4,
        "suggested_cashback_amount": 907.008,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144684,
        "transaction_amount": 50981,
        "cashback": 503.17,
        "suggested_transaction_amount": 65380.4,
        "suggested_cashback_amount": 557.608,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144682,
        "transaction_amount": 51678,
        "cashback": 501.67,
        "suggested_transaction_amount": 65380.4,
        "suggested_cashback_amount": 557.608,
        "maximum_cashback_limit": 1000
    }
  ]
}
const second = {
  common_offer:"Total Budget for the campaign is 30000 which is equally divided among all the customer. The cashback ranges in between 1%-2% of the transaction amount. The suggested cashback can gets increased by 10%-15% of the previous cashback if the transaction amount also gets increased by 10%-15%. The customer who have there CIBIL score in between 800-850 and have MasterCard or Visa cards are eligible for the cashback.",
  user_data:[
    {
        "card_id": 1144673,
        "transaction_amount": 50678,
        "cashback": 519.4974185,
        "suggested_transaction_amount": 55747,
        "suggested_cashback_amount": 569.52,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144674,
        "transaction_amount": 32763,
        "cashback": 386.02,
        "suggested_transaction_amount": 35322.4,
        "suggested_cashback_amount": 416.448,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144675,
        "transaction_amount": 50981,
        "cashback": 500.89,
        "suggested_transaction_amount": 55106.8,
        "suggested_cashback_amount": 602.136,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144676,
        "transaction_amount": 44657,
        "cashback": 460.5025815,
        "suggested_transaction_amount": 49524.4,
        "suggested_cashback_amount": 512.488,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144677,
        "transaction_amount": 58234,
        "cashback": 580,
        "suggested_transaction_amount": 64862,
        "suggested_cashback_amount": 637.24,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144678,
        "transaction_amount": 81258,
        "cashback": 827.92,
        "suggested_transaction_amount": 90350.4,
        "suggested_cashback_amount": 937.008,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144679,
        "transaction_amount": 41654,
        "cashback": 437.92,
        "suggested_transaction_amount": 45550.4,
        "suggested_cashback_amount": 571.008,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144680,
        "transaction_amount": 39013,
        "cashback": 399.18,
        "suggested_transaction_amount": 43901.6,
        "suggested_cashback_amount": 439.032,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144681,
        "transaction_amount": 87606,
        "cashback": 880,
        "suggested_transaction_amount": 94894.8,
        "suggested_cashback_amount": 957.896,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144682,
        "transaction_amount": 50235,
        "cashback": 501.67,
        "suggested_transaction_amount": 55200.4,
        "suggested_cashback_amount": 564.008,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144683,
        "transaction_amount": 77324,
        "cashback": 780,
        "suggested_transaction_amount": 83294.8,
        "suggested_cashback_amount": 865.896,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144684,
        "transaction_amount": 50356,
        "cashback": 503.17,
        "suggested_transaction_amount": 55380.4,
        "suggested_cashback_amount": 567.608,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144685,
        "transaction_amount": 70345,
        "cashback": 717.77,
        "suggested_transaction_amount": 77132.4,
        "suggested_cashback_amount": 782.648,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144686,
        "transaction_amount": 21567,
        "cashback": 210.99,
        "suggested_transaction_amount": 23318.8,
        "suggested_cashback_amount": 226.376,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144687,
        "transaction_amount": 68567,
        "cashback": 680,
        "suggested_transaction_amount": 7400,
        "suggested_cashback_amount": 742,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144688,
        "transaction_amount": 68567,
        "cashback": 680,
        "suggested_transaction_amount": 7444.4,
        "suggested_cashback_amount": 742.888,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144689,
        "transaction_amount": 27321,
        "cashback": 278.11,
        "suggested_transaction_amount": 29373.2,
        "suggested_cashback_amount": 307.464,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144690,
        "transaction_amount": 38123,
        "cashback": 383.99,
        "suggested_transaction_amount": 41078.8,
        "suggested_cashback_amount": 411.576,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144691,
        "transaction_amount": 38567,
        "cashback": 380,
        "suggested_transaction_amount": 41014.4,
        "suggested_cashback_amount": 404.288,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144692,
        "transaction_amount": 58256,
        "cashback": 580,
        "suggested_transaction_amount": 63313.2,
        "suggested_cashback_amount": 636.264,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144673,
        "transaction_amount": 52890,
        "cashback": 519.4974185,
        "suggested_transaction_amount": 57476,
        "suggested_cashback_amount": 569.52,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144676,
        "transaction_amount": 46123,
        "cashback": 460.5025815,
        "suggested_transaction_amount": 45524.4,
        "suggested_cashback_amount": 512.488,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144677,
        "transaction_amount": 78451,
        "cashback": 780,
        "suggested_transaction_amount": 85862,
        "suggested_cashback_amount": 817.24,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144683,
        "transaction_amount": 48091,
        "cashback": 480,
        "suggested_transaction_amount": 53294.8,
        "suggested_cashback_amount": 365.896,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144688,
        "transaction_amount": 35789,
        "cashback": 356,
        "suggested_transaction_amount": 38144.4,
        "suggested_cashback_amount": 402.888,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144681,
        "transaction_amount": 90245,
        "cashback": 980,
        "suggested_transaction_amount": 100894.8,
        "suggested_cashback_amount": 1000,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144685,
        "transaction_amount": 90345,
        "cashback": 917.77,
        "suggested_transaction_amount": 101132.4,
        "suggested_cashback_amount": 992.648,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144678,
        "transaction_amount": 82712,
        "cashback": 827.92,
        "suggested_transaction_amount": 90350.4,
        "suggested_cashback_amount": 907.008,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144684,
        "transaction_amount": 50981,
        "cashback": 503.17,
        "suggested_transaction_amount": 65380.4,
        "suggested_cashback_amount": 557.608,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144682,
        "transaction_amount": 51678,
        "cashback": 501.67,
        "suggested_transaction_amount": 65380.4,
        "suggested_cashback_amount": 557.608,
        "maximum_cashback_limit": 1000
    }
  ]
}
const third = {
  common_offer:"The campaign has a total budget of 20,000, which will be equally allocated to all participants. Cashback percentages range from 0.5% to 1.5% of the transaction amount. If the transaction amount increases by 20% to 25%, the proposed cashback may rise by 8% to 12% from the initial cashback. Eligibility for this offer is limited to customers with CIBIL scores between 750 and 800, using Rupay or Visa cards.",
  user_data:[
    {
        "card_id": 1144673,
        "transaction_amount": 50678,
        "cashback": 519.4974185,
        "suggested_transaction_amount": 55747,
        "suggested_cashback_amount": 569.52,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144674,
        "transaction_amount": 32763,
        "cashback": 386.02,
        "suggested_transaction_amount": 35322.4,
        "suggested_cashback_amount": 416.448,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144675,
        "transaction_amount": 50981,
        "cashback": 500.89,
        "suggested_transaction_amount": 55106.8,
        "suggested_cashback_amount": 602.136,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144676,
        "transaction_amount": 44657,
        "cashback": 460.5025815,
        "suggested_transaction_amount": 49524.4,
        "suggested_cashback_amount": 512.488,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144677,
        "transaction_amount": 58234,
        "cashback": 580,
        "suggested_transaction_amount": 64862,
        "suggested_cashback_amount": 637.24,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144678,
        "transaction_amount": 81258,
        "cashback": 827.92,
        "suggested_transaction_amount": 90350.4,
        "suggested_cashback_amount": 937.008,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144679,
        "transaction_amount": 41654,
        "cashback": 437.92,
        "suggested_transaction_amount": 45550.4,
        "suggested_cashback_amount": 571.008,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144680,
        "transaction_amount": 39013,
        "cashback": 399.18,
        "suggested_transaction_amount": 43901.6,
        "suggested_cashback_amount": 439.032,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144681,
        "transaction_amount": 87606,
        "cashback": 880,
        "suggested_transaction_amount": 94894.8,
        "suggested_cashback_amount": 957.896,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144682,
        "transaction_amount": 50235,
        "cashback": 501.67,
        "suggested_transaction_amount": 55200.4,
        "suggested_cashback_amount": 564.008,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144683,
        "transaction_amount": 77324,
        "cashback": 780,
        "suggested_transaction_amount": 83294.8,
        "suggested_cashback_amount": 865.896,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144684,
        "transaction_amount": 50356,
        "cashback": 503.17,
        "suggested_transaction_amount": 55380.4,
        "suggested_cashback_amount": 567.608,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144685,
        "transaction_amount": 70345,
        "cashback": 717.77,
        "suggested_transaction_amount": 77132.4,
        "suggested_cashback_amount": 782.648,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144686,
        "transaction_amount": 21567,
        "cashback": 210.99,
        "suggested_transaction_amount": 23318.8,
        "suggested_cashback_amount": 226.376,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144687,
        "transaction_amount": 68567,
        "cashback": 680,
        "suggested_transaction_amount": 7400,
        "suggested_cashback_amount": 742,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144688,
        "transaction_amount": 68567,
        "cashback": 680,
        "suggested_transaction_amount": 7444.4,
        "suggested_cashback_amount": 742.888,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144689,
        "transaction_amount": 27321,
        "cashback": 278.11,
        "suggested_transaction_amount": 29373.2,
        "suggested_cashback_amount": 307.464,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144690,
        "transaction_amount": 38123,
        "cashback": 383.99,
        "suggested_transaction_amount": 41078.8,
        "suggested_cashback_amount": 411.576,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144691,
        "transaction_amount": 38567,
        "cashback": 380,
        "suggested_transaction_amount": 41014.4,
        "suggested_cashback_amount": 404.288,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144692,
        "transaction_amount": 58256,
        "cashback": 580,
        "suggested_transaction_amount": 63313.2,
        "suggested_cashback_amount": 636.264,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144673,
        "transaction_amount": 52890,
        "cashback": 519.4974185,
        "suggested_transaction_amount": 57476,
        "suggested_cashback_amount": 569.52,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144676,
        "transaction_amount": 46123,
        "cashback": 460.5025815,
        "suggested_transaction_amount": 45524.4,
        "suggested_cashback_amount": 512.488,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144677,
        "transaction_amount": 78451,
        "cashback": 780,
        "suggested_transaction_amount": 85862,
        "suggested_cashback_amount": 817.24,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144683,
        "transaction_amount": 48091,
        "cashback": 480,
        "suggested_transaction_amount": 53294.8,
        "suggested_cashback_amount": 365.896,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144688,
        "transaction_amount": 35789,
        "cashback": 356,
        "suggested_transaction_amount": 38144.4,
        "suggested_cashback_amount": 402.888,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144681,
        "transaction_amount": 90245,
        "cashback": 980,
        "suggested_transaction_amount": 100894.8,
        "suggested_cashback_amount": 1000,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144685,
        "transaction_amount": 90345,
        "cashback": 917.77,
        "suggested_transaction_amount": 101132.4,
        "suggested_cashback_amount": 992.648,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144678,
        "transaction_amount": 82712,
        "cashback": 827.92,
        "suggested_transaction_amount": 90350.4,
        "suggested_cashback_amount": 907.008,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144684,
        "transaction_amount": 50981,
        "cashback": 503.17,
        "suggested_transaction_amount": 65380.4,
        "suggested_cashback_amount": 557.608,
        "maximum_cashback_limit": 1000
    },
    {
        "card_id": 1144682,
        "transaction_amount": 51678,
        "cashback": 501.67,
        "suggested_transaction_amount": 65380.4,
        "suggested_cashback_amount": 557.608,
        "maximum_cashback_limit": 1000
    }
  ]
}
const App = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState(["", "", ""]);
  const [text, setText] = useState("");
  const [selectedTab, setSelectedTab] = useState('recommendation1');
  const [criteria, setCriteria] = useState("");
  const [budget, setBudget] = useState(30000); // New state variable for budget
  const [tabularData, setTabularData] = useState([]); // Initialize tabular data as an array with three empty arrays

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    if(tab === "recommendation1"){
      setBudget(30000)
      setText(first.common_offer);
      setTabularData(first.user_data);
    }
    if(tab === "recommendation2"){
      setBudget(25000)
      setText(second.common_offer);
      setTabularData(second.user_data);
    }
    if(tab === "recommendation3"){
      setBudget(20000)
      setText(third.common_offer);
      setTabularData(third.user_data);
    }
  };

  useEffect(() => {
    callLLMAPI();
  }, []);

  const callLLMAPI = async () => {
    try {
      // const response = await axios.get(`http://127.0.0.1:8000/generate_offer?budget=${budget}`);
      setText(first.common_offer);
      setTabularData(first.user_data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
          <div className="Budget-input">
            <label htmlFor="budget">Campaign Budget:</label>
            <input
              type="text"
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            {!budget && <p className="Mandatory-message">Campaign budget is mandatory</p>}
          </div>
          <div className="Recomm-tabs">
            <button 
              onClick={() => handleTabClick('recommendation1')} 
              className={selectedTab === 'recommendation1' ? 'selected' : ''} 
              disabled={!budget}
            >
              Cashback Recommendation 1
            </button>
            <button 
              onClick={() => handleTabClick('recommendation2')} 
              className={selectedTab === 'recommendation2' ? 'selected' : ''} 
              disabled={!budget}
            >
              Cashback Recommendation 2
            </button>
            <button 
              onClick={() => handleTabClick('recommendation3')} 
              className={selectedTab === 'recommendation3' ? 'selected' : ''} 
              disabled={!budget}
            >
              Cashback Recommendation 3
            </button>
          </div>
          {/* <p>If you don't find relevant recommendation, please write your prompt below:</p> */}
          {/* <textarea 
            name="postContent" 
            className='Recomm-input' 
            value={criteria} 
            onChange={(e) => setCriteria(e.target.value)} 
            rows={4} 
            cols={40} 
          />
          <button className="submit-button" onClick={handleResubmit}>Resubmit</button> */}
        </div>
        <div className="Recomm-right">
          <h6>{text}</h6>
          <h2>{capitalizeFirstLetter(selectedTab)}</h2>
          <div>
            <p className="bold">{responses[selectedTab === 'recommendation1' ? 0 : selectedTab === 'recommendation2' ? 1 : 2]}</p>
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
                    <td>{row.card_id}</td>
                    <td>{row.transaction_amount}</td>
                    <td>{row.cashback}</td>
                    <td>{row.suggested_transaction_amount}</td>
                    <td>{row.suggested_cashback_amount}</td>
                    <td>{row.maximum_cashback_limit}</td>
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
