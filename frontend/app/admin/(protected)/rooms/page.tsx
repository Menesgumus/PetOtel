import { getAdminRooms } from '@/lib/api/admin';
import { safeFetch, getPageContent } from '@/lib/api/helpers';
import RoomsList from './RoomsList';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Room } from '@/types/api';

export default async function RoomsPage() {
  const response = await safeFetch(() => getAdminRooms());
  const initialData = response ? getPageContent<Room>(response) : null;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Odalar</h1>
          <p className="mt-2 text-sm text-gray-600">
            Otel odalarınızı ve konaklama seçeneklerinizi yönetin.
          </p>
        </div>
        <Link href="/admin/rooms/new">
          <Button>Yeni Oluştur</Button>
        </Link>
      </div>

      {initialData ? (
        <RoomsList initialData={initialData} />
      ) : (
        <div className="text-red-500">Odalar yüklenemedi.</div>
      )}
    </div>
  );
}
