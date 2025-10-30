import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create TWO separate Supabase clients:
    // 1. Admin client with SERVICE ROLE key (bypasses RLS)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // 2. User client to verify the requester (uses their token)
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')

    const supabaseUser = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader }
        }
      }
    )

    const { data: { user }, error: userError } = await supabaseUser.auth.getUser()

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    console.log('Request from user:', user.id)
    console.log('Using service role key:', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?.substring(0, 10) + '...')

    // Get request body
    const {
      enterpriseId,
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
      employmentType,
      hourlyRate,
      hireDate,
      canCreateJobs,
      canViewAllJobs,
      canApproveExpenses,
    } = await req.json()

    console.log('Creating employee:', { firstName, lastName, email })

    // Verify that the requesting user owns this enterprise
    const { data: enterprise, error: enterpriseError } = await supabaseAdmin
      .from('enterprises')
      .select('id, tradesperson_id')
      .eq('id', enterpriseId)
      .eq('tradesperson_id', user.id)
      .single()

    if (enterpriseError || !enterprise) {
      throw new Error('You do not have permission to add employees to this enterprise')
    }

    console.log('Enterprise verified:', enterprise.id)

    // 1. Create auth user for the employee
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        user_type: 'enterprise_employee',
      }
    })

    if (authError) {
      console.error('Auth creation failed:', authError)
      throw authError
    }

    if (!authData.user) {
      throw new Error('Failed to create user')
    }

    console.log('Auth user created:', authData.user.id)

    // 2. Create employee record (using service role, bypasses RLS)
    const { data: employee, error: employeeError } = await supabaseAdmin
      .from('enterprise_employees')
      .insert({
        enterprise_id: enterpriseId,
        user_id: authData.user.id,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone || null,
        role: role || 'employee',
        employment_type: employmentType || 'full_time',
        hourly_rate: hourlyRate ? parseFloat(hourlyRate) : null,
        hire_date: hireDate,
        can_create_jobs: canCreateJobs || false,
        can_view_all_jobs: canViewAllJobs || false,
        can_approve_expenses: canApproveExpenses || false,
        is_active: true,
      })
      .select()
      .single()

    if (employeeError) {
      console.error('Employee record creation failed:', employeeError)
      // Try to clean up the auth user
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      throw employeeError
    }

    console.log('Employee created successfully:', employee.id)

    return new Response(
      JSON.stringify({
        success: true,
        employee,
        message: 'Employee created successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error: any) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to create employee',
        details: error.toString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
