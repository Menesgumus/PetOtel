import { getAdminBlogPosts } from '@/lib/api/admin';
import { safeFetch } from '@/lib/api/helpers';
import BlogList from './BlogList';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default async function BlogPage() {
  const response = await safeFetch(() => getAdminBlogPosts(0, 50));
  const initialData = response || { content: [], pageNo: 0, pageSize: 50, totalElements: 0, totalPages: 0, last: true };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Yazıları</h1>
          <p className="mt-2 text-sm text-gray-600">
            Blog içeriklerinizi buradan yönetebilirsiniz.
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button>Yeni Oluştur</Button>
        </Link>
      </div>

      {initialData ? (
        <BlogList initialData={initialData} />
      ) : (
        <div className="text-red-500">Blog yazıları yüklenemedi.</div>
      )}
    </div>
  );
}
