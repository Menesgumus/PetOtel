import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import FloatingWhatsAppButton from "@/components/ui/FloatingWhatsAppButton";
import { getPublicSiteSettings } from "@/lib/api/public";
import { siteConfig } from "@/lib/site/config";
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getPublicSiteSettings().catch(() => null);
  const whatsapp = settings?.whatsapp || siteConfig.whatsapp;
  return (
    <>
      <SiteHeader />
      <main className="flex-grow bg-brand-soft pb-16 md:pb-0">
        {children}
      </main>
      <SiteFooter />
      <MobileContactBar />
      <FloatingWhatsAppButton phone={whatsapp} />
    </>
  );
}
