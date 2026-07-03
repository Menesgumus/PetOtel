import { getAdminServices } from '@/lib/api/admin';
import { safeFetch, getPageContent } from '@/lib/api/helpers';
import ServicesList from './ServicesList';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PetService } from '@/types/api';

export default async function ServicesPage() {
  const response = await safeFetch(() => getAdminServices());
  const initialData = response ? getPageContent<PetService>(response) : null;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hizmetler</h1>
          <p className="mt-2 text-sm text-gray-600">
            Otel hizmetlerinizi buradan yönetebilirsiniz.
          </p>
        </div>
        <Link href="/admin/services/new">
          <Button>Yeni Oluştur</Button>
        </Link>
      </div>

      {initialData ? (
        <ServicesList initialData={initialData} />
      ) : (
        <div className="text-red-500">Hizmetler yüklenemedi.</div>
      )}
    </div>
  );
}
