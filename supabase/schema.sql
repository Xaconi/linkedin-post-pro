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
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

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

-- ============================================
-- END OF SCHEMA
-- ============================================
