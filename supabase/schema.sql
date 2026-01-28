-- ============================================
-- LINKEDIN POST PRO - DATABASE SCHEMA
-- ============================================
--
-- Run this SQL in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
--
-- ============================================

-- --------------------------------------------
-- USERS TABLE
-- --------------------------------------------
-- Stores user data synced from Clerk

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  email_verified BOOLEAN DEFAULT false,
  email_tips BOOLEAN DEFAULT true,
  email_updates BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Migration for existing tables:
-- ALTER TABLE users ADD COLUMN IF NOT EXISTS email_tips BOOLEAN DEFAULT true;
-- ALTER TABLE users ADD COLUMN IF NOT EXISTS email_updates BOOLEAN DEFAULT true;

-- Index for fast Clerk ID lookups
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_user_id);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- --------------------------------------------
-- USER SUBSCRIPTIONS TABLE
-- --------------------------------------------
-- Stores subscription and usage data

CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  posts_remaining INTEGER DEFAULT 5,
  posts_limit INTEGER DEFAULT 5,
  cycle_start_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for user lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON user_subscriptions(user_id);

-- Ensure one subscription per user
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriptions_user_unique ON user_subscriptions(user_id);

-- --------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- --------------------------------------------
-- Enable RLS on tables (optional but recommended)

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Service role can do everything
-- Note: These policies allow the service role key to bypass RLS
-- The anon key will have no access (we use service role for all server operations)

CREATE POLICY "Service role full access on users"
  ON users
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on subscriptions"
  ON user_subscriptions
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- --------------------------------------------
-- TRIGGERS FOR UPDATED_AT
-- --------------------------------------------
-- Automatically update updated_at on changes

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON user_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------
-- GENERATED POSTS TABLE
-- --------------------------------------------
-- Stores AI-generated LinkedIn posts

CREATE TABLE IF NOT EXISTS generated_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  input_idea TEXT NOT NULL,
  tone TEXT NOT NULL CHECK (tone IN ('professional', 'friendly', 'inspirational')),
  region TEXT NOT NULL CHECK (region IN ('spain', 'latam')),
  variant_1 TEXT NOT NULL,
  variant_2 TEXT NOT NULL,
  variant_3 TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for user lookups and sorting by date
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON generated_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON generated_posts(created_at DESC);

-- Enable RLS
ALTER TABLE generated_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Service role full access
CREATE POLICY "Service role full access on generated_posts"
  ON generated_posts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- --------------------------------------------
-- PRO WAITLIST TABLE
-- --------------------------------------------
-- Stores Pro plan waitlist signups

CREATE TABLE IF NOT EXISTS pro_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  email TEXT UNIQUE NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('pricing_page', 'dashboard')),
  wants_tips BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON pro_waitlist(email);

-- Index for sorting by date
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON pro_waitlist(created_at DESC);

-- Enable RLS
ALTER TABLE pro_waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: Service role full access
CREATE POLICY "Service role full access on pro_waitlist"
  ON pro_waitlist
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- END OF SCHEMA
-- ============================================

ALTER TABLE users ADD COLUMN IF NOT EXISTS email_tips BOOLEAN DEFAULT true;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_updates BOOLEAN DEFAULT true;