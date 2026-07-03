import { getAdminService } from '@/lib/api/admin';
import ServiceForm from '../../ServiceForm';
import { notFound } from 'next/navigation';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const service = await getAdminService(id);
    
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Service: {service.title}</h1>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <ServiceForm initialData={service} />
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
