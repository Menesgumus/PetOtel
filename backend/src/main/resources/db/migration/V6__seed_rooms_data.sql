INSERT INTO rooms (id, title, slug, description, is_active, sort_order, created_at, updated_at)
VALUES 
  (uuid_generate_v4(), 'Pansiyon Konaklama Alanı', 'pansiyon-konaklama-alani', 'Evcil dostlarınızın konaklama sürecinde kullanabileceği temiz, sakin ve düzenli alanlardan bir görünüm.', true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (uuid_generate_v4(), 'Bakım ve Dinlenme Alanı', 'bakim-ve-dinlenme-alani', 'Günlük bakım, dinlenme ve ihtiyaç takibi için düzenli şekilde kullanılan konforlu alanlarımızdan biri.', true, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (slug)
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  is_active = true,
  sort_order = EXCLUDED.sort_order,
  updated_at = CURRENT_TIMESTAMP;
