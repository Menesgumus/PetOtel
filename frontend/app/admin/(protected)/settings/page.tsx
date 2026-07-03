import { getAdminSettings } from '@/lib/api/admin';
import { safeFetch } from '@/lib/api/helpers';
import SettingsForm from './SettingsForm';

export default async function SettingsPage() {
  const initialData = await safeFetch(() => getAdminSettings());

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Site Ayarları</h1>
        <p className="mt-2 text-sm text-gray-600">
          İletişim bilgilerinizi ve sosyal medya hesaplarınızı yönetin.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        {initialData ? (
          <SettingsForm initialData={initialData} />
        ) : (
          <div className="text-red-500">Ayarlar yüklenemedi. Lütfen tekrar deneyin.</div>
        )}
      </div>
    </div>
  );
}
