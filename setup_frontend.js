const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'frontend', 'app');
const routes = [
  'hakkimizda',
  'hizmetlerimiz',
  'odalar',
  'blog',
  'blog/[slug]',
  'iletisim',
  'ankara-kedi-oteli',
  'ankara-kopek-oteli',
  'ankara-pet-pansiyonu',
  'pet-taksi-ankara',
  'pet-kres-ankara',
  'pet-bakim-gezdirme-ankara',
  'pet-egitimi-ankara',
  'admin/login',
  'admin/dashboard'
];

routes.forEach(route => {
  const dirPath = path.join(basePath, route);
  fs.mkdirSync(dirPath, { recursive: true });
  
  const pagePath = path.join(dirPath, 'page.tsx');
  const h1Title = route.split('/').pop().replace(/-/g, ' ').toUpperCase();
  
  const content = `export default function Page() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-brand-navy mb-4">${h1Title} - Ankara Pet House</h1>
      <p className="text-brand-text">Placeholder content for ${route} page. To be implemented in Phase 2.</p>
    </main>
  );
}
`;
  fs.writeFileSync(pagePath, content);
});

// Admin layout
const adminLayoutPath = path.join(basePath, 'admin', 'layout.tsx');
const adminLayoutContent = `export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-wrapper bg-gray-50 min-h-screen">
      <nav className="bg-brand-navy text-white p-4">Admin Navigation Placeholder</nav>
      {children}
    </div>
  )
}
`;
fs.writeFileSync(adminLayoutPath, adminLayoutContent);

console.log('Frontend routes generated successfully.');
