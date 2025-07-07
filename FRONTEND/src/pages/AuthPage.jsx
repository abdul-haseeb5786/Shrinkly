import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

const AuthPage = () => {
    const [login, setLogin] = useState(true);
    const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

     useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" }); // ya jo bhi tumhara dashboard path ho
    }
  }, [isAuthenticated, navigate]);
    return (
        <div>

        
          {  login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
            
            
        </div>
    );
}

export default AuthPage;
