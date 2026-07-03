-- Add username column to support username-based login
ALTER TABLE users ADD COLUMN username VARCHAR(255) UNIQUE;
