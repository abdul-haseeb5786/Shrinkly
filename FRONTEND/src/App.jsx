import React from 'react';
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import AuthPage from './pages/AuthPage';
import { Outlet } from '@tanstack/react-router';
import Navbar from './components/NavBav';
import { useDispatch, useSelector } from 'react-redux';
import AuthModal from './components/AuthModal';

const App = () => {

 
  return (
    <div>
     
      <Navbar /> 
      <Outlet/>
    </div>
  );
}

export default App;
