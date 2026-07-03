import { getAdminRoom } from '@/lib/api/admin';
import RoomForm from '../../RoomForm';
import { notFound } from 'next/navigation';

export default async function EditRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const room = await getAdminRoom(id);
    
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Room: {room.title}</h1>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <RoomForm initialData={room} />
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
