import ServiceForm from '../ServiceForm';

export default function NewServicePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Service</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <ServiceForm />
      </div>
    </div>
  );
}
