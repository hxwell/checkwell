import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useApiUrl } from '../../utils/api';

interface Project {
    id: string;
    name: string;
    status: 'healthy' | 'warning' | 'down' | 'paused';
    lastCheck: string;
    uptime: string;
    responseTime: string;
}

interface Member {
    id: string;
    name: string;
    email: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: string;
}

interface OrganizationData {
    id: string;
    name: string;
    slug: string;
    projects: Project[];
    members: Member[];
}


const tabs = ['Overview', 'Projects', 'Members', 'API Keys', 'Settings'] as const;
type Tab = typeof tabs[number];

const statusConfig = {
    healthy: { badge: 'dash-badge dash-badge-success', label: 'Healthy' },
    warning: { badge: 'dash-badge dash-badge-warning', label: 'Warning' },
    down: { badge: 'dash-badge dash-badge-danger', label: 'Down' },
    paused: { badge: 'dash-badge dash-badge-neutral', label: 'Paused' },
};

const roleStyles: Record<string, React.CSSProperties> = {
    owner: { background: '#fef3c7', color: '#92400e', padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 600 },
    admin: { background: '#e0e7ff', color: '#3730a3', padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 600 },
    member: { background: '#f1f5f9', color: '#475569', padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 600 },
};

interface OrganizationDetailsProps {
    organization: {
        id: string;
        name: string;
        slug: string;
    };
    appDomain?: string;
    auth?: any;
}

