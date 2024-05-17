import React, { useState } from 'react';
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
    // case 'appDashboard':
    //   pageContent = <appDashboard navigateTo={navigateTo} />;
    //   break;
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
      {pageContent}
      
    </div>
  );
}

export default App;
