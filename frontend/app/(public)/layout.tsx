import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import FloatingQuickActionMenu from "@/components/ui/FloatingQuickActionMenu";
import { getPublicSiteSettings } from "@/lib/api/public";
import { siteConfig } from "@/lib/site/config";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getPublicSiteSettings().catch(() => null);
  const whatsapp = settings?.whatsapp || siteConfig.whatsapp;
  const phone = settings?.phone || siteConfig.phone;
  const mapsUrl = settings?.googleMapsUrl || siteConfig.googleMapsUrl;

  return (
    <>
      <SiteHeader />
      <main className="flex-grow bg-brand-soft">
        {children}
      </main>
      <SiteFooter />
      {/* Single unified floating quick action menu — replaces MobileContactBar + FloatingWhatsAppButton */}
      <FloatingQuickActionMenu whatsapp={whatsapp} phone={phone} mapsUrl={mapsUrl} />
    </>
  );
}
