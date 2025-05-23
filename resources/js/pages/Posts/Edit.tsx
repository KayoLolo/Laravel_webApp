import React, { FormEvent, useState } from "react"
import { Head, useForm} from "@inertiajs/react"
import { EditProps, PostFormData } from "@/types/post"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@headlessui/react";


export default function Edit({auth, post}: EditProps) {

const { data, setData, put, processing, errors, reset } = useForm<PostFormData>({
  title: post.title,
  description: post.description,
  image: null as File | null,
});

const [previewUrl, setPreviewUrl] = useState<string | null>(post.image ? `storage/${post.image}` : null);

const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0] || null;
  if (file) {
    setData('iamage', file);
    const reader = new FileReader();
    reader.onload=(e) => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
}

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  put(route('posts.update', post.id), {
    onSuccess: () => {
    },
  });
}


return (
    <AuthenticatedLayout header={<h2 style={{ fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.75rem', color: '#4B5563' }}>Créer un post</h2>}>
      <Head title="Créer un post" />
      <div style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '2rem' }}>
          <div style={{ backgroundColor: 'white', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', borderRadius: '0.5rem' }}>
            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Créer un post</h2>
              <form onSubmit={handleSubmit} style={{ color: '#4B5563' }}>
                <div>
                  <Label htmlFor="title" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>
                    Titre
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    style={{
                      marginTop: '0.25rem',
                      width: '100%',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.375rem',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      padding: '0.5rem 0.75rem',
                      fontSize: '1rem',
                      lineHeight: '1.5',
                      outline: 'none'
                    }}
                  />
                  {errors.title && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.title}</p>}
                </div>
                <div>
                  <Label htmlFor="description" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    style={{
                      marginTop: '0.25rem',
                      width: '100%',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0.375rem',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      padding: '0.5rem 0.75rem',
                      fontSize: '1rem',
                      lineHeight: '1.5',
                      outline: 'none'
                    }}
                  />
                {errors.description && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.description}</p>}
                </div>
                <div>
                  <Label htmlFor="image" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>
                    Image
                  </Label>
                  <Input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{
                      display: 'block',
                      paddingTop: '0.5rem',
                      paddingBottom: '0.5rem',
                      marginRight: '1rem',
                      borderRadius: '0.375rem',
                      border: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      backgroundColor: '#EEF2FF',
                      color: '#4338CA',
                      cursor: 'pointer'
                    }}
                  />
                  {errors.image && <p style={{ color: '#EF4444', fontSize: '0.875rem' }}>{errors.image}</p>}
                  {previewUrl && (
                    <img src={previewUrl} alt="preview" style={{ marginTop: '0.5rem', maxWidth: '100%', height: 'auto' }} />
                  )}

                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                  <Button type="button" onClick={()=>window.history.back()} >
                    Annuler
                  </Button>
                  <Button type="submit" disabled={processing} style={{ backgroundColor: '#4F46E5', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: 500 }}>
                    {processing ? 'Modification...' : 'Modifier le post'}  
                  </Button>
                </div>
              </form>
            </div>

          </div>

        </div>
      </div>
    </AuthenticatedLayout>
  )
}
