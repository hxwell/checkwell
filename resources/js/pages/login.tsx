import React, { useState } from 'react';
import { useApiUrl } from '../utils/api';
import '../../css/auth.css';

export const Login = () => {
    const API_URL = useApiUrl();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/login`, {
                credentials: "include",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    remember: rememberMe
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Success - redirect to dashboard or handle token
            if (data.token) {
                localStorage.setItem('auth_token', data.token);
                window.location.href = '/dashboard';
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <a href="/" className="auth-back-link">
                ← Back to Home
            </a>

            <div className="auth-container">
                {/* Logo */}
                <div className="auth-logo">
                    <div className="auth-logo-icon">✓</div>
                    <div className="auth-logo-text">CheckWell</div>
                </div>

                {/* Header */}
                <div className="auth-header">
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to your account to continue</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        background: '#fee',
                        border: '1px solid #fcc',
                        color: '#c33',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-form-group">
                        <label htmlFor="email" className="auth-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="auth-input"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="password" className="auth-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="auth-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-checkbox-group">
                        <input
                            type="checkbox"
                            id="remember"
                            className="auth-checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            disabled={loading}
                        />
                        <label htmlFor="remember" className="auth-checkbox-label">
                            Remember me
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Divider */}
                <div className="auth-divider">
                    <div className="auth-divider-line" />
                    <span className="auth-divider-text">OR</span>
                    <div className="auth-divider-line" />
                </div>

                {/* Social Login */}
                <div className="auth-social-buttons">
                    <button className="auth-social-button">
                        <img src="https://icons.getbootstrap.com/assets/icons/github.svg" alt="GitHub" />
                        GitHub
                    </button>
                </div>

                {/* Footer */}
                <div className="auth-footer">
                    <p className="auth-footer-text">
                        Don't have an account? <a href="/register" className="auth-footer-link">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
