-- V8: Add cover image to page contents
-- Also seed 'anasayfa' record

ALTER TABLE page_contents ADD COLUMN cover_image_id UUID;
ALTER TABLE page_contents ADD CONSTRAINT fk_page_contents_cover_image FOREIGN KEY (cover_image_id) REFERENCES media_assets (id) ON DELETE SET NULL;

INSERT INTO page_contents (id, slug, title, content, seo_title, seo_description, created_at, updated_at)
VALUES (
    uuid_generate_v4(),
    'anasayfa',
    'Ana Sayfa',
    'Ankara Pet House Ana Sayfa İçeriği',
    'Ankara Pet Otel | Kedi ve Köpek Oteli',
    'Ankara Pet House, kedi ve köpekler için güvenli, temiz ve konforlu pet otel hizmeti sunar. Odalarımızı inceleyin, WhatsApp veya telefonla iletişime geçin.',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT (slug) DO NOTHING;
