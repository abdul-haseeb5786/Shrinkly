import React from 'react';
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import AuthPage from './pages/AuthPage';
import { Outlet } from '@tanstack/react-router';
import Navbar from './components/NavBav';
import { useSelector } from 'react-redux';

const App = () => {

  const {isAuthenticated} = useSelector((state) => state.auth);
 
  return (
    <div>
      <Navbar /> 
      <Outlet/>
    </div>
  );
}

export default App;
