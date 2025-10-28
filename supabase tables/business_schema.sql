-- ============================================
-- BUSINESS USER SCHEMA FOR BREEZYHIVE WEBSITE
-- ============================================
-- This is separate from tradesperson/enterprise tables in mobile app
-- Business users register through website to manage projects and hire tradespeople

-- ============================================
-- 1. BUSINESS_PROFILES TABLE
-- ============================================
-- Stores business/company information for website registrations
CREATE TABLE IF NOT EXISTS public.business_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,

  -- Business Information (from Step 1)
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL, -- e.g., 'plumbing', 'electrical', 'building', etc. (50 categories)
  company_size TEXT NOT NULL, -- '1-10', '11-50', '51-200', '201-500', '500+'
  address TEXT,
  city TEXT,
  postcode TEXT,
  country TEXT DEFAULT 'GB',

  -- Contact Information (from Step 2)
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL, -- Stored here for easy access (also in auth.users)
  phone TEXT,
  job_title TEXT, -- e.g., 'Managing Director', 'Operations Manager'

  -- Additional fields
  avatar_url TEXT,
  bio TEXT,
  website TEXT,

  -- Marketing consent
  marketing_consent BOOLEAN DEFAULT FALSE,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE, -- Email verification status
  verification_token TEXT,
  verification_sent_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE,

  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- ============================================
-- 2. BUSINESS_PROJECTS TABLE
-- ============================================
-- Projects posted by business users to hire tradespeople
CREATE TABLE IF NOT EXISTS public.business_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES business_profiles(user_id) ON DELETE CASCADE NOT NULL,

  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- Matches business_type categories

  -- Location
  location_address TEXT,
  city TEXT,
  postcode TEXT,

  -- Budget
  budget_min NUMERIC(10, 2),
  budget_max NUMERIC(10, 2),
  budget_type TEXT DEFAULT 'project', -- 'fixed', 'hourly', 'daily', 'project'

  -- Timeline
  urgency TEXT DEFAULT 'medium', -- 'low', 'medium', 'high', 'emergency'
  start_date DATE,
  expected_duration TEXT,
  completion_date DATE,

  -- Status
  status TEXT DEFAULT 'draft', -- 'draft', 'open', 'in_progress', 'completed', 'cancelled'

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- 3. BUSINESS_QUOTES TABLE
-- ============================================
-- Quotes received by business users from tradespeople
CREATE TABLE IF NOT EXISTS public.business_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES business_projects(id) ON DELETE CASCADE NOT NULL,
  business_id UUID REFERENCES business_profiles(user_id) ON DELETE CASCADE NOT NULL,
  tradesperson_id UUID, -- Can reference tradesperson_profiles if integrated

  quote_amount NUMERIC(10, 2) NOT NULL,
  description TEXT,
  estimated_duration TEXT,

  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'rejected', 'expired'

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  accepted_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- 4. BUSINESS_MESSAGES TABLE
-- ============================================
-- Direct messages between business users and tradespeople
CREATE TABLE IF NOT EXISTS public.business_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES business_projects(id) ON DELETE SET NULL,

  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. BUSINESS_REVIEWS TABLE
-- ============================================
-- Reviews left by business users for tradespeople
CREATE TABLE IF NOT EXISTS public.business_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES business_profiles(user_id) ON DELETE CASCADE NOT NULL,
  tradesperson_id UUID, -- Can reference tradesperson_profiles
  project_id UUID REFERENCES business_projects(id) ON DELETE SET NULL,

  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(business_id, project_id)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_business_profiles_user_id ON business_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_business_profiles_email ON business_profiles(email);
CREATE INDEX IF NOT EXISTS idx_business_profiles_business_type ON business_profiles(business_type);
CREATE INDEX IF NOT EXISTS idx_business_profiles_postcode ON business_profiles(postcode);

CREATE INDEX IF NOT EXISTS idx_business_projects_business_id ON business_projects(business_id);
CREATE INDEX IF NOT EXISTS idx_business_projects_status ON business_projects(status);
CREATE INDEX IF NOT EXISTS idx_business_projects_category ON business_projects(category);

