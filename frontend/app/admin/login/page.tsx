'use client';

import { useActionState } from 'react';
import { login } from '@/app/actions/auth';

const initialState = {
  error: null as string | null,
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-cream via-white to-brand-cream px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl w-full items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        
        {/* Left Brand Panel */}
        <section className="
          relative hidden overflow-hidden rounded-[2rem]
          bg-gradient-to-br from-brand-navy via-[#092b5f] to-brand-navy
          p-10 text-white shadow-[0_24px_70px_rgba(6,31,69,0.25)]
          lg:flex lg:flex-col lg:justify-between lg:h-[600px]
        ">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-gold/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          />
          
          <div className="relative z-10 flex flex-col gap-6">
            <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center p-3 backdrop-blur shadow-inner border border-white/20">
              <img src="/brand/ankara-pet-house-icon.png" alt="Ankara Pet House Logo" className="object-contain w-full h-full" />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">Ankara Pet House</h1>
              <h2 className="text-xl text-brand-gold font-medium mb-6">Yönetim Paneli</h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-sm">
                İçerikleri, hizmetleri, görselleri ve site ayarlarını güvenli şekilde yönetin.
              </p>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-white/90">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">✓</span>
              <span>Güvenli giriş</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">✓</span>
              <span>İçerik yönetimi</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">✓</span>
              <span>Görsel ve hizmet kontrolü</span>
            </div>
          </div>
        </section>

        {/* Right Login Card */}
        <section className="
          relative mx-auto w-full max-w-md rounded-[2rem]
          border border-brand-border/80 bg-white/90 p-8
          shadow-[0_20px_60px_rgba(6,31,69,0.12)]
          ring-1 ring-white/80 backdrop-blur
          sm:p-10
        ">
          <div
            aria-hidden="true"
            className="absolute left-8 right-8 top-0 h-1 rounded-b-full bg-gradient-to-r from-brand-gold/30 via-brand-gold to-brand-gold/30"
          />
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-brand-navy mb-2">Yönetici Girişi</h2>
            <p className="text-brand-text/70">
              Ankara Pet House yönetim paneline erişmek için bilgilerinizi girin.
            </p>
          </div>

          <form className="space-y-6" action={formAction}>
            {state?.error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {state.error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-semibold text-brand-navy">
                Kullanıcı adı veya e-posta
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="username"
                placeholder="admin"
                required
                className="
                  w-full rounded-2xl border border-brand-border bg-white px-4 py-3
                  text-brand-text shadow-sm outline-none
                  transition-all duration-200
                  placeholder:text-brand-text/35
                  focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/15
                "
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-semibold text-brand-navy">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="
                  w-full rounded-2xl border border-brand-border bg-white px-4 py-3
                  text-brand-text shadow-sm outline-none
                  transition-all duration-200
                  placeholder:text-brand-text/35
                  focus:border-brand-gold focus:ring-4 focus:ring-brand-gold/15
                "
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="
                  mt-2 inline-flex w-full items-center justify-center rounded-2xl
                  bg-brand-navy px-5 py-3.5 text-base font-bold text-white
                  shadow-[0_14px_30px_rgba(6,31,69,0.22)]
                  transition-all duration-300 ease-out
                  hover:-translate-y-0.5 hover:bg-brand-gold hover:text-brand-navy
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2
                  active:scale-[0.99]
                  disabled:cursor-not-allowed disabled:opacity-60
                  motion-reduce:transform-none motion-reduce:transition-none
                "
              >
                {isPending ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
