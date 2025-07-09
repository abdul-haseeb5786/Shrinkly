import React, { useEffect, useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
  useEffect(() => {
    document.title = 'Shrinkly - Login';
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await loginUser(email, password);
      dispatch(login(data.user));
      navigate({ to: '/dashboard' });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in to Shrinkly</h2>

        {error && (
          <div className="mb-4 p-3 text-sm bg-red-500 text-white rounded-md">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md font-semibold transition-colors duration-200 ${
            loading
              ? 'bg-blue-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="mt-6 text-sm text-center text-gray-400">
          Don't have an account?{' '}
          <span
            onClick={() => state(false)}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
