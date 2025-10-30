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

    console.log('Delete request from user:', user.id)

    // Get request body
    const { employeeId, userId } = await req.json()

    console.log('Deleting employee:', { employeeId, userId })

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
      throw new Error('You do not have permission to delete this employee')
    }

    console.log('Permission verified, proceeding with deletion')

    // 1. Delete the employee record (using service role, bypasses RLS)
    const { error: deleteEmployeeError } = await supabaseAdmin
      .from('enterprise_employees')
      .delete()
      .eq('id', employeeId)

    if (deleteEmployeeError) {
      console.error('Failed to delete employee record:', deleteEmployeeError)
      throw deleteEmployeeError
    }

    console.log('Employee record deleted')

    // 2. Delete the auth user
    const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (deleteAuthError) {
      console.error('Failed to delete auth user:', deleteAuthError)
      // Continue anyway - employee record is already deleted
    }

    console.log('Auth user deleted successfully')

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Employee deleted successfully'
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
        error: error.message || 'Failed to delete employee',
        details: error.toString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
