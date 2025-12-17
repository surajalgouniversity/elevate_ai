-- Migration to add Razorpay payment fields to applications table

ALTER TABLE applications ADD COLUMN IF NOT EXISTS razorpay_order_id text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS razorpay_payment_id text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS razorpay_signature text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS payment_completed_at timestamptz;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS failure_reason text;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_applications_razorpay_order_id ON applications(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_applications_razorpay_payment_id ON applications(razorpay_payment_id);
CREATE INDEX IF NOT EXISTS idx_applications_payment_status ON applications(payment_status);
