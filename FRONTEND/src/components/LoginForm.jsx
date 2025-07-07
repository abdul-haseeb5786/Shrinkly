
import React, { useEffect, useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router'

const LoginForm = ({ state }) => {
    useEffect(() => {
        document.title = 'Shrinkly - Login';
    }, []);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await loginUser(email, password);
            dispatch(login(data.user))
            navigate({to:"/dashboard"})
            setLoading(false);
            
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    }



    return (
        <div>
            <div >
                <h2>Login</h2>
                {error && (
                    <div>
                        {error}
                    </div>
                )}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div>

                    <button
                        type='submit'
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </div>

                <div>
                    <p className="cursor-pointer text-sm text-gray-600">
                        Don't have an account? <span onClick={() => state(false)} className="text-blue-500 hover:text-blue-700">Register</span>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default LoginForm;
