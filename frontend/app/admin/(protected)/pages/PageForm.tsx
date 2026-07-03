'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageContent } from '@/types/api';
import { updateAdminPage } from '@/lib/api/admin';
import { Button } from '@/components/ui/Button';
import { ImageSelect } from '@/components/ui/ImageSelect';

export default function PageForm({ initialData }: { initialData: PageContent }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isAnasayfa = initialData.slug === 'anasayfa';
  const isHakkimizda = initialData.slug === 'hakkimizda';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data: Partial<PageContent> = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      coverImageId: formData.get('coverImageId') ? formData.get('coverImageId') as string : undefined,
      secondaryImageId: formData.get('secondaryImageId') ? formData.get('secondaryImageId') as string : undefined,
      seoTitle: formData.get('seoTitle') as string,
      seoDescription: formData.get('seoDescription') as string,
    };

    try {
      await updateAdminPage(initialData.slug, data);
      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>}
      {success && <div className="bg-green-50 text-green-600 p-4 rounded-md">Sayfa başarıyla güncellendi.</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Sayfa URL (Slug)</label>
          <input
            type="text"
            disabled
            value={initialData.slug}
            className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-500"
          />
        </div>

        {isAnasayfa && (
          <>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ana Sayfa Hero Görseli</label>
              <ImageSelect
                name="coverImageId"
                defaultValue={initialData.coverImageId}
              />
              <p className="mt-1 text-xs text-gray-500">Ana sayfanın en üst hero bölümünde kullanılır.</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Neden Bizi Tercih Etmelisiniz Görseli</label>
              <ImageSelect
                name="secondaryImageId"
                defaultValue={initialData.secondaryImageId}
              />
              <p className="mt-1 text-xs text-gray-500">Ana sayfadaki “Neden Bizi Tercih Etmelisiniz?” bölümünde kullanılır.</p>
            </div>
          </>
        )}

        {isHakkimizda && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hakkımızda Görseli</label>
            <ImageSelect
              name="coverImageId"
              defaultValue={initialData.coverImageId}
            />
            <p className="mt-1 text-xs text-gray-500">Hakkımızda sayfasındaki ana görsel alanında kullanılır.</p>
          </div>
        )}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Başlık *</label>
          <input
            name="title"
            type="text"
            required
            defaultValue={initialData.title}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">İçerik (Markdown destekli) *</label>
          <textarea
            name="content"
            required
            rows={10}
            defaultValue={initialData.content}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-navy focus:border-brand-navy font-mono text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">Detay sayfasında görünecek açıklama. Basit metin veya Markdown kullanabilirsiniz.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">SEO Başlığı</label>
          <input
            name="seoTitle"
            type="text"
            defaultValue={initialData.seoTitle || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
          <p className="mt-1 text-xs text-gray-500">Google ve tarayıcı sekmesinde görünebilecek başlık. Kısa ve açıklayıcı yazın.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">SEO Açıklaması</label>
          <input
            name="seoDescription"
            type="text"
            defaultValue={initialData.seoDescription || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
          <p className="mt-1 text-xs text-gray-500">Arama sonuçlarında görünebilecek kısa açıklama. 140-160 karakter civarı idealdir.</p>
        </div>
      </div>

      <div className="pt-5 border-t border-gray-200 flex justify-end gap-3">
        <Button variant="secondary" type="button" onClick={() => router.push('/admin/pages')}>
          Sayfalara Dön
        </Button>
        <Button type="submit" disabled={isSaving || success}>
          {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>
    </form>
  );
}
