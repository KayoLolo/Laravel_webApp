import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Post } from '@/types/post';
import {  PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { use } from 'react';
import { List } from 'lucide-react';
import ListPost from '@/components/Post/ListPost';

interface Props extends PageProps {
    userPosts: Post[];
}




export default function Dashboard({ userPosts }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.75rem', color: '#4B5563' }}>
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div style={{ padding: '3rem 0' }}>
                <div style={{ margin: '0 auto', maxWidth: '7xl', padding: '0 1.5rem' }}>
                    <div style={{ overflow: 'hidden', backgroundColor: 'white', boxShadow: 'sm', borderRadius: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#4B5563' }}>
                                Mes publications
                            </h2>
                            <Link href={route('posts.create')} style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1rem', border: '1px solid transparent', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '500', color: 'white', backgroundColor: '#4f46e5' }}>
                                Créer un post
                            </Link>
                        </div>

                        {userPosts.length > 0 ? (
                            <ListPost posts={userPosts} showAuthor={true} canEdit={true} />
                        ) : (
                            <div className='text-center py-12'>
                                <p className='mb-4 text-gray-500'>Aucune publication trouvée.</p>
                                <Link href={route('posts.create')} className='text-indigo-600 hover:text-indigo-500'>
                                    Créer un post
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
