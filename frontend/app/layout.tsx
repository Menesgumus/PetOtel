import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Ankara Pet House',
    default: 'Ankara Pet House - Profesyonel Pet Otel ve Bakım Merkezi',
  },
  description: "Ankara'da kedi ve köpekleriniz için güvenilir, konforlu ve profesyonel pet otel, pet taksi, pet kreş ve eğitim hizmetleri.",
  openGraph: {
    title: 'Ankara Pet House',
    description: "Ankara'da kedi ve köpekleriniz için güvenilir, konforlu ve profesyonel pet otel, pet taksi, pet kreş ve eğitim hizmetleri.",
    url: siteUrl,
    siteName: 'Ankara Pet House',
    locale: 'tr_TR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KHGQPBPF');
          `}
        </Script>
        <noscript>
          <style>{`.reveal-on-scroll { opacity: 1 !important; transform: none !important; transition: none !important; }`}</style>
        </noscript>
      </head>
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KHGQPBPF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
