-- ============================================
-- ADD STRIPE SUBSCRIPTION COLUMNS TO ENTERPRISES TABLE
-- ============================================
-- Adds columns needed for Stripe subscription management in website

-- Add Stripe-related columns to enterprises table
ALTER TABLE enterprises
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT,
ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS canceled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS last_payment_at TIMESTAMP WITH TIME ZONE;

-- Add indexes for Stripe lookups
CREATE INDEX IF NOT EXISTS idx_enterprises_stripe_customer_id
ON enterprises(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_enterprises_stripe_subscription_id
ON enterprises(stripe_subscription_id);

CREATE INDEX IF NOT EXISTS idx_enterprises_subscription_status
ON enterprises(subscription_status);

-- Add comments
COMMENT ON COLUMN enterprises.stripe_customer_id IS 'Stripe customer ID for billing';
COMMENT ON COLUMN enterprises.stripe_subscription_id IS 'Stripe subscription ID';
COMMENT ON COLUMN enterprises.subscription_status IS 'Current subscription status: trialing, active, past_due, canceled, incomplete';
COMMENT ON COLUMN enterprises.trial_ends_at IS '14-day trial end date';
COMMENT ON COLUMN enterprises.canceled_at IS 'Date when subscription was canceled';
COMMENT ON COLUMN enterprises.last_payment_at IS 'Last successful payment date';

-- Add check constraint for subscription_status
ALTER TABLE enterprises
ADD CONSTRAINT check_subscription_status
CHECK (subscription_status IS NULL OR subscription_status IN (
  'trialing',
  'active',
  'past_due',
  'canceled',
  'incomplete'
));
