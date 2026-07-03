import RoomForm from '../RoomForm';

export default function NewRoomPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Room</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <RoomForm />
      </div>
    </div>
  );
}
