-- V9: Add secondary image to page contents

ALTER TABLE page_contents ADD COLUMN secondary_image_id UUID;
ALTER TABLE page_contents ADD CONSTRAINT fk_page_contents_secondary_image FOREIGN KEY (secondary_image_id) REFERENCES media_assets (id) ON DELETE SET NULL;