export const OrganizationDetails = ({ organization }: OrganizationDetailsProps) => {
    const [activeTab, setActiveTab] = useState<Tab>('Overview');
    const API_URL = useApiUrl();

    // Delete state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteSlugInput, setDeleteSlugInput] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState('');

    const org: OrganizationData = {
        ...organization,
        projects: [],
        members: [],
    };

    const handleDelete = async () => {
        if (deleteSlugInput !== org.slug) return;
        setDeleteError('');
        setDeleteLoading(true);
        try {
            const response = await fetch(`${API_URL}/organization/${org.slug}/delete`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: org.id, slug: deleteSlugInput }),
            });
            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message || 'Failed to delete organization');
            }
            // Redirect to organizations list
            window.location.href = '/';
        } catch (err: any) {
            setDeleteError(err.message || 'An error occurred during deletion');
            setDeleteLoading(false);
        }
    };

    const renderOverview = () => (
        <>
            {/* Stats */}
            <div className="dash-stats-grid">
                <div className="dash-stat-card">
                    <div className="dash-stat-label">Projects</div>
                    <div className="dash-stat-value">{org.projects.length}</div>
                </div>
                <div className="dash-stat-card">
                    <div className="dash-stat-label">Team Members</div>
                    <div className="dash-stat-value">{org.members.length}</div>
                </div>
                <div className="dash-stat-card">
                    <div className="dash-stat-label">Uptime</div>
                    <div className="dash-stat-value">
                        {org.projects.length > 0 ? '99.9%' : '—'}
                    </div>
                </div>
                <div className="dash-stat-card">
                    <div className="dash-stat-label">Status</div>
                    <div className="dash-stat-value" style={{ fontSize: '1rem', marginTop: '0.25rem' }}>
                        {org.projects.length > 0 ? (
                            <span className="dash-badge dash-badge-success">All Healthy</span>
                        ) : (
                            <span className="dash-badge dash-badge-neutral">No Projects</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Projects */}
            <div className="dash-card" style={{ marginBottom: '1.5rem' }}>
                <div className="dash-card-header">
                    <h3 className="dash-card-title">Projects</h3>
                    <button className="dash-btn dash-btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                        + Add Project
                    </button>
                </div>
                <div className="dash-card-body">
                    {org.projects.length === 0 ? (
                        <div className="dash-empty" style={{ padding: '2.5rem 1rem' }}>
                            <div className="dash-empty-icon">📦</div>
                            <h3 className="dash-empty-title">No Projects</h3>
                            <p className="dash-empty-text">
                                Add your first project to start monitoring its health status.
                            </p>
                            <button className="dash-btn dash-btn-primary">+ Create Project</button>
                        </div>
                    ) : (
                        <div className="dash-table-wrapper">
                            <table className="dash-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Uptime</th>
                                        <th>Response</th>
                                        <th>Last Check</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {org.projects.map((project) => {
                                        const st = statusConfig[project.status];
                                        return (
                                            <tr key={project.id}>
                                                <td style={{ fontWeight: 600 }}>{project.name}</td>
                                                <td><span className={st.badge}>{st.label}</span></td>
                                                <td>{project.uptime}</td>
                                                <td>{project.responseTime}</td>
                                                <td style={{ color: 'var(--dash-text-muted)' }}>{project.lastCheck}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Members */}
            <div className="dash-card">
                <div className="dash-card-header">
                    <h3 className="dash-card-title">Team Members</h3>
                    <button className="dash-btn dash-btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                        + Invite
                    </button>
                </div>
                <div className="dash-card-body">
                    {org.members.length === 0 ? (
                        <div className="dash-empty" style={{ padding: '2.5rem 1rem' }}>
                            <div className="dash-empty-icon">👥</div>
                            <h3 className="dash-empty-title">No Team Members</h3>
                            <p className="dash-empty-text">
                                Invite your team to collaborate and manage projects together.
                            </p>
                            <button className="dash-btn dash-btn-secondary">+ Invite Members</button>
                        </div>
                    ) : (
                        <div className="dash-table-wrapper">
                            <table className="dash-table">
                                <thead>
                                    <tr>
                                        <th>Member</th>
                                        <th>Role</th>
                                        <th>Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {org.members.map((member) => (
                                        <tr key={member.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <div style={{
                                                        width: 32, height: 32, borderRadius: 8,
                                                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        color: 'white', fontSize: '0.75rem', fontWeight: 600
                                                    }}>
                                                        {member.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{member.name}</div>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--dash-text-muted)' }}>{member.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span style={roleStyles[member.role]}>{member.role}</span></td>
                                            <td style={{ color: 'var(--dash-text-muted)' }}>{member.joinedAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    const renderSettings = () => (
        <div className="dash-card" style={{ border: '1px solid #fecaca', background: '#fff' }}>
            <div className="dash-card-header" style={{ borderBottom: '1px solid #fecaca', background: '#fef2f2' }}>
                <h3 className="dash-card-title" style={{ color: '#dc2626' }}>Danger Zone</h3>
            </div>
            <div className="dash-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>Delete Organization</h4>
                        <p style={{ margin: 0, color: 'var(--dash-text-muted)', fontSize: '0.875rem' }}>
                            Once you delete an organization, there is no going back. All projects and team members will be permanently removed.
                        </p>
                    </div>
                    <button
                        className="dash-btn"
                        style={{ background: '#dc2626', color: 'white', border: 'none' }}
                        onClick={() => {
                            setDeleteSlugInput('');
                            setDeleteError('');
                            setShowDeleteModal(true);
                        }}
                    >
                        Delete Organization
                    </button>
                </div>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Overview':
                return renderOverview();
            case 'Settings':
                return renderSettings();
            case 'Projects':
            case 'Members':
            case 'API Keys':
                return (
                    <div className="dash-card">
                        <div className="dash-empty">
                            <div className="dash-empty-icon">🚧</div>
                            <h3 className="dash-empty-title">{activeTab}</h3>
                            <p className="dash-empty-text">This section is coming soon.</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <DashboardLayout
            title={org.name}
            activePage="organizations"
            actions={
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="dash-btn dash-btn-secondary">⚙ Settings</button>
                    <button className="dash-btn dash-btn-primary">+ Add Project</button>
                </div>
            }
        >
            {/* Org Header */}
            <div className="dash-page-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                    className="dash-org-icon"
                    style={{
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        width: 56,
                        height: 56,
                        fontSize: '1.5rem',
                    }}
                >
                    {org.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div>
                    <h2 className="dash-page-title">{org.name}</h2>
                    <p className="dash-page-subtitle" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {org.slug}
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="dash-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`dash-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            {renderTabContent()}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="dash-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setShowDeleteModal(false); }}>
                    <div className="dash-modal">
                        <div className="dash-modal-header">
                            <h2 className="dash-modal-title" style={{ color: '#dc2626' }}>Delete Organization</h2>
                            <button className="dash-modal-close" onClick={() => setShowDeleteModal(false)} disabled={deleteLoading}>×</button>
                        </div>
                        <div className="dash-modal-body">
                            {deleteError && (
                                <div style={{
                                    background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
                                    padding: '0.65rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.85rem'
                                }}>
                                    {deleteError}
                                </div>
                            )}
                            <p style={{ margin: '0 0 1rem 0', color: 'var(--dash-text-muted)' }}>
                                This action <strong>cannot</strong> be undone. This will permanently delete the <strong>{org.name}</strong> organization, all its projects, and remove all member associations.
                            </p>
                            <p style={{ margin: '0 0 1rem 0', color: 'var(--dash-text-muted)' }}>
                                Please type <strong>{org.slug}</strong> to confirm.
                            </p>
                            <div className="dash-form-group">
                                <input
                                    type="text"
                                    className="dash-form-input"
                                    placeholder={org.slug}
                                    value={deleteSlugInput}
                                    onChange={e => setDeleteSlugInput(e.target.value)}
                                    disabled={deleteLoading}
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="dash-modal-footer">
                            <button
                                className="dash-btn dash-btn-secondary"
                                onClick={() => setShowDeleteModal(false)}
                                disabled={deleteLoading}
                            >
                                Cancel
                            </button>
                            <button
                                className="dash-btn"
                                style={{ background: '#dc2626', color: 'white', border: 'none', opacity: (deleteSlugInput !== org.slug || deleteLoading) ? 0.5 : 1 }}
                                onClick={handleDelete}
                                disabled={deleteSlugInput !== org.slug || deleteLoading}
                            >
                                {deleteLoading ? 'Deleting...' : 'I understand, delete this organization'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default OrganizationDetails;
