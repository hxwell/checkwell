import React from 'react';

export const LandingFooter = () => {
    return (
        <footer className="landing-footer">
            <div className="landing-footer-container">
                <div className="landing-footer-grid">
                    <div>
                        <div className="landing-footer-brand">
                            <div className="landing-footer-brand-icon">✓</div>
                            CheckWell
                        </div>
                        <p className="landing-footer-description">
                            Keep your projects healthy and your team informed with real-time monitoring.
                        </p>
                    </div>

                    <div>
                        <h4 className="landing-footer-section-title">Resources</h4>
                        <div className="landing-footer-links">
                            <a href="#" className="landing-footer-link">Documentation</a>
                            <a href="#" className="landing-footer-link">Blog</a>
                            <a href="#" className="landing-footer-link">Support</a>
                            <a href="#" className="landing-footer-link">Changelog</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="landing-footer-section-title">Company</h4>
                        <div className="landing-footer-links">
                            <a href="#" className="landing-footer-link">About</a>
                            <a href="#" className="landing-footer-link">Privacy Policy</a>
                            <a href="#" className="landing-footer-link">Terms of Service</a>
                            <a href="#" className="landing-footer-link">Contact</a>
                        </div>
                    </div>
                </div>

                <div className="landing-footer-bottom">
                    <div className="landing-footer-copyright">
                        © 2025 CheckWell. All rights reserved.
                    </div>
                    <div className="landing-footer-social">
                        <a href="https://github.com/hxwell/checkwell" target="_blank" className="landing-footer-social-link">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
