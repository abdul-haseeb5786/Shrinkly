import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setShowAuthModal } from '../store/slice/authSlice';
import { logoutUser } from '../api/user.api';
import ConfirmModal from './ConfirmModal';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { name } = user?.user || {};
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate({ to: '/auth' });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleProtectedClick = (to) => {
    if (isAuthenticated) {
      navigate({ to });
    } else {
      dispatch(setShowAuthModal(true));
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md border-b border-gray-800">
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={onLogout}
        title="Are you sure you want to logout?"
        confirmText="Yes"
        cancelText="No"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div>
            <Link to="/" className="text-xl font-bold text-white hover:text-blue-400">
              Shrinkly
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 items-center">
            <button
              onClick={() => handleProtectedClick('/custom-url')}
              className="hover:text-blue-400 text-sm font-medium"
            >
              Custom URL
            </button>

            <button
              onClick={() => handleProtectedClick('/url-with-expiry')}
              className="hover:text-blue-400 text-sm font-medium"
            >
              URL With Expiry
            </button>

            <button
              onClick={() => handleProtectedClick('/dashboard')}
              className="hover:text-blue-400 text-sm font-medium"
            >
              Dashboard
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-300">Welcome, {name || 'User'}</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => dispatch(setShowAuthModal(true))}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
