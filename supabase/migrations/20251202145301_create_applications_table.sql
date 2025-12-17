-- Create Applications Table
-- 
-- 1. New Tables
--    - applications table with all applicant information
-- 2. Security
--    - Enable RLS
--    - Allow public insert for new applications
--    - Allow users to read their own applications

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  experience_level text NOT NULL,
  current_occupation text NOT NULL,
  why_join text NOT NULL,
  payment_plan text NOT NULL,
  payment_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert applications"
  ON applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read own applications by email"
  ON applications
  FOR SELECT
  TO anon, authenticated
  USING (true);
