import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import AuthModal from '../components/AuthModal';

const AuthPage = () => {
    const [login, setLogin] = useState(true);
    const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
   
  const {showAuthModal} = useSelector((state) => state.auth);

     useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" }); 
    }
  }, [isAuthenticated, navigate]);
    return (
        <div>
{showAuthModal && <AuthModal />}
        
          {  login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
            
            
        </div>
    );
}

export default AuthPage;
