'use client';

import { useState } from 'react';
import { BlogPost, PageResponse } from '@/types/api';
import { deleteAdminBlogPost, updateAdminBlogStatus } from '@/lib/api/admin';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function BlogList({ initialData }: { initialData: PageResponse<BlogPost> }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) return;
    try {
      await deleteAdminBlogPost(id);
      setData(prev => ({
        ...prev,
        content: prev.content.filter(post => post.id !== id),
      }));
    } catch (err) {
      alert('Failed to delete blog post');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'DRAFT' ? 'PUBLISHED' : 'DRAFT';
    try {
      await updateAdminBlogStatus(id, newStatus);
      setData(prev => ({
        ...prev,
        content: prev.content.map(post => 
          post.id === id ? { ...post, status: newStatus } : post
        ),
      }));
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Başlık / URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.content.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  Henüz blog yazısı bulunmuyor.
                </td>
              </tr>
            ) : (
              data.content.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500">{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {post.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        if (window.confirm(post.status === 'PUBLISHED'
                          ? 'Bu içeriği yayından kaldırmak istediğinizden emin misiniz?' 
                          : 'Bu içeriği yayına almak istediğinizden emin misiniz?')) {
                          handleToggleStatus(post.id, post.status);
                        }
                      }}
                      className={`mr-4 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                        post.status === 'PUBLISHED'
                          ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200' 
                          : 'bg-brand-navy text-brand-gold hover:bg-brand-navy/90 border border-brand-navy'
                      }`}
                    >
                      {post.status === 'PUBLISHED' ? 'Yayından Kaldır' : 'Yayına Al'}
                    </button>
                    <Link href={`/admin/blog/${post.id}/edit`} className="text-brand-navy hover:text-brand-navy/80 mr-4">
                      Düzenle
                    </Link>
                    <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900">
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
