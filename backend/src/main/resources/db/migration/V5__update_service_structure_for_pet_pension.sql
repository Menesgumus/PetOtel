-- Update sorting of pet services to demote Kedi and Kopek Oteli, and promote Pet Pansiyonu
UPDATE pet_services SET sort_order = 20 WHERE slug = 'ankara-pet-pansiyonu';
UPDATE pet_services SET sort_order = 30 WHERE slug = 'pet-taksi-ankara';
UPDATE pet_services SET sort_order = 40 WHERE slug = 'pet-kres-ankara';
UPDATE pet_services SET sort_order = 50 WHERE slug = 'pet-bakim-gezdirme-ankara';
UPDATE pet_services SET sort_order = 60 WHERE slug = 'pet-egitimi-ankara';
UPDATE pet_services SET sort_order = 100 WHERE slug = 'ankara-kedi-oteli';
UPDATE pet_services SET sort_order = 110 WHERE slug = 'ankara-kopek-oteli';
