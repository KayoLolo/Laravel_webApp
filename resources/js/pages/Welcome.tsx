
import { Head, Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import Nav from '@/components/Nav'; 
import { Post } from '@/types/post';
import ListPost from '@/components/Post/ListPost';

export default function Welcome({ auth, posts, canRegister }: PageProps<{ posts: Post[]; canRegister: boolean }>) {
  return (
    <>
    <Head title='Welcome' />
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <Nav />
      <div style={{ backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '2rem 1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#1f2937' }}>
              <span style={{ display: 'block' }}>
                Bienvenue sur 
              </span>
              <span style={{ display: 'block', color: '#4f46e5' }}>
                MyApp
              </span>
            <p style={{ marginTop: '0.75rem', maxWidth: '28rem', marginLeft: 'auto', marginRight: 'auto', color: '#6b7280' }}>
              Votre solution tout-en-un pour tous vos besoins.
            </p>
            {!auth.user && canRegister && (
              <div style={{ marginTop: '1.25rem', maxWidth: '28rem', marginLeft: 'auto', marginRight: 'auto', display: 'flex', justifyContent: 'center' }}>
                <div style={{ borderRadius: '0.375rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                  <Link href={route('register')} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', border: '1px solid transparent', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '500', color: 'white', backgroundColor: '#4f46e5' }}>
                    Commencer
                  </Link>

                </div>
              </div>
            )}
            </h1>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#1f2937' }}>
            Articles récents
          </h2>
          <p className='mt-3 max-w-2xl mx-auto text-xl'>
            Les derniers articles publiés par nos utilisateurs.
          </p>
        </div>
        <ListPost posts={posts} />
      </div>
    </div>
    </>
  )
}