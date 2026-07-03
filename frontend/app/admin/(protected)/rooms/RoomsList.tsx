'use client';

import { useState } from 'react';
import { Room } from '@/types/api';
import { deleteAdminRoom, updateAdminRoomActive } from '@/lib/api/admin';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function RoomsList({ initialData }: { initialData: Room[] }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu konaklama alanını silmek istediğinizden emin misiniz?')) return;
    try {
      await deleteAdminRoom(id);
      setData(prev => prev.filter(room => room.id !== id));
    } catch (err) {
      alert('Failed to delete room');
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    const newActive = !currentActive;
    try {
      await updateAdminRoomActive(id, newActive);
      setData(prev => prev.map(room => 
        room.id === id ? { ...room, active: newActive } : room
      ));
      router.refresh();
    } catch (err) {
      alert('İşlem başarısız oldu.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sıra</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Başlık / URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  Henüz konaklama alanı bulunmuyor.
                </td>
              </tr>
            ) : (
              data.map((room) => (
                <tr key={room.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {room.sortOrder}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{room.title}</div>
                    <div className="text-sm text-gray-500">{room.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        room.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {room.active ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        if (window.confirm(room.active 
                          ? 'Bu içeriği pasife almak istediğinizden emin misiniz?' 
                          : 'Bu içeriği tekrar aktif yapmak istediğinizden emin misiniz?')) {
                          handleToggleActive(room.id, room.active);
                        }
                      }}
                      className={`mr-4 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                        room.active 
                          ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200' 
                          : 'bg-brand-navy text-brand-gold hover:bg-brand-navy/90 border border-brand-navy'
                      }`}
                    >
                      {room.active ? 'Pasife Al' : 'Aktif Yap'}
                    </button>
                    <Link href={`/admin/rooms/${room.id}/edit`} className="text-brand-navy hover:text-brand-navy/80 mr-4">
                      Düzenle
                    </Link>
                    <button onClick={() => handleDelete(room.id)} className="text-red-600 hover:text-red-900">
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}
