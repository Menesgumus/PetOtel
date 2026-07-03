ALTER TABLE pet_services
ADD COLUMN cover_image_id UUID REFERENCES media_assets(id) ON DELETE SET NULL;
