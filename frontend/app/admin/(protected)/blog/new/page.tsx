import BlogForm from '../BlogForm';

export default function NewBlogPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Yeni Blog Yazısı Oluştur</h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <BlogForm />
      </div>
    </div>
  );
}
