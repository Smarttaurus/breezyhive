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
    // Create TWO separate Supabase clients
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

    const authHeader = req.headers.get('Authorization')!
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

    console.log('Create job request from user:', user.id)

    // Get request body
    const {
      enterpriseId,
      title,
      description,
      location,
      status,
      priority,
      dueDate,
      estimatedHours,
      budget,
      notes,
      assignedEmployees,
    } = await req.json()

    console.log('Creating job:', { title, enterpriseId })

    // Verify that the requesting user owns this enterprise
    const { data: enterprise, error: enterpriseError } = await supabaseAdmin
      .from('enterprises')
      .select('id, tradesperson_id')
      .eq('id', enterpriseId)
      .eq('tradesperson_id', user.id)
      .single()

    if (enterpriseError || !enterprise) {
      throw new Error('You do not have permission to create jobs for this enterprise')
    }

    console.log('Enterprise verified:', enterprise.id)

    // 1. Create the job
    const { data: job, error: jobError } = await supabaseAdmin
      .from('jobs')
      .insert({
        customer_id: user.id, // Using user as customer for now
        title: title,
        description: description,
        location_address: location,
        status: status || 'pending',
        urgency: priority || 'medium',
        start_date: dueDate,
        expected_duration: estimatedHours ? `${estimatedHours} hours` : null,
        budget_min: budget ? parseFloat(budget) : null,
        budget_max: budget ? parseFloat(budget) : null,
      })
      .select()
      .single()

    if (jobError) {
      console.error('Job creation failed:', jobError)
      throw jobError
    }

    console.log('Job created:', job.id)

    // 2. Create job assignments for selected employees
    if (assignedEmployees && assignedEmployees.length > 0) {
      const assignments = assignedEmployees.map((employeeId: string) => ({
        job_id: job.id,
        employee_id: employeeId,
        assigned_at: new Date().toISOString(),
      }))

      const { error: assignmentError } = await supabaseAdmin
        .from('job_assignments')
        .insert(assignments)

      if (assignmentError) {
        console.error('Assignment creation failed:', assignmentError)
        // Don't throw - job is created, assignments can be added later
      } else {
        console.log(`Assigned job to ${assignedEmployees.length} employees`)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        job: job,
        message: 'Job created successfully'
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
        error: error.message || 'Failed to create job',
        details: error.toString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
