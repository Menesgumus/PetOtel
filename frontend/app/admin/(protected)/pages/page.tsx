import { getAdminPages } from '@/lib/api/admin';
import { safeFetch } from '@/lib/api/helpers';
import Link from 'next/link';

export default async function PagesIndex() {
  const initialData = await safeFetch(() => getAdminPages());

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Statik Sayfalar</h1>
        <p className="mt-2 text-sm text-gray-600">
          Hakkımızda, İletişim gibi sabit sayfaların içeriklerini yönetin.
        </p>
      </div>

      {!initialData ? (
        <div className="text-red-500">Sayfalar yüklenemedi.</div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Başlık</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL (Slug)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {initialData.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                      Sayfa bulunamadı.
                    </td>
                  </tr>
                ) : (
                  initialData.map((page) => (
                    <tr key={page.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {page.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {page.slug}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/admin/pages/${page.slug}/edit`} className="text-brand-navy hover:text-brand-navy/80">
                          Düzenle
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
