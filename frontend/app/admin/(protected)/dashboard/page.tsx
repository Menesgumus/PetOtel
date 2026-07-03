import { getAdminBlogPosts, getAdminServices, getAdminRooms, getAdminMediaAssets } from '@/lib/api/admin';
import { getPageContent, safeFetch } from '@/lib/api/helpers';
import Link from 'next/link';

export default async function DashboardPage() {
  // Fetch overview data
  const [blogsResponse, services, rooms, media] = await Promise.all([
    safeFetch(() => getAdminBlogPosts(0, 1)),
    safeFetch(() => getAdminServices()),
    safeFetch(() => getAdminRooms()),
    safeFetch(() => getAdminMediaAssets()),
  ]);

  const servicesList = getPageContent(services);
  const roomsList = getPageContent(rooms);
  const mediaList = getPageContent(media);

  const stats = [
    { name: 'Toplam Blog Yazısı', value: blogsResponse?.totalElements ?? 0, href: '/admin/blog', icon: '✦' },
    { name: 'Aktif Hizmetler', value: servicesList.filter((s: any) => s.active === true).length, href: '/admin/services', icon: '◆' },
    { name: 'Aktif Odalar', value: roomsList.filter((r: any) => r.active === true).length, href: '/admin/rooms', icon: '⌂' },
    { name: 'Toplam Görsel', value: (media as any)?.totalElements ?? mediaList.length, href: '/admin/media', icon: '◈' },
  ];

  return (
    <div className="space-y-10">
      
      {/* Welcome Header */}
      <div className="
        relative overflow-hidden rounded-[2rem]
        bg-gradient-to-br from-brand-navy via-[#092b5f] to-brand-navy
        p-8 md:p-10 text-white shadow-[0_20px_60px_rgba(6,31,69,0.18)]
      ">
        <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-gold/20 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Yönetim Paneli</h1>
            <p className="text-white/80 max-w-lg text-lg">
              Ankara Pet House web sitesindeki içerikleri güvenli ve pratik şekilde yönetin.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur border border-white/20">
            <div className="h-6 w-6 bg-brand-gold rounded-full flex items-center justify-center shadow-inner">
               <span className="text-[10px] text-brand-navy font-black">PH</span>
            </div>
            <span className="font-semibold text-sm">Ankara Pet House</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="
            group relative flex flex-col overflow-hidden rounded-[2rem]
            border border-brand-border/80 bg-white/90 p-6
            shadow-[0_12px_35px_rgba(6,31,69,0.07)]
            ring-1 ring-white/80
            transition-all duration-300 ease-out
            hover:-translate-y-1 hover:border-brand-gold/60 hover:shadow-[0_20px_50px_rgba(6,31,69,0.13)]
            focus-within:-translate-y-1 focus-within:border-brand-gold/60 focus-within:shadow-[0_20px_50px_rgba(6,31,69,0.13)]
            active:scale-[0.99]
            motion-reduce:transform-none motion-reduce:transition-none
          ">
            <div className="
              mb-5 flex h-12 w-12 items-center justify-center rounded-2xl
              bg-brand-navy text-brand-gold shadow-lg shadow-brand-navy/15 text-xl
            ">
              {stat.icon}
            </div>
            <h3 className="text-sm font-semibold text-brand-text/70">{stat.name}</h3>
            <p className="text-4xl font-bold text-brand-navy mt-1 mb-6">{stat.value}</p>
            
            <div className="mt-auto pt-4 border-t border-brand-border">
              <Link 
                href={stat.href} 
                className="
                  inline-flex items-center gap-2 text-sm font-bold text-brand-navy 
                  transition-colors hover:text-brand-gold outline-none
                "
              >
                Tümünü gör <span className="text-lg transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="
          rounded-[2rem] border border-brand-border/80 bg-white/90 p-8
          shadow-[0_12px_35px_rgba(6,31,69,0.07)]
        ">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-brand-navy">Hızlı İşlemler</h2>
            <p className="text-brand-text/70 mt-1">
              Sık kullanılan yönetim işlemlerine hızlıca ulaşın.
            </p>
          </div>
          
          <div className="flex flex-col space-y-4">
             <Link href="/admin/blog/new" className="
                group flex items-center justify-between rounded-2xl
                border border-brand-navy bg-brand-navy px-5 py-4
                text-sm font-bold text-white
                shadow-sm transition-all duration-300
                hover:-translate-y-0.5 hover:border-brand-gold/60 hover:bg-brand-gold hover:text-brand-navy hover:shadow-md
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2
                active:scale-[0.99]
             ">
               <span className="flex items-center gap-3">
                 <span className="text-lg">✦</span>
                 Yeni Blog Yazısı Oluştur
               </span>
               <span className="opacity-70 group-hover:opacity-100">&rarr;</span>
             </Link>
             
             <Link href="/admin/media" className="
                group flex items-center justify-between rounded-2xl
                border border-brand-border bg-white px-5 py-4
                text-sm font-bold text-brand-navy
                shadow-sm transition-all duration-300
                hover:-translate-y-0.5 hover:border-brand-gold/60 hover:bg-brand-cream hover:shadow-md
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2
                active:scale-[0.99]
             ">
               <span className="flex items-center gap-3">
                 <span className="text-lg text-brand-gold">◈</span>
                 Görsel Yükle
               </span>
               <span className="opacity-50 group-hover:opacity-100">&rarr;</span>
             </Link>
             
             <Link href="/admin/services" className="
                group flex items-center justify-between rounded-2xl
                border border-brand-border bg-white px-5 py-4
                text-sm font-bold text-brand-navy
                shadow-sm transition-all duration-300
                hover:-translate-y-0.5 hover:border-brand-gold/60 hover:bg-brand-cream hover:shadow-md
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2
                active:scale-[0.99]
             ">
               <span className="flex items-center gap-3">
                 <span className="text-lg text-brand-gold">◆</span>
                 Hizmetleri Yönet
               </span>
               <span className="opacity-50 group-hover:opacity-100">&rarr;</span>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
