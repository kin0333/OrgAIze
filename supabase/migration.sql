-- OrgAIze: Supabase Database Migration
-- Run this in the Supabase SQL Editor to create the required tables

-- ============================================
-- 1. Liquidations Table
-- ============================================
CREATE TABLE IF NOT EXISTS liquidations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  uploaded_by TEXT NOT NULL DEFAULT 'demo-user',
  vendor_name TEXT NOT NULL,
  date DATE NOT NULL,
  amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  receipt_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE liquidations ENABLE ROW LEVEL SECURITY;

-- Allow all operations for the demo (anon key)
CREATE POLICY "Allow all for demo" ON liquidations
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 2. Sponsorships Table
-- ============================================
CREATE TABLE IF NOT EXISTS sponsorships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'Bronze' CHECK (tier IN ('Gold', 'Silver', 'Bronze')),
  contact_email TEXT,
  generated_email TEXT,
  generated_moa_text TEXT,
  status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Sent', 'Accepted', 'Declined')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE sponsorships ENABLE ROW LEVEL SECURITY;

-- Allow all operations for the demo (anon key)
CREATE POLICY "Allow all for demo" ON sponsorships
  FOR ALL
  USING (true)
  WITH CHECK (true);
