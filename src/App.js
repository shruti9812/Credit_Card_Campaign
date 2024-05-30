import React, { useEffect,Suspense } from 'react';
import { useSelector } from 'react-redux'
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
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import Dashboard from './views/dashboard/Dashboard';
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

function App() {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
        <Route path="/*" name="Home" element={<DefaultLayout />} />
      
      </Routes>
    </Router>
     
    </div>
  );
}
 
export default App;
 