import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginStudent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); // Added password state
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/tutors/login', { // Changed to POST body
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }), // Include password in the request body
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            console.log('Logged in successfully');
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
            <div className="login-student-container">
                <h1 className="login-student-header">Login as Student</h1>
                {error && <p className="login-student-error">{error}</p>}
                <form onSubmit={handleLogin} className="login-student-form">
                    <div className="login-student-form-group">
                        <label className="login-student-label">Username:</label>
                        <input
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="login-student-input"
                        />
                    </div>
                    <div className="login-student-form-group">
                        <label className="login-student-label">Password:</label>
                        <input
                            type="password"
                            value={password} // Updated to use the defined password state
                            onChange={(e) => setPassword(e.target.value)} // Use setPassword
                            required
                            className="login-student-input"
                        />
                    </div>
                    <button type="submit" className="login-student-submit">Login</button>
                </form>
                <p className="login-student-register-link">
                    Don't have an account? <Link to="/registerStudent">Register here.</Link>
                </p>
            </div>
    );
};

export default LoginStudent;
