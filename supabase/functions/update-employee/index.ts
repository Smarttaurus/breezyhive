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

    console.log('Update request from user:', user.id)

    // Get request body
    const {
      employeeId,
      firstName,
      lastName,
      phone,
      role,
      employmentType,
      hourlyRate,
      hireDate,
      canCreateJobs,
      canViewAllJobs,
      canApproveExpenses,
      isActive,
    } = await req.json()

    console.log('Updating employee:', employeeId)

    // Get the employee to verify ownership
    const { data: employee, error: employeeError } = await supabaseAdmin
      .from('enterprise_employees')
      .select('enterprise_id, enterprises!inner(tradesperson_id)')
      .eq('id', employeeId)
      .single()

    if (employeeError || !employee) {
      throw new Error('Employee not found')
    }

    // Verify that the requesting user owns this enterprise
    if (employee.enterprises.tradesperson_id !== user.id) {
      throw new Error('You do not have permission to update this employee')
    }

    console.log('Permission verified, proceeding with update')

    // Update the employee record (using service role, bypasses RLS)
    const { data: updatedEmployee, error: updateError } = await supabaseAdmin
      .from('enterprise_employees')
      .update({
        first_name: firstName,
        last_name: lastName,
        phone: phone || null,
        role: role,
        employment_type: employmentType,
        hourly_rate: hourlyRate,
        hire_date: hireDate,
        can_create_jobs: canCreateJobs,
        can_view_all_jobs: canViewAllJobs,
        can_approve_expenses: canApproveExpenses,
        is_active: isActive,
      })
      .eq('id', employeeId)
      .select()
      .single()

    if (updateError) {
      console.error('Failed to update employee:', updateError)
      throw updateError
    }

    console.log('Employee updated successfully')

    return new Response(
      JSON.stringify({
        success: true,
        employee: updatedEmployee,
        message: 'Employee updated successfully'
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
        error: error.message || 'Failed to update employee',
        details: error.toString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
