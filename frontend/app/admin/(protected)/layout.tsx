import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logout } from '@/app/actions/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  const navItems = [
    { name: 'Panel', href: '/admin/dashboard', icon: '◫' },
    { name: 'Blog Yazıları', href: '/admin/blog', icon: '✦' },
    { name: 'Görseller', href: '/admin/media', icon: '◈' },
    { name: 'Hizmetler', href: '/admin/services', icon: '◆' },
    { name: 'Odalar', href: '/admin/rooms', icon: '⌂' },
    { name: 'Sayfalar', href: '/admin/pages', icon: '▤' },
    { name: 'Ayarlar', href: '/admin/settings', icon: '⚙' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream/70 via-white to-brand-cream/50 flex flex-col lg:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="
        hidden min-h-screen w-72 shrink-0 flex-col
        bg-gradient-to-b from-brand-navy via-[#082856] to-brand-navy
        text-white shadow-[12px_0_40px_rgba(6,31,69,0.18)]
        lg:flex
      ">
        <div className="p-8 pb-6 flex items-center gap-4">
          <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center p-2 backdrop-blur shadow-inner border border-white/20">
            <img src="/brand/ankara-pet-house-icon.png" alt="Logo" className="object-contain w-full h-full" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white leading-tight">Ankara Pet House</h2>
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-wider mt-0.5">Yönetim Paneli</p>
          </div>
        </div>
        
        <nav className="flex-1 px-5 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="
                flex items-center gap-3 rounded-2xl px-4 py-3
                text-sm font-semibold text-white/80
                transition-all duration-200
                hover:bg-white/10 hover:text-white
              "
            >
              <span className="text-brand-gold/70 text-base w-5 text-center">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-5 border-t border-white/10">
          <form action={logout}>
            <button
              type="submit"
              className="
                w-full flex items-center gap-3 rounded-2xl px-4 py-3
                text-sm font-semibold text-red-300 bg-red-950/20
                border border-red-900/30
                transition-all duration-200
                hover:bg-red-900/40 hover:text-red-200 hover:border-red-800/50
              "
            >
              <span className="text-red-400 text-base w-5 text-center">⎋</span>
              <span>Çıkış Yap</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <div className="lg:hidden bg-brand-navy text-white p-4 flex items-center justify-between shadow-md z-10 sticky top-0">
        <div className="flex items-center gap-3">
           <div className="h-8 w-8 bg-white/10 rounded-md flex items-center justify-center p-1">
             <img src="/brand/ankara-pet-house-icon.png" alt="Logo" className="object-contain w-full h-full" />
           </div>
           <div>
             <h2 className="font-bold text-sm leading-none">Ankara Pet House</h2>
             <span className="text-brand-gold text-[10px] uppercase">Yönetim</span>
           </div>
        </div>
        
        <form action={logout}>
          <button type="submit" className="text-xs font-bold text-red-300 bg-white/10 px-3 py-1.5 rounded-lg">
            Çıkış
          </button>
        </form>
      </div>

      {/* Mobile Nav Scroller */}
      <div className="lg:hidden bg-brand-navy border-t border-white/10 overflow-x-auto whitespace-nowrap flex scrollbar-hide py-2 px-2 shadow-inner">
         {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="inline-block px-4 py-1.5 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-full mx-1"
            >
              {item.name}
            </Link>
         ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-10">
          {children}
        </div>
      </main>
    </div>
  );
}
