import { getAdminMediaAssets } from '@/lib/api/admin';
import { safeFetch, getPageContent } from '@/lib/api/helpers';
import MediaList from './MediaList';
import { MediaAsset } from '@/types/api';

export default async function MediaPage() {
  const response = await safeFetch(() => getAdminMediaAssets());
  const initialData = response ? getPageContent<MediaAsset>(response) : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Görsel Kütüphanesi</h1>
        <p className="mt-2 text-sm text-gray-600">
          Görselleri buradan yükleyebilirsiniz. Blog, hizmet ve oda sayfalarında kapak görseli olarak kullanmak için görsel ID’sini veya URL’sini kopyalayın.
        </p>
      </div>

      {initialData ? (
        <MediaList initialData={initialData} />
      ) : (
        <div className="text-red-500">Görseller yüklenemedi.</div>
      )}
    </div>
  );
}
