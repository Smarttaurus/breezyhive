-- Check if job assignments exist
SELECT 
  eja.id,
  eja.job_id,
  eja.employee_id,
  eja.assigned_at,
  ej.title as job_title,
  ej.status as job_status,
  ee.first_name || ' ' || ee.last_name as employee_name,
  ee.email as employee_email
FROM enterprise_job_assignments eja
JOIN enterprise_jobs ej ON ej.id = eja.job_id
JOIN enterprise_employees ee ON ee.id = eja.employee_id
ORDER BY eja.assigned_at DESC
LIMIT 10;
