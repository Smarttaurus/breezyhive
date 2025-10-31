-- =====================================================
-- ENTERPRISE JOBS SYSTEM - COMPLETE SETUP
-- =====================================================

-- 1. Create enterprise_jobs table
CREATE TABLE IF NOT EXISTS public.enterprise_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enterprise_id UUID NOT NULL REFERENCES public.enterprises(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    due_date DATE NOT NULL,
    estimated_hours NUMERIC(10,2),
    budget NUMERIC(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create enterprise_job_assignments table (many-to-many: jobs <-> employees)
CREATE TABLE IF NOT EXISTS public.enterprise_job_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES public.enterprise_jobs(id) ON DELETE CASCADE,
    employee_id UUID NOT NULL REFERENCES public.enterprise_employees(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    UNIQUE(job_id, employee_id)
);

-- 3. Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_enterprise_jobs_enterprise_id ON public.enterprise_jobs(enterprise_id);
CREATE INDEX IF NOT EXISTS idx_enterprise_jobs_status ON public.enterprise_jobs(status);
CREATE INDEX IF NOT EXISTS idx_enterprise_jobs_due_date ON public.enterprise_jobs(due_date);
CREATE INDEX IF NOT EXISTS idx_enterprise_job_assignments_job_id ON public.enterprise_job_assignments(job_id);
CREATE INDEX IF NOT EXISTS idx_enterprise_job_assignments_employee_id ON public.enterprise_job_assignments(employee_id);

-- 4. Add updated_at trigger for enterprise_jobs
CREATE OR REPLACE FUNCTION update_enterprise_jobs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_enterprise_jobs_updated_at ON public.enterprise_jobs;
CREATE TRIGGER trigger_update_enterprise_jobs_updated_at
    BEFORE UPDATE ON public.enterprise_jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_enterprise_jobs_updated_at();

-- 5. Enable Row Level Security
ALTER TABLE public.enterprise_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enterprise_job_assignments ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies for enterprise_jobs

-- Enterprises can view their own jobs
DROP POLICY IF EXISTS "Enterprises can view own jobs" ON public.enterprise_jobs;
CREATE POLICY "Enterprises can view own jobs" ON public.enterprise_jobs
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.enterprises
            WHERE enterprises.id = enterprise_jobs.enterprise_id
            AND enterprises.tradesperson_id = auth.uid()
        )
    );

-- Enterprises can insert their own jobs
DROP POLICY IF EXISTS "Enterprises can insert own jobs" ON public.enterprise_jobs;
CREATE POLICY "Enterprises can insert own jobs" ON public.enterprise_jobs
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.enterprises
            WHERE enterprises.id = enterprise_jobs.enterprise_id
            AND enterprises.tradesperson_id = auth.uid()
        )
    );

-- Enterprises can update their own jobs
DROP POLICY IF EXISTS "Enterprises can update own jobs" ON public.enterprise_jobs;
CREATE POLICY "Enterprises can update own jobs" ON public.enterprise_jobs
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.enterprises
            WHERE enterprises.id = enterprise_jobs.enterprise_id
            AND enterprises.tradesperson_id = auth.uid()
        )
    );

-- Enterprises can delete their own jobs
DROP POLICY IF EXISTS "Enterprises can delete own jobs" ON public.enterprise_jobs;
CREATE POLICY "Enterprises can delete own jobs" ON public.enterprise_jobs
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.enterprises
            WHERE enterprises.id = enterprise_jobs.enterprise_id
            AND enterprises.tradesperson_id = auth.uid()
        )
    );

-- Employees can view jobs assigned to them
DROP POLICY IF EXISTS "Employees can view assigned jobs" ON public.enterprise_jobs;
CREATE POLICY "Employees can view assigned jobs" ON public.enterprise_jobs
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.enterprise_job_assignments
            JOIN public.enterprise_employees ON enterprise_employees.id = enterprise_job_assignments.employee_id
            WHERE enterprise_job_assignments.job_id = enterprise_jobs.id
            AND enterprise_employees.user_id = auth.uid()
        )
    );

-- 7. RLS Policies for enterprise_job_assignments

-- Enterprises can view assignments for their jobs
DROP POLICY IF EXISTS "Enterprises can view own job assignments" ON public.enterprise_job_assignments;
CREATE POLICY "Enterprises can view own job assignments" ON public.enterprise_job_assignments
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.enterprise_jobs
            JOIN public.enterprises ON enterprises.id = enterprise_jobs.enterprise_id
            WHERE enterprise_jobs.id = enterprise_job_assignments.job_id
            AND enterprises.tradesperson_id = auth.uid()
        )
    );

-- Enterprises can create assignments for their jobs
DROP POLICY IF EXISTS "Enterprises can create job assignments" ON public.enterprise_job_assignments;
CREATE POLICY "Enterprises can create job assignments" ON public.enterprise_job_assignments
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.enterprise_jobs
            JOIN public.enterprises ON enterprises.id = enterprise_jobs.enterprise_id
            WHERE enterprise_jobs.id = enterprise_job_assignments.job_id
            AND enterprises.tradesperson_id = auth.uid()
        )
    );

-- Enterprises can update assignments for their jobs
DROP POLICY IF EXISTS "Enterprises can update job assignments" ON public.enterprise_job_assignments;
CREATE POLICY "Enterprises can update job assignments" ON public.enterprise_job_assignments
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.enterprise_jobs
            JOIN public.enterprises ON enterprises.id = enterprise_jobs.enterprise_id
            WHERE enterprise_jobs.id = enterprise_job_assignments.job_id
            AND enterprises.tradesperson_id = auth.uid()
        )
    );

-- Enterprises can delete assignments for their jobs
DROP POLICY IF EXISTS "Enterprises can delete job assignments" ON public.enterprise_job_assignments;
CREATE POLICY "Enterprises can delete job assignments" ON public.enterprise_job_assignments
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.enterprise_jobs
            JOIN public.enterprises ON enterprises.id = enterprise_jobs.enterprise_id
            WHERE enterprise_jobs.id = enterprise_job_assignments.job_id
            AND enterprises.tradesperson_id = auth.uid()
        )
    );

-- Employees can view their own assignments
DROP POLICY IF EXISTS "Employees can view own assignments" ON public.enterprise_job_assignments;
CREATE POLICY "Employees can view own assignments" ON public.enterprise_job_assignments
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.enterprise_employees
            WHERE enterprise_employees.id = enterprise_job_assignments.employee_id
            AND enterprise_employees.user_id = auth.uid()
        )
    );

-- 8. Grant permissions
GRANT ALL ON public.enterprise_jobs TO authenticated;
GRANT ALL ON public.enterprise_job_assignments TO authenticated;

-- =====================================================
-- VERIFICATION QUERIES (Run these to verify setup)
-- =====================================================

-- Check if tables exist
SELECT
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
AND table_name IN ('enterprise_jobs', 'enterprise_job_assignments')
ORDER BY table_name;

-- Check RLS is enabled
SELECT
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('enterprise_jobs', 'enterprise_job_assignments');

-- Check policies
SELECT
    tablename,
    policyname,
    cmd as command
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('enterprise_jobs', 'enterprise_job_assignments')
ORDER BY tablename, policyname;
