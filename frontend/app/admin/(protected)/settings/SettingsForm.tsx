'use client';

import { useState } from 'react';
import { updateAdminSettings } from '@/lib/api/admin';
import { SiteSettings } from '@/types/api';
import { Button } from '@/components/ui/Button';

export default function SettingsForm({ initialData }: { initialData: SiteSettings }) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data: Partial<SiteSettings> = {
      businessName: formData.get('businessName') as string,
      phone: formData.get('phone') as string,
      whatsapp: formData.get('whatsapp') as string,
      email: formData.get('email') as string,
      address: formData.get('address') as string,
      googleMapsUrl: formData.get('googleMapsUrl') as string,
      instagramUrl: formData.get('instagramUrl') as string,
      siteUrl: formData.get('siteUrl') as string,
    };

    try {
      await updateAdminSettings(data);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>}
      {success && <div className="bg-green-50 text-green-600 p-4 rounded-md">Ayarlar başarıyla güncellendi.</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Firma Adı</label>
          <input
            name="businessName"
            type="text"
            required
            defaultValue={initialData.businessName}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telefon</label>
          <input
            name="phone"
            type="text"
            defaultValue={initialData.phone || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">WhatsApp</label>
          <input
            name="whatsapp"
            type="text"
            defaultValue={initialData.whatsapp || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">E-posta</label>
          <input
            name="email"
            type="email"
            defaultValue={initialData.email || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Adres</label>
          <textarea
            name="address"
            rows={3}
            defaultValue={initialData.address || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Google Maps URL</label>
          <input
            name="googleMapsUrl"
            type="url"
            defaultValue={initialData.googleMapsUrl || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
          <input
            name="instagramUrl"
            type="url"
            defaultValue={initialData.instagramUrl || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Site URL</label>
          <input
            name="siteUrl"
            type="url"
            defaultValue={initialData.siteUrl || ''}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand-navy focus:border-brand-navy"
          />
        </div>
      </div>

      <div className="pt-5 border-t border-gray-200">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
        </Button>
      </div>
    </form>
  );
}
