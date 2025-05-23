import { Link, usePage } from '@inertiajs/react';

type AuthProps = {
    user?: any;
};

export default function Nav() {
    const auth = (usePage().props as { auth?: AuthProps }).auth;
    return (
        <nav style={{
                backgroundColor: 'white',
                boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
                borderBottom: '1px solid #e5e7eb',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                color: '#1f2937',
            }}>
            <div style={{
                    maxWidth: '1120px',
                    margin: '0 auto',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', height: '4rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: '4rem',
                    }}>
                        <Link href='/' style={{ fontSize: '1.125rem',justifyContent: 'space-between', fontWeight: '700', color: '#1f2937' }}>
                            MyApp
                        </Link>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {auth && auth.user ? (
                            <Link href={route('Dashboard')} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', border: '1px solid transparent', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '500', color: 'white', backgroundColor: '#4f46e5' }}>
                                Tableau de bord
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    style={{ color: '#4b5563' }}
                                    onMouseOver={e => (e.currentTarget.style.color = '#1f2937')}
                                    onMouseOut={e => (e.currentTarget.style.color = '#4b5563')}
                                >
                                    Connexion
                                </Link>
                                <Link href={route('register')} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', border: '1px solid transparent', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '500', color: 'white', backgroundColor: '#4f46e5' }}>
                                    Inscription
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}