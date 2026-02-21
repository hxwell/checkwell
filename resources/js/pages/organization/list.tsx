import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useApiUrl } from '../../utils/api';

const ORG_COLORS = [
    'linear-gradient(135deg, #6366f1, #8b5cf6)',
    'linear-gradient(135deg, #3b82f6, #06b6d4)',
    'linear-gradient(135deg, #f59e0b, #ef4444)',
    'linear-gradient(135deg, #10b981, #059669)',
    'linear-gradient(135deg, #ec4899, #f43f5e)',
    'linear-gradient(135deg, #8b5cf6, #d946ef)',
];

interface Organization {
    id: string;
    name: string;
    slug: string;
}

const getOrgInitials = (name: string) => {
    return name
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

const slugify = (text: string) => {
    return text
        .normalize('NFD')                   // Aksanlı karakterleri (ö, ü vb.) baz harf ve accent olarak 2'ye böler
        .replace(/[\u0300-\u036f]/g, '')    // Yukarıdaki accent (işaret) kısımlarını temizler (ö -> o olur)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')       // Harf, rakam, boşluk ve tire dışındakileri siler
        .replace(/[\s_-]+/g, '-')           // Boşlukları ve _ işaretlerini tireye (-) çevirir
        .replace(/^-+|-+$/g, '');           // Baştaki ve sondaki gereksiz tireleri temizler
};

// ===== Create Organization Modal =====
interface CreateOrgModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreated: (org: Organization) => void;
}

const CreateOrgModal: React.FC<CreateOrgModalProps> = ({ isOpen, onClose, onCreated }) => {
    const API_URL = useApiUrl();
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleNameChange = (value: string) => {
        setName(value);
        if (!slugManuallyEdited) {
            setSlug(slugify(value));
        }
    };

    const handleSlugChange = (value: string) => {
        setSlugManuallyEdited(true);
        setSlug(slugify(value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Organization name is required');
            return;
        }
        if (!slug.trim()) {
            setError('Organization slug is required');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/organization/create`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), slug: slug.trim() }),
            });

            const data = await response.json();

            // API'den success false gelirse, HTTP status code 200 olsa bile hata fırlatalım
            if (!data.success) {
                throw new Error(data.message || 'Failed to create organization');
            }

            // Başarılı ise oluşturulan organizasyonu listeye ekleyelim
            onCreated(data.organization);
            // Reset form
            setName('');
            setSlug('');
            setSlugManuallyEdited(false);
            onClose();
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="dash-modal-backdrop" onClick={handleBackdropClick}>
            <div className="dash-modal">
                <div className="dash-modal-header">
                    <h2 className="dash-modal-title">Create Organization</h2>
                    <button className="dash-modal-close" onClick={onClose} disabled={loading}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="dash-modal-body">
                        {error && (
                            <div style={{
                                background: '#fef2f2',
                                border: '1px solid #fecaca',
                                color: '#dc2626',
                                padding: '0.65rem 1rem',
                                borderRadius: '8px',
                                marginBottom: '1.25rem',
                                fontSize: '0.85rem',
                            }}>
                                {error}
                            </div>
                        )}

                        <div className="dash-form-group">
                            <label className="dash-form-label" htmlFor="org-name">Organization Name</label>
                            <input
                                id="org-name"
                                type="text"
                                className="dash-form-input"
                                placeholder="My Company"
                                value={name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                disabled={loading}
                                autoFocus
                            />
                        </div>

                        <div className="dash-form-group">
                            <label className="dash-form-label" htmlFor="org-slug">Slug</label>
                            <input
                                id="org-slug"
                                type="text"
                                className="dash-form-input"
                                placeholder="my-company"
                                value={slug}
                                onChange={(e) => handleSlugChange(e.target.value)}
                                disabled={loading}
                            />
                            <div className="dash-form-hint">
                                URL: /organization/<strong>{slug || '...'}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="dash-modal-footer">
                        <button
                            type="button"
                            className="dash-btn dash-btn-secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="dash-btn dash-btn-primary"
                            disabled={loading || !name.trim() || !slug.trim()}
                        >
                            {loading ? 'Creating...' : 'Create Organization'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ===== Organization List Page =====
interface OrganizationListProps {
    organizations: Organization[];
    appDomain?: string;
    auth?: any;
}

export const OrganizationList = ({ organizations: initialOrganizations = [] }: OrganizationListProps) => {
    const API_URL = useApiUrl();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);

    const handleOrgCreated = (org: Organization) => {
        setOrganizations(prev => [...prev, org]);
    };

    return (
        <DashboardLayout title="Organizations" activePage="organizations" actions={
            <button className="dash-btn dash-btn-primary" onClick={() => setShowCreateModal(true)}>
                + New Organization
            </button>
        }>
            {/* Create Modal */}
            <CreateOrgModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreated={handleOrgCreated}
            />

            {/* Stats */}
            <div className="dash-stats-grid">
                <div className="dash-stat-card">
                    <div className="dash-stat-label">Total Organizations</div>
                    <div className="dash-stat-value">{organizations.length}</div>
                </div>
            </div>

            {/* Page Header */}
            <div className="dash-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h2 className="dash-page-title">Your Organizations</h2>
                    <p className="dash-page-subtitle">Manage your teams and projects</p>
                </div>
            </div>

            {/* Org Grid */}
            {organizations.length === 0 ? (
                <div className="dash-card">
                    <div className="dash-empty">
                        <div className="dash-empty-icon">🏢</div>
                        <h3 className="dash-empty-title">No Organizations Yet</h3>
                        <p className="dash-empty-text">
                            Create your first organization to start monitoring your projects.
                            Organizations help you group projects and manage team access.
                        </p>
                        <button
                            className="dash-btn dash-btn-primary"
                            onClick={() => setShowCreateModal(true)}
                        >
                            + Create Organization
                        </button>
                    </div>
                </div>
            ) : (
                <div className="dash-org-grid">
                    {organizations.map((org, i) => (
                        <a key={org.id} href={`/organization/${org.slug}`} className="dash-org-card">
                            <div className="dash-org-card-top">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div
                                        className="dash-org-icon"
                                        style={{ background: ORG_COLORS[i % ORG_COLORS.length] }}
                                    >
                                        {getOrgInitials(org.name)}
                                    </div>
                                    <div>
                                        <div className="dash-org-name">{org.name}</div>
                                        <div className="dash-org-slug">{org.slug}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}

                    {/* Create new org card */}
                    <div className="dash-create-card" onClick={() => setShowCreateModal(true)}>
                        <div className="dash-create-card-icon">+</div>
                        <div className="dash-create-card-text">New Organization</div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default OrganizationList;
