import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import '../../css/dashboard.css';

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: string;
    activePage?: string;
    actions?: React.ReactNode;
}

const navItems = [
    { id: 'organizations', icon: '🏢', label: 'Organizations', href: '/' },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    title,
    activePage = 'organizations',
    actions,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { auth } = usePage<{ auth: { user: { fullname: string; email: string } } }>().props;
    const user = auth?.user;
    const initials = user?.fullname
        ? user.fullname.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : 'U';

    return (
        <div className="dash-layout">
            {/* Sidebar Overlay (mobile) */}
            <div
                className={`dash-sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="dash-sidebar-header">
                    <a href="/" className="dash-sidebar-logo">
                        <div className="dash-sidebar-logo-icon">✓</div>
                        <span className="dash-sidebar-logo-text">CheckWell</span>
                    </a>
                </div>

                <nav className="dash-sidebar-nav">
                    <div className="dash-sidebar-section-label">Navigation</div>
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.href}
                            className={`dash-sidebar-link ${activePage === item.id ? 'active' : ''}`}
                        >
                            <span className="dash-sidebar-link-icon">{item.icon}</span>
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="dash-sidebar-footer" style={{ position: 'relative' }}>
                    {userMenuOpen && (
                        <div className="dash-user-menu">
                            <a href="/logout" className="dash-user-menu-item">
                                <span className="dash-user-menu-icon">🚪</span>
                                Logout
                            </a>
                        </div>
                    )}
                    <div
                        className="dash-sidebar-user"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                    >
                        <div className="dash-sidebar-avatar">{initials}</div>
                        <div className="dash-sidebar-user-info">
                            <div className="dash-sidebar-user-name">{user?.fullname || 'User'}</div>
                            <div className="dash-sidebar-user-email">{user?.email || ''}</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="dash-main">
                <header className="dash-topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button
                            className="dash-sidebar-toggle"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            ☰
                        </button>
                        <h1 className="dash-topbar-title">{title}</h1>
                    </div>
                    {actions && (
                        <div className="dash-topbar-actions">{actions}</div>
                    )}
                </header>

                <div className="dash-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
