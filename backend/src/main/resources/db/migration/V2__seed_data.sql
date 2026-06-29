-- Seed Site Settings
INSERT INTO site_settings (business_name, phone, whatsapp, email, address, google_maps_url, site_url)
SELECT 'Ankara Pet House', '0531 688 43 21', '0531 688 43 21', 'info@ankarapethouse.com', 'Ankara, Türkiye', '#harita', 'http://localhost:3000'
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

-- Seed Pet Services (Matching SEO routes from Phase 2)
INSERT INTO pet_services (title, slug, short_description, is_active, sort_order) VALUES
('Ankara Kedi Oteli', 'ankara-kedi-oteli', 'Kediniz için stresten uzak, rahat ve güvenli konaklama alanları.', true, 10),
('Ankara Köpek Oteli', 'ankara-kopek-oteli', 'Köpeğiniz için enerjisini atabileceği geniş ve konforlu alanlar.', true, 20),
('Ankara Pet Pansiyonu', 'ankara-pet-pansiyonu', 'Kısa veya uzun süreli güvenli konaklama ve bakım hizmeti.', true, 30),
('Ankara Pet Taksi', 'pet-taksi-ankara', 'Evcil dostunuzun veteriner veya transfer ulaşımını güvenle sağlıyoruz.', true, 40),
('Ankara Pet Kreş', 'pet-kres-ankara', 'Gün içinde yalnız kalmasını istemediğiniz dostlarınız için oyun ve sosyalleşme.', true, 50),
('Ankara Pet Bakım ve Gezdirme', 'pet-bakim-gezdirme-ankara', 'Günlük egzersiz ve temel bakım ihtiyaçları için profesyonel destek.', true, 60),
('Ankara Pet Eğitimi', 'pet-egitimi-ankara', 'Evcil dostunuz için eğitim süreci ve kontrollü davranış desteği.', true, 70)
ON CONFLICT (slug) DO NOTHING;

-- Seed Page Contents
INSERT INTO page_contents (slug, title, content) VALUES
('hakkimizda', 'Hakkımızda', 'Ankara Pet House, Ankara''da evcil hayvan sahiplerinin güvenle kedi ve köpeklerini emanet edebilecekleri, profesyonel standartlarda hizmet veren bir pet otelidir. Hayvan sevgisi ve profesyonel bakım anlayışını bir araya getirerek, evcil dostlarınızın sizden ayrı kaldıkları süreyi stres olmadan geçirmelerini sağlıyoruz.'),
('iletisim', 'İletişim', 'Bize kolayca ulaşın. Rezervasyon ve bilgi için telefon veya WhatsApp üzerinden iletişim kurabilirsiniz.')
ON CONFLICT (slug) DO NOTHING;
