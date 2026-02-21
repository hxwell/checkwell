import React from 'react';
import '../../css/landing.css';
import { LandingHeader } from '../components/LandingHeader';
import { LandingFooter } from '../components/LandingFooter';

export const Landing = () => {
    return (
        <div className="landing-page">
            <LandingHeader />

            {/* Hero Section */}
            <section className="landing-hero">
                <div className="landing-hero-bg-circle-1" />
                <div className=" landing-hero-bg-circle-2" />

                <div className="landing-hero-content">
                    <div className="landing-hero-badge">
                        🚀 Real-time monitoring • Start in minutes
                    </div>

                    <h1 className="landing-hero-title">
                        Keep Your Projects<br />
                        <span className="landing-hero-title-highlight">Healthy & Running</span>
                    </h1>

                    <p className="landing-hero-subtitle">
                        Monitor health every minute. Get instant alerts via Telegram, Email, or Discord.
                        Share beautiful status pages with your team.
                    </p>

                    <div className="landing-hero-cta-group">
                        <a href="/register" className="landing-hero-cta-primary">
                            Start Monitoring Free
                        </a>
                    </div>

                    <div className="landing-hero-stats">
                        {[
                            { value: '60s', label: 'Check Interval' },
                            { value: 'Free', label: 'To Start' },
                            { value: '<5min', label: 'Setup Time' }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="landing-hero-stat-value">{stat.value}</div>
                                <div className="landing-hero-stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="landing-features">
                <div className="landing-features-container">
                    <div className="landing-section-header">
                        <h2 className="landing-section-title">
                            Everything You Need to Stay Operational
                        </h2>
                        <p className="landing-section-subtitle">
                            Built for developers, designed for teams. Monitor, alert, and respond in real-time.
                        </p>
                    </div>

                    <div className="landing-features-grid">
                        {[
                            {
                                icon: '⚡',
                                iconBg: '#FFF3E0',
                                title: 'Minute-by-Minute Checks',
                                description: 'Health checks run every 60 seconds. Catch issues before your users report them.',
                                highlight: 'Real-time monitoring'
                            },
                            {
                                icon: '🔑',
                                iconBg: '#E3F2FD',
                                title: 'Simple API Integration',
                                description: 'Generate API keys, ping our endpoint from your app. No complex configuration.',
                                highlight: 'Developer-friendly'
                            },
                            {
                                icon: '📊',
                                iconBg: '#F3E5F5',
                                title: 'Public Status Pages',
                                description: 'Beautiful, customizable status pages. Keep your customers informed automatically.',
                                highlight: 'Share with confidence'
                            },
                            {
                                icon: '🔔',
                                iconBg: '#E8F5E9',
                                title: 'Multi-Channel Alerts',
                                description: 'Telegram, Email, Discord notifications when incidents occur. Never miss a beat.',
                                highlight: 'Instant notifications'
                            },
                            {
                                icon: '🏢',
                                iconBg: '#FFF9C4',
                                title: 'Organization Teams',
                                description: 'Create orgs, invite team members, manage multiple projects at enterprise scale.',
                                highlight: 'Team collaboration'
                            },
                            {
                                icon: '📈',
                                iconBg: '#FCE4EC',
                                title: 'Performance Insights',
                                description: 'Track uptime trends, response times, incident history. Data-driven decisions.',
                                highlight: 'Coming soon',
                                wip: true
                            }
                        ].map((feature, i) => (
                            <div key={i} className="landing-feature-card">
                                {feature.wip && (
                                    <div className="landing-feature-wip-badge">
                                        Work in Progress
                                    </div>
                                )}
                                <div className="landing-feature-icon" style={{ background: feature.iconBg }}>
                                    {feature.icon}
                                </div>
                                <div className="landing-feature-highlight">
                                    {feature.highlight}
                                </div>
                                <h3 className="landing-feature-title">
                                    {feature.title}
                                </h3>
                                <p className="landing-feature-description">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="landing-how-it-works">
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="landing-section-header">
                        <h2 className="landing-section-title">
                            Get Up & Running in Minutes
                        </h2>
                        <p className="landing-section-subtitle">
                            Three simple steps to complete monitoring
                        </p>
                    </div>

                    <div className="landing-steps-grid">
                        {[
                            {
                                number: '01',
                                title: 'Create Your Project',
                                description: 'Sign up, create an organization, and add your first project in under 2 minutes.',
                                code: '// Create project\nPOST /api/projects'
                            },
                            {
                                number: '02',
                                title: 'Get Your API Key',
                                description: 'Generate an API key and integrate our health check endpoint into your application.',
                                code: 'const key = \n  "ck_live_abc123"'
                            },
                            {
                                number: '03',
                                title: 'Configure Alerts',
                                description: 'Set up Telegram, Email, or Discord notifications. Monitor your project dashboard.',
                                code: '// You\'re live! ✓\nStatus: Monitoring'
                            }
                        ].map((step, i) => (
                            <div key={i} className="landing-step-card">
                                <div className="landing-step-number">{step.number}</div>
                                <h3 className="landing-step-title">{step.title}</h3>
                                <p className="landing-step-description">{step.description}</p>
                                <div className="landing-step-code">{step.code}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integration Channels */}
            <section className="landing-integrations">
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <div className="landing-section-header">
                        <h2 className="landing-section-title">
                            Alerts Where You Already Work
                        </h2>
                        <p className="landing-section-subtitle">
                            Get instant notifications through your preferred communication channel
                        </p>
                    </div>

                    <div className="landing-integrations-grid">
                        {[
                            {
                                name: 'Telegram',
                                iconUrl: 'https://icons.getbootstrap.com/assets/icons/telegram.svg',
                                gradient: 'linear-gradient(135deg, #0088cc 0%, #00aaff 100%)'
                            },
                            {
                                name: 'Email',
                                iconUrl: 'https://icons.getbootstrap.com/assets/icons/envelope-fill.svg',
                                gradient: 'linear-gradient(135deg, #ea4335 0%, #ff6b6b 100%)'
                            },
                            {
                                name: 'Discord',
                                iconUrl: 'https://icons.getbootstrap.com/assets/icons/discord.svg',
                                gradient: 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)'
                            }
                        ].map((integration, i) => (
                            <div key={i} className="landing-integration-card">
                                <div className="landing-integration-icon" style={{ background: integration.gradient }}>
                                    <img src={integration.iconUrl} alt={integration.name} />
                                </div>
                                <div className="landing-integration-name">{integration.name}</div>
                                <div className="landing-integration-status">✓ Connected</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="landing-final-cta">
                <div className="landing-final-cta-bg" />

                <div className="landing-final-cta-content">
                    <h2 className="landing-final-cta-title">
                        Start Monitoring Your Projects Today
                    </h2>
                    <p className="landing-final-cta-text">
                        Join thousands of developers who trust CheckWell to keep their projects running smoothly.
                        Get started today.
                    </p>
                    <a href="/register" className="landing-final-cta-button">
                        Get Started Free
                    </a>
                    <div className="landing-final-cta-features">
                        <div>✓ Quick setup</div>
                        <div>✓ Easy integration</div>
                        <div>✓ Cancel anytime</div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
};

export default Landing;
