-- ============================================
-- FIX NOTIFICATION PREFERENCES TRIGGER
-- ============================================
-- Updates the trigger function to use fully qualified table name
-- and explicit search_path to fix "relation does not exist" error

-- Drop and recreate the function with explicit search_path
CREATE OR REPLACE FUNCTION public.create_default_notification_preferences()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
BEGIN
  -- Use fully qualified table name to avoid schema lookup issues
  INSERT INTO public.notification_preferences (
    user_id,
    push_enabled,
    email_enabled,
    quote_alerts,
    booking_reminders,
    message_notifications,
    job_updates,
    payment_notifications
  ) VALUES (
    NEW.id,
    true,
    true,
    true,
    true,
    true,
    true,
    true
  ) ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log warning but don't fail the user creation
    RAISE WARNING 'Failed to create notification preferences for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$function$;

-- Recreate the trigger (AFTER INSERT is correct)
DROP TRIGGER IF EXISTS create_notification_preferences_trigger ON auth.users;
CREATE TRIGGER create_notification_preferences_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.create_default_notification_preferences();

-- Verify the function was created
SELECT
  proname as function_name,
  prosrc as function_body
FROM pg_proc
WHERE proname = 'create_default_notification_preferences';
