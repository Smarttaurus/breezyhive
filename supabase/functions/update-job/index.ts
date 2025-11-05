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

    console.log('Update job request from user:', user.id)

    // Get request body
    const {
      jobId,
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

    console.log('Updating job:', { jobId, title, enterpriseId })

    // Verify that the requesting user owns this enterprise and job
    const { data: enterprise, error: enterpriseError } = await supabaseAdmin
      .from('enterprises')
      .select('id, tradesperson_id')
      .eq('id', enterpriseId)
      .eq('tradesperson_id', user.id)
      .single()

    if (enterpriseError || !enterprise) {
      throw new Error('You do not have permission to update jobs for this enterprise')
    }

    console.log('Enterprise verified:', enterprise.id)

    // Verify job belongs to this enterprise
    const { data: existingJob, error: jobCheckError } = await supabaseAdmin
      .from('enterprise_jobs')
      .select('id')
      .eq('id', jobId)
      .eq('enterprise_id', enterpriseId)
      .single()

    if (jobCheckError || !existingJob) {
      throw new Error('Job not found or does not belong to this enterprise')
    }

    // 1. Update the job
    console.log('Updating job with data:', {
      job_id: jobId,
      title,
      status,
      priority,
    })

    const { data: job, error: jobError } = await supabaseAdmin
      .from('enterprise_jobs')
      .update({
        title: title,
        description: description,
        location: location,
        status: status,
        priority: priority,
        due_date: dueDate,
        estimated_hours: estimatedHours,
        budget: budget,
        notes: notes,
        updated_at: new Date().toISOString(),
      })
      .eq('id', jobId)
      .eq('enterprise_id', enterpriseId)
      .select()
      .single()

    if (jobError) {
      console.error('Job update failed:', jobError)
      throw new Error(`Failed to update job: ${jobError.message || jobError.code}`)
    }

    if (!job) {
      throw new Error('Job was not updated - no data returned')
    }

    console.log('Job updated successfully:', job.id)

    // 2. Update job assignments
    // First, delete existing assignments
    const { error: deleteError } = await supabaseAdmin
      .from('enterprise_job_assignments')
      .delete()
      .eq('job_id', jobId)

    if (deleteError) {
      console.error('Failed to delete existing assignments:', deleteError)
      // Continue anyway
    }

    // Then, create new assignments
    if (assignedEmployees && assignedEmployees.length > 0) {
      const assignments = assignedEmployees.map((employeeId: string) => ({
        job_id: job.id,
        employee_id: employeeId,
        assigned_at: new Date().toISOString(),
      }))

      const { error: assignmentError } = await supabaseAdmin
        .from('enterprise_job_assignments')
        .insert(assignments)

      if (assignmentError) {
        console.error('Assignment creation failed:', assignmentError)
        // Don't throw - job is updated, assignments can be fixed later
      } else {
        console.log(`Assigned job to ${assignedEmployees.length} employees`)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        job: job,
        message: 'Job updated successfully'
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
        error: error.message || 'Failed to update job',
        details: error.toString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
