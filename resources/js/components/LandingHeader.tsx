import React from 'react';

export const LandingHeader = () => {
    return (
        <nav className="landing-nav">
            <div className="landing-nav-container">
                <div className="landing-logo">
                    <div className="landing-logo-icon">✓</div>
                    CheckWell
                </div>
                <div className="landing-nav-links">
                    <a href="/login" className="landing-nav-link">Sign In</a>
                    <a href="/register" className="landing-nav-cta">
                        Get Started →
                    </a>
                </div>
            </div>
        </nav>
    );
};
