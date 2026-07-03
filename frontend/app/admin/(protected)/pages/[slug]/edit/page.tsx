import { getAdminPage } from '@/lib/api/admin';
import PageForm from '../../PageForm';
import { notFound } from 'next/navigation';

export default async function EditPagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const page = await getAdminPage(slug);
    
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Sayfa Düzenle: {page.title}</h1>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <PageForm initialData={page} />
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
