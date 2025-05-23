import { Post, Props } from '@/types/post'
import { Link, router, usePage } from '@inertiajs/react'
import React, { use, useState } from 'react'
import {Card, CardHeader, CardContent, CardFooter} from '../ui/card'
import { Edit, Eye, Heart, Trash2 } from 'lucide-react';
import { Button } from '../ui/button'

export default function ListPost({ posts=[], showAuthor = true }: Props) {

    const {auth} = usePage().props as any;
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (postId: number) => {
        if(confirm('Etes-vous sur de vouloir supprimer cet article ?')) {
            setDeletingId(postId);
            router.delete(route('posts.destroy', postId), {
                onSuccess: () => {
                    setDeletingId(null);
                },
                onError: () => {
                    setDeletingId(null);
                    alert('Une erreur est survenue lors de la suppression');
                },
            });
        }
    };

    const handleLike = (postId: number) => {

        router.post(route('posts.like', postId), {}, {
            preserveScroll: true,
            preserveState: true,
        });
    }

    const canEditPost = (post : Post) => {
        return auth.user?.id === post.user_id;
    }

  return (
    <div style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {posts.map((post: Post) => (
            <Card key={post.id} style={{ overflow: 'hidden' }}>
                {post.image && (
                    <div style={{ aspectRatio: '16 / 9' }}>
                        <img src={`/storage/${post.image}`} alt={post.title} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    </div>
                )}
                <CardHeader>
                    <h3 className='text-xl font-semibold text-gray-800'>
                        {post.title}
                    </h3>
                </CardHeader>
                <CardContent>
                    <p className='text-gray-600 line-clamp-3 mb-4'>
                        {post.description}   
                    </p>
                    <div className='flex items-center justify-between text-sm text-gray-500'>
                        {showAuthor &&(
                            <span>Par {post.author.name}</span>
                        )}
                        <span>{new Date(post.created_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                </CardContent>
                <CardFooter className='flex justify-between'>
                    <div className='flex items-center justify-end space-x-2'>
                        <Button variant="ghost" size="icon" onClick={()=> handleLike(post.id)} className={`transition-colors ${post.is_liked ? 'text-red-600 hover:text-red-700' : 'text-gray-600 hover:text-gray-700'}`}>
                            <Heart  className='h-6 w-6 ' fill={post.is_liked ? 'currentColor' : 'none'}/>
                        </Button>
                        <span className='text-gray-600 '>
                            {post.likes_count}
                        </span>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <Button variant="link" asChild>
                            <Link href={route('posts.show', post.id)}>
                                <Eye/>
                            </Link>
                        </Button>
                        {canEditPost(post) &&(
                            <>
                                <Button variant="ghost" asChild>
                                    <Link href={route('posts.edit', post.id)}>
                                        <Edit/>
                                    </Link>
                                </Button>
                                <Button onClick={()=> handleDelete(post.id)} disabled={deletingId === post.id} variant="ghost" asChild className='text-red-600 hover:text-red-700' >
                                    <Trash2/>

                                </Button>
                            </>

                        )}

                    </div>

                </CardFooter>
            </Card>

        ))}

    </div>
  )
}
