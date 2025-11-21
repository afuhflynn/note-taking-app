-- Add full-text search support to Note table
-- This migration adds a tsvector column for PostgreSQL full-text search

-- Add tsvector column for full-text search
ALTER TABLE "Note" ADD COLUMN IF NOT EXISTS "search_vector" tsvector;

-- Create a function to update the search vector
CREATE OR REPLACE FUNCTION note_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW."searchableText", '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update search_vector on INSERT or UPDATE
DROP TRIGGER IF EXISTS note_search_vector_trigger ON "Note";
CREATE TRIGGER note_search_vector_trigger
  BEFORE INSERT OR UPDATE ON "Note"
  FOR EACH ROW
  EXECUTE FUNCTION note_search_vector_update();

-- Create GIN index for fast full-text search
CREATE INDEX IF NOT EXISTS "Note_search_vector_idx" ON "Note" USING GIN (search_vector);

-- Update existing rows
UPDATE "Note" SET search_vector =
  setweight(to_tsvector('english', COALESCE(title, '')), 'A') ||
  setweight(to_tsvector('english', COALESCE("searchableText", '')), 'B');
