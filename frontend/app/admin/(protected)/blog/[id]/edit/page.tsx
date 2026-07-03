import { getAdminBlogPost } from '@/lib/api/admin';
import BlogForm from '../../BlogForm';
import { notFound } from 'next/navigation';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    const post = await getAdminBlogPost(id);
    
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post: {post.title}</h1>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <BlogForm initialData={post} />
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
