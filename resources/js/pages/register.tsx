import React, { useState } from 'react';
import { useApiUrl } from '../utils/api';
import '../../css/auth.css';

export const Register = () => {
    const API_URL = useApiUrl();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Client-side validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            setLoading(false);
            return;
        }

        if (!formData.agreeToTerms) {
            setError('Please agree to the Terms of Service and Privacy Policy');
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.confirmPassword
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Success - redirect to login or dashboard
            if (data.token) {
                localStorage.setItem('auth_token', data.token);
                window.location.href = '/dashboard';
            } else {
                // Redirect to login if no auto-login
                window.location.href = '/login';
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during registration');
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
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Start monitoring your projects today</p>
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
                        <label htmlFor="name" className="auth-label">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="auth-input"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="email" className="auth-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="auth-input"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="password" className="auth-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="auth-input"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-form-group">
                        <label htmlFor="confirmPassword" className="auth-label">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="auth-input"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength={8}
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-checkbox-group">
                        <input
                            type="checkbox"
                            id="terms"
                            name="agreeToTerms"
                            className="auth-checkbox"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                        <label htmlFor="terms" className="auth-checkbox-label">
                            I agree to the <a href="/terms" style={{ color: '#FF6B00' }}>Terms</a> and <a href="/privacy" style={{ color: '#FF6B00' }}>Privacy Policy</a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="auth-submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                {/* Divider */}
                <div className="auth-divider">
                    <div className="auth-divider-line" />
                    <span className="auth-divider-text">OR</span>
                    <div className="auth-divider-line" />
                </div>

                {/* Social Register */}
                <div className="auth-social-buttons">
                    <button className="auth-social-button">
                        <img src="https://icons.getbootstrap.com/assets/icons/github.svg" alt="GitHub" />
                        GitHub
                    </button>
                </div>

                {/* Footer */}
                <div className="auth-footer">
                    <p className="auth-footer-text">
                        Already have an account? <a href="/login" className="auth-footer-link">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