CREATE INDEX IF NOT EXISTS idx_business_quotes_project_id ON business_quotes(project_id);
CREATE INDEX IF NOT EXISTS idx_business_quotes_business_id ON business_quotes(business_id);
CREATE INDEX IF NOT EXISTS idx_business_quotes_tradesperson_id ON business_quotes(tradesperson_id);

CREATE INDEX IF NOT EXISTS idx_business_messages_sender_id ON business_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_business_messages_receiver_id ON business_messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_business_messages_project_id ON business_messages(project_id);

CREATE INDEX IF NOT EXISTS idx_business_reviews_business_id ON business_reviews(business_id);
CREATE INDEX IF NOT EXISTS idx_business_reviews_tradesperson_id ON business_reviews(tradesperson_id);

-- ============================================
-- TRIGGERS
-- ============================================
-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_business_profiles_updated_at
BEFORE UPDATE ON business_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_business_projects_updated_at
BEFORE UPDATE ON business_projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_business_quotes_updated_at
BEFORE UPDATE ON business_quotes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_business_reviews_updated_at
BEFORE UPDATE ON business_reviews
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_reviews ENABLE ROW LEVEL SECURITY;

-- Business Profiles Policies
CREATE POLICY "Users can view all business profiles"
ON business_profiles FOR SELECT
TO public
USING (true);

CREATE POLICY "Users can insert their own profile"
ON business_profiles FOR INSERT
TO public
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON business_profiles FOR UPDATE
TO public
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Business Projects Policies
CREATE POLICY "Anyone can view open projects"
ON business_projects FOR SELECT
TO public
USING (status = 'open' OR business_id = auth.uid());

CREATE POLICY "Business users can insert their own projects"
ON business_projects FOR INSERT
TO public
WITH CHECK (auth.uid() = business_id);

CREATE POLICY "Business users can update their own projects"
ON business_projects FOR UPDATE
TO public
USING (auth.uid() = business_id)
WITH CHECK (auth.uid() = business_id);

CREATE POLICY "Business users can delete their own projects"
ON business_projects FOR DELETE
TO public
USING (auth.uid() = business_id);

-- Business Quotes Policies
CREATE POLICY "Business users and quote senders can view quotes"
ON business_quotes FOR SELECT
TO public
USING (
  auth.uid() = business_id OR
  auth.uid() = tradesperson_id
);

CREATE POLICY "Tradespeople can create quotes"
ON business_quotes FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Business users can update quote status"
ON business_quotes FOR UPDATE
TO public
USING (auth.uid() = business_id);

-- Business Messages Policies
CREATE POLICY "Users can view their own messages"
ON business_messages FOR SELECT
TO public
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
ON business_messages FOR INSERT
TO public
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update messages they received"
ON business_messages FOR UPDATE
TO public
USING (auth.uid() = receiver_id);

-- Business Reviews Policies
CREATE POLICY "Anyone can view reviews"
ON business_reviews FOR SELECT
TO public
USING (true);

CREATE POLICY "Business users can create reviews"
ON business_reviews FOR INSERT
TO public
WITH CHECK (auth.uid() = business_id);

CREATE POLICY "Business users can update their own reviews"
ON business_reviews FOR UPDATE
TO public
USING (auth.uid() = business_id);

-- ============================================
-- COMMENTS
-- ============================================
COMMENT ON TABLE business_profiles IS 'Business/company profiles for website registrations';
COMMENT ON TABLE business_projects IS 'Projects posted by businesses to hire tradespeople';
COMMENT ON TABLE business_quotes IS 'Quotes received by businesses from tradespeople';
COMMENT ON TABLE business_messages IS 'Messages between businesses and tradespeople';
COMMENT ON TABLE business_reviews IS 'Reviews left by businesses for tradespeople';

COMMENT ON COLUMN business_profiles.business_type IS 'One of 50 trade categories (plumbing, electrical, building, etc.)';
COMMENT ON COLUMN business_profiles.company_size IS 'Employee count range: 1-10, 11-50, 51-200, 201-500, 500+';
COMMENT ON COLUMN business_profiles.job_title IS 'User job title within the business';
COMMENT ON COLUMN business_profiles.marketing_consent IS 'Opted in to marketing communications';
