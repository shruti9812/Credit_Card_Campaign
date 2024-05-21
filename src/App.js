import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Create_Campaign from './Create_Campaign';
import LandingPage from './LandingPage';
import UserDetails from './UserDetails';
// import appDashboard from './appDashboard';
import ThankYouPage from './ThankYouPage';
import CardList from './CardList';
import Recommendation1 from './Recommendation1';
 
function App() {
  const [route, setRoute] = useState('Landing');
 
  const navigateTo = (newRoute) => {
    setRoute(newRoute);
  };
 
  let pageContent;
  switch (route) {
    case 'Landing':
      pageContent = <LandingPage navigateTo={navigateTo} />;
      break;
    case 'home':
      pageContent = <HomePage navigateTo={navigateTo} />;
      break;
    case 'login':
      pageContent = <LoginPage navigateTo={navigateTo} />;
      break;
    case 'register':
      pageContent = <RegisterPage navigateTo={navigateTo} />;
      break;
    case 'UserDetails':
      pageContent = <UserDetails navigateTo={navigateTo} />;
      break;
    case 'Create_Campaign':
      pageContent = <Create_Campaign navigateTo={navigateTo} />;
      break;
    case 'recommendation':
      pageContent = <Recommendation1 navigateTo={navigateTo} />;
      break;
    case 'ThankYouPage':
      pageContent = <ThankYouPage navigateTo={navigateTo} />;
      break;
    case 'CardList':
      pageContent = <CardList navigateTo={navigateTo} />;
      break;
    default:
      pageContent = <LandingPage navigateTo={navigateTo} />;
  }
 
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/UserDetails" element={<UserDetails />} />
        <Route path="/Create_Campaign" element={<Create_Campaign />} />
        <Route path="/ThankYouPage" element={<ThankYouPage />} />
        <Route path="/CardList" element={<CardList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recommendation" element={<Recommendation1 />} />
        
      </Routes>
    </Router>
     
    </div>
  );
}
 
export default App;
 