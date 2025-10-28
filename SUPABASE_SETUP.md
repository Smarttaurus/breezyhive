# Supabase Setup for BreezyHive Website

## ✅ What's Been Installed

- **@supabase/supabase-js** - Supabase client library
- **Supabase client configuration** (`src/lib/supabase.ts`)
- **Auth service** (`src/services/authService.ts`) - Registration, login, logout
- **Type definitions** (`src/types/database.types.ts`) - Database types placeholder
- **Environment file** (`.env.local`) - Supabase credentials

## 📋 What You Need to Provide

### 1. Supabase Credentials

Update `.env.local` with your Supabase project credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Database Schema

Please provide the complete database schema including:

#### Tables
- Table names
- Column names and types
- Primary keys
- Foreign keys
- Constraints
- Indexes

Example format:
```sql
CREATE TABLE business_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  company_size TEXT NOT NULL,
  address TEXT,
  city TEXT,
  postcode TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  job_title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Functions
- Function names
- Parameters
- Return types
- Function bodies

Example format:
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

#### Triggers
- Trigger names
- Which tables they're on
- When they fire (BEFORE/AFTER INSERT/UPDATE/DELETE)

Example format:
```sql
CREATE TRIGGER update_business_profiles_updated_at
BEFORE UPDATE ON business_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

#### Row Level Security (RLS) Policies
- Which tables have RLS enabled
- Policy names and conditions

Example format:
```sql
ALTER TABLE business_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON business_profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON business_profiles FOR UPDATE
USING (auth.uid() = user_id);
```

## 🔧 Current Implementation

### Auth Service (`src/services/authService.ts`)

The following methods are ready:

- `registerBusiness(data)` - Creates auth user + business profile (TODO: uncomment when schema is ready)
- `signIn(email, password)` - Authenticates existing user
- `signOut()` - Logs out current user
- `getSession()` - Gets current session
- `getUser()` - Gets current user data

### Registration Form (`src/app/business/register/page.tsx`)

The form collects:
- Business Name
- Business Type (50 categories)
- Company Size
- Address, City, Postcode
- First Name, Last Name
- Email, Phone
- Job Title
- Password

**Current Status**: Form validation works, but submission just logs to console (line 146-151).

Once you provide the schema, I will:
1. Update `database.types.ts` with proper TypeScript types
2. Uncomment the profile creation code in `authService.ts`
3. Connect the registration form to actually create users in Supabase
4. Add proper error handling and success redirects

## 🚀 Next Steps

1. **You provide**: Complete database schema (tables, columns, functions, triggers)
2. **I implement**:
   - TypeScript types matching the schema
   - Business profile creation in database
   - Login/register integration
   - Error handling and validation
   - Success redirects

## 📝 Notes

- `.env.local` is already in `.gitignore` - credentials won't be committed
- The same Supabase project can be used for both website and mobile app
- Auth service is ready to work with Supabase Auth
- Form data structure matches common enterprise registration patterns
