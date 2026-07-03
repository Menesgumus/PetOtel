'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Room } from '@/types/api';
import { createAdminRoom, updateAdminRoom } from '@/lib/api/admin';
import { Button } from '@/components/ui/Button';
import { ImageSelect } from '@/components/ui/ImageSelect';

export default function RoomForm({ initialData }: { initialData?: Room }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const data: Partial<Room> = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      description: formData.get('description') as string,
      seoTitle: formData.get('seoTitle') as string,
      seoDescription: formData.get('seoDescription') as string,
      active: formData.get('active') === 'on',
      sortOrder: Number(formData.get('sortOrder')) || 0,
      coverImageId: formData.get('coverImageId') ? formData.get('coverImageId') as string : undefined,
    };

    try {
      if (initialData) {
        await updateAdminRoom(initialData.id, data);
        setSuccess('Oda başarıyla güncellendi. Yönlendiriliyorsunuz...');
      } else {
        await createAdminRoom(data);
        setSuccess('Oda başarıyla oluşturuldu. Yönlendiriliyorsunuz...');
      }
      setTimeout(() => {
        router.push('/admin/rooms');
        router.refresh();
      }, 1500);
    } catch (err) {
      const msg = (err as Error).message;
      if (msg.includes('409') || msg.toLowerCase().includes('duplicate')) {
        setError('Bu URL (slug) zaten kullanılıyor. Lütfen farklı bir URL seçin.');
      } else {
        setError(msg);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>}
      {success && <div className="bg-green-50 text-green-600 p-4 rounded-md">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Başlık *</label>
          <input
            name="title"
            type="text"
            required
            defaultValue={initialData?.title}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">URL Kısa Adı (Slug) (İsteğe Bağlı)</label>
          <input
            name="slug"
            type="text"
            defaultValue={initialData?.slug}
            placeholder="Boş bırakırsanız otomatik oluşturulur"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sıralama</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={initialData?.sortOrder || 0}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
          <p className="mt-1 text-xs text-gray-500">Küçük sayı önce görünür. Örneğin 10, 20, 30 şeklinde kullanabilirsiniz.</p>
        </div>

        <div className="flex items-center mt-4">
          <input
            name="active"
            type="checkbox"
            defaultChecked={initialData ? initialData.active : true}
            className="h-4 w-4 text-brand-navy focus:ring-brand-navy border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Aktif
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Kapak Görseli</label>
          <ImageSelect name="coverImageId" defaultValue={initialData?.coverImageId} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Açıklama (Markdown destekli) *</label>
          <textarea
            name="description"
            required
            rows={5}
            defaultValue={initialData?.description}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-navy focus:border-brand-navy font-mono text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">Detay sayfasında görünecek açıklama. Basit metin veya Markdown kullanabilirsiniz.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">SEO Başlığı</label>
          <input
            name="seoTitle"
            type="text"
            defaultValue={initialData?.seoTitle || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
          <p className="mt-1 text-xs text-gray-500">Google ve tarayıcı sekmesinde görünebilecek başlık. Kısa ve açıklayıcı yazın.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">SEO Açıklaması</label>
          <input
            name="seoDescription"
            type="text"
            defaultValue={initialData?.seoDescription || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
          <p className="mt-1 text-xs text-gray-500">Arama sonuçlarında görünebilecek kısa açıklama. 140-160 karakter civarı idealdir.</p>
        </div>
      </div>

      <div className="pt-5 border-t border-gray-200 flex justify-end gap-3">
        <Button variant="secondary" type="button" onClick={() => router.push('/admin/rooms')} disabled={isSaving}>
          İptal
        </Button>
        <Button type="submit" disabled={isSaving || !!success}>
          {isSaving ? 'Kaydediliyor...' : (initialData ? 'Güncelle' : 'Kaydet')}
        </Button>
      </div>
    </form>
  );
}
