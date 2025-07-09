// src/components/AuthModal.jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setShowAuthModal } from '../store/slice/authSlice'
import { useLocation } from '@tanstack/react-router'

const AuthModal = () => {
  const showAuthModal = useSelector((state) => state.auth.showAuthModal)
  const dispatch = useDispatch()
    const location = useLocation();

  if (!showAuthModal || location.pathname === "/auth") return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-96 max-w-full">
        <h2 className="text-lg font-bold mb-3">Login Required</h2>
        <p className="mb-5 text-gray-200">Please login to continue.</p>
        <div className="flex justify-end">
          <button
            onClick={() => {
              dispatch(setShowAuthModal(false))
              window.location.href = '/auth' // or use navigate()
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
