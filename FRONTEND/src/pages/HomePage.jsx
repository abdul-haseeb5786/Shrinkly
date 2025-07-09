import React from 'react'
import UrlForm from '../components/UrlForm'
import AuthModal from '../components/AuthModal';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const {showAuthModal} = useSelector((state) => state.auth);
  return (
    <div className="min-h-screen bg-[#0d1b2a] flex flex-col items-center justify-center p-4">
      {showAuthModal && <AuthModal/>}
      <div className="bg-[#1b263b] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#e0e1dd] text-center mb-6">Shrinkly URL Shortener</h1>
        <UrlForm />
      </div>
    </div>
  )
}

export default HomePage
