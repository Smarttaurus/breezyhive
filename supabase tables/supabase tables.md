[
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "column_name": "admin_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "column_name": "action",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "column_name": "target_tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "column_name": "document_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "column_name": "details",
    "data_type": "jsonb",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "column_name": "ip_address",
    "data_type": "inet",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_users",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_users",
    "column_name": "user_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_users",
    "column_name": "role",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'admin'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_users",
    "column_name": "permissions",
    "data_type": "jsonb",
    "is_nullable": "YES",
    "column_default": "'{\"manage_admins\": false, \"view_analytics\": true, \"verify_documents\": true}'::jsonb",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_users",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_users",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "booking_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "created_by",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "dispute_type",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "reason",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "details",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": "'pending_admin_review'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "admin_notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "resolved_by",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "customer_refund_amount",
    "data_type": "numeric",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "tradesperson_compensation_amount",
    "data_type": "numeric",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "platform_fee_amount",
    "data_type": "numeric",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "resolved_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "customer_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "title",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "description",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "location_address",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "scheduled_date",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "scheduled_end_date",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "actual_start_date",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "actual_completion_date",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "agreed_price",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "price_type",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'fixed'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "deposit_amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "deposit_paid",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'scheduled'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "completion_notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "completion_images",
    "data_type": "text[]",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "payment_status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'pending'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "cancelled_by",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "User ID who cancelled the booking (customer or tradesperson)"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "cancellation_reason",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Reason provided for cancellation"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "cancelled_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Timestamp when booking was cancelled"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "completed_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Timestamp when booking status changed to completed (triggers 7-day holding period)"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "stripe_payment_intent_id",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Stripe Payment Intent ID - funds held on platform account until job completes + 7 days"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "quote_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Reference to the accepted quote that led to this booking"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "column_name": "cancellation_type",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "change_order_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "booking_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "hours_worked",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": "Total hours (auto-calculated + manual adjustment)"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "hourly_rate",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "total_amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "work_description",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "clock_entries_ids",
    "data_type": "uuid[]",
    "is_nullable": "YES",
    "column_default": "'{}'::uuid[]",
    "column_description": "Array of time_clock_entry IDs used for this invoice"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "auto_calculated_hours",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": "0",
    "column_description": "Hours calculated from completed clock entries"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "manual_adjustment_hours",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": "Manual hours adjustment (can be positive or negative)"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "adjustment_reason",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Required explanation if manual_adjustment_hours != 0"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "status",
    "data_type": "character varying(20)",
    "is_nullable": "NO",
    "column_default": "'draft'::character varying",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "submitted_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "approved_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "rejected_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "paid_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "customer_notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "quote_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "title",
    "data_type": "character varying(200)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "description",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "reason",
    "data_type": "character varying(50)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "additional_amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "evidence_urls",
    "data_type": "text[]",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "status",
    "data_type": "character varying(50)",
    "is_nullable": "YES",
    "column_default": "'pending'::character varying",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "customer_response",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "responded_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "approved_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "rejected_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "completed_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "column_name": "booking_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "The booking this change order is associated with"
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "column_name": "id",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "column_name": "participant1_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "column_name": "participant2_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "column_name": "encryption_key",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "column_name": "last_message",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "column_name": "last_message_time",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "column_name": "user_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "column_name": "first_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "column_name": "last_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "column_name": "phone",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "column_name": "address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "column_name": "avatar",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "column_name": "location",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "column_name": "country",
    "data_type": "character varying(2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "ISO 3166-1 alpha-2 country code (e.g., AU, GB, US)"
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "column_name": "country_code",
    "data_type": "character varying(2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "column_name": "country_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "column_name": "identity_documents",
    "data_type": "text[]",
    "is_nullable": "NO",
    "column_default": "ARRAY['passport'::text, 'drivers_license'::text, 'national_id'::text]",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "column_name": "address_documents",
    "data_type": "text[]",
    "is_nullable": "NO",
    "column_default": "ARRAY['utility_bill'::text, 'bank_statement'::text, 'lease_agreement'::text]",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "column_name": "business_documents",
    "data_type": "text[]",
    "is_nullable": "NO",
    "column_default": "ARRAY['business_registration'::text, 'liability_insurance'::text, 'trade_license'::text]",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "column_name": "trade_requirements",
    "data_type": "jsonb",
    "is_nullable": "YES",
    "column_default": "'{}'::jsonb",
    "column_description": "JSON object mapping trades to required certificates"
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "column_name": "special_requirements",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "column_name": "insurance_minimum_coverage",
    "data_type": "numeric(12,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "employee_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "enterprise_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "fuel_date",
    "data_type": "date",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "station_name",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "fuel_type",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "latitude",
    "data_type": "numeric(10,8)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "longitude",
    "data_type": "numeric(11,8)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "litres",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "price_per_litre",
    "data_type": "numeric(10,3)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "total_amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "currency",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'GBP'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "vehicle_registration",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "odometer_reading",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "receipt_photo_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'pending'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "approved_by",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "approved_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "rejection_reason",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "reimbursed_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "column_name": "employee_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "column_name": "enterprise_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "column_name": "latitude",
    "data_type": "numeric(10,8)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "column_name": "longitude",
    "data_type": "numeric(11,8)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "column_name": "accuracy",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "column_name": "altitude",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "column_name": "speed",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "column_name": "heading",
    "data_type": "numeric(5,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "column_name": "timestamp",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "column_name": "battery_level",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "employee_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "enterprise_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "supplier_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "purchase_date",
    "data_type": "date",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "description",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "category",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "quantity",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "unit",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "currency",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'GBP'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "tax_amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "receipt_photo_urls",
    "data_type": "text[]",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "invoice_number",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'pending'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "approved_by",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "approved_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "rejection_reason",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "reimbursed_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "employee_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "enterprise_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "clock_in_time",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "clock_in_latitude",
    "data_type": "numeric(10,8)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "clock_in_longitude",
    "data_type": "numeric(11,8)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "clock_in_address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "clock_in_photo_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "clock_in_notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "clock_out_time",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "clock_out_latitude",
    "data_type": "numeric(10,8)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "clock_out_longitude",
    "data_type": "numeric(11,8)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "clock_out_address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "clock_out_photo_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "clock_out_notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "total_hours",
    "data_type": "numeric(5,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "break_duration_minutes",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'clocked_in'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "approved_by",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "approved_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "enterprise_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "user_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "employee_number",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "first_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "last_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "phone",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "role",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": "'employee'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "avatar_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "hire_date",
    "data_type": "date",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "employment_type",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'full_time'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "hourly_rate",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "can_create_jobs",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "can_view_all_jobs",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "can_approve_expenses",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "is_active",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "last_active_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "column_name": "enterprise_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "column_name": "assigned_employee_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "column_name": "assigned_by",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "column_name": "assigned_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "column_name": "internal_job_number",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "column_name": "priority",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'normal'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "column_name": "estimated_hours",
    "data_type": "numeric(5,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "column_name": "employee_status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'assigned'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "column_name": "employee_notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "business_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "business_registration_number",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "phone",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "logo_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "industry",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "country",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": "'GB'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "timezone",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'Europe/London'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "settings",
    "data_type": "jsonb",
    "is_nullable": "YES",
    "column_default": "'{}'::jsonb",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "is_active",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "quote_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "change_order_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "milestone_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "pool_type",
    "data_type": "character varying(50)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "platform_fee",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "tradesperson_amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "status",
    "data_type": "character varying(50)",
    "is_nullable": "YES",
    "column_default": "'pending'::character varying",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "payment_intent_id",
    "data_type": "character varying(255)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "held_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "released_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "refunded_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "quote_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "hours_worked",
    "data_type": "numeric(5,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "hourly_rate",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "total_amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "work_description",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "clock_entries_ids",
    "data_type": "uuid[]",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "auto_calculated_hours",
    "data_type": "numeric(5,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "manual_adjustment_hours",
    "data_type": "numeric(5,2)",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "adjustment_reason",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "status",
    "data_type": "character varying(50)",
    "is_nullable": "YES",
    "column_default": "'draft'::character varying",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "submitted_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "approved_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "rejected_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "paid_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "customer_notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "column_name": "message",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "column_name": "proposed_price",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'pending'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "column_name": "estimated_days",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "column_name": "proposed_start_date",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "When the tradesperson proposes they can start the job - shown to customer before payment"
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "column_name": "name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "column_name": "slug",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "column_name": "icon",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "column_name": "description",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "column_name": "parent_category_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "column_name": "display_order",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "column_name": "is_active",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "column_name": "enterprise_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "column_name": "employee_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "column_name": "photo_url",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "column_name": "photo_type",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "column_name": "description",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "column_name": "latitude",
    "data_type": "numeric(10,8)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "column_name": "longitude",
    "data_type": "numeric(11,8)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "column_name": "taken_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "column_name": "is_shared_with_customer",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "column_name": "tags",
    "data_type": "text[]",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "customer_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "title",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "description",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "trade_required",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "budget_min",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "budget_max",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "location",
    "data_type": "jsonb",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'open'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "category",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "subcategory",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "location_address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Full formatted address string built from individual address components"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "location_latitude",
    "data_type": "numeric(10,8)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "location_longitude",
    "data_type": "numeric(11,8)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "postcode",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "budget_type",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'project'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "urgency",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'medium'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "start_date",
    "data_type": "date",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "expected_duration",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "completion_date",
    "data_type": "date",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "images",
    "data_type": "text[]",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "documents",
    "data_type": "text[]",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "is_featured",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "views_count",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "applications_count",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "assigned_tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "published_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "expires_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "closed_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "street_address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Street address including house number (e.g., 123 High Street)"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "city",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "City or town name (required for job posting)"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "state_county",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "State, county, or region (e.g., Greater London, California)"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "country",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Country name, defaults to United Kingdom"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "payment_preference_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Payment method selected for this job"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "total_paid",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": "Total paid including change orders (GBP)"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "column_name": "escrow_held",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": "Total currently in escrow (GBP)"
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "column_name": "user_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "column_name": "ip_address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "column_name": "user_agent",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "column_name": "device_name",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "column_name": "device_type",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "column_name": "location",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "column_name": "success",
    "data_type": "boolean",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "column_name": "method",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'password'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "column_name": "mfa_used",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "column_name": "error_message",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "conversation_id",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "sender_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "recipient_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "booking_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "content",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "message_type",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'text'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "attachments",
    "data_type": "text[]",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "read",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "read_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "encrypted_content",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "column_name": "iv",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "quote_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "sequence_number",
    "data_type": "integer",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "title",
    "data_type": "character varying(200)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "description",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "status",
    "data_type": "character varying(50)",
    "is_nullable": "YES",
    "column_default": "'pending'::character varying",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "funded_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "started_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "submitted_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "approved_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "rejected_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "completed_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "evidence_urls",
    "data_type": "text[]",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "completion_notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "rejection_reason",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "column_name": "user_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "column_name": "type",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "column_name": "channel",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "column_name": "title",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "column_name": "body",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "column_name": "related_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'pending'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "column_name": "error_message",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "column_name": "sent_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "column_name": "user_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "column_name": "push_enabled",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "column_name": "email_enabled",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "column_name": "quote_alerts",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "column_name": "booking_reminders",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "column_name": "message_notifications",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "column_name": "job_updates",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "column_name": "payment_notifications",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "column_name": "push_token",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "column_name": "user_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "column_name": "title",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "column_name": "message",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "column_name": "type",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "column_name": "booking_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "column_name": "application_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "column_name": "action_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "column_name": "read",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "column_name": "read_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "column_name": "payment_type",
    "data_type": "character varying(50)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "column_name": "max_change_order_percentage",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "column_name": "require_photo_evidence",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "column_name": "milestone_count",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "column_name": "hourly_rate",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "column_name": "estimated_hours_min",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "column_name": "estimated_hours_max",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "quote_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "customer_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "platform_fee",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "tradesperson_amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'pending'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "stripe_payment_intent_id",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "paid_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "release_date",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "released_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "column_name": "currency",
    "data_type": "character varying(3)",
    "is_nullable": "NO",
    "column_default": "'GBP'::character varying",
    "column_description": "ISO 4217 currency code (3-letter uppercase) for the payment amount"
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "column_name": "wallet_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "column_name": "amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "column_name": "currency",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": "'GBP'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'pending'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "column_name": "stripe_payout_id",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "column_name": "destination_type",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "column_name": "destination_details",
    "data_type": "jsonb",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "column_name": "failure_reason",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "column_name": "estimated_arrival_date",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "title",
    "data_type": "character varying(100)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "description",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "trade",
    "data_type": "character varying(50)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "images",
    "data_type": "text[]",
    "is_nullable": "NO",
    "column_default": "'{}'::text[]",
    "column_description": "Array of image URLs from Supabase Storage"
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "location",
    "data_type": "character varying(200)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "completed_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "project_cost",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "project_duration_days",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "views_count",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "likes_count",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "is_featured",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": "Tradespeople can feature up to 5 items to show first"
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "is_visible",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_likes",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_likes",
    "column_name": "portfolio_item_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_likes",
    "column_name": "user_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_likes",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "application_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "customer_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "title",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "description",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "line_items",
    "data_type": "jsonb",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "subtotal",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "tax_amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "total_amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "valid_until",
    "data_type": "date",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "payment_terms",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "terms_and_conditions",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'draft'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "pdf_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "sent_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "viewed_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "responded_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "original_amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Original quote before change orders (GBP)"
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "current_amount",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Current amount with approved change orders (GBP)"
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "has_milestones",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "has_change_orders",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "column_name": "is_hourly",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "booking_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "reviewer_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "reviewee_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "rating",
    "data_type": "integer",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "title",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "comment",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "quality_rating",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "communication_rating",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "timeliness_rating",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "value_rating",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "images",
    "data_type": "text[]",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "response",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "responded_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "is_verified",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "saved_tradespeople",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "saved_tradespeople",
    "column_name": "customer_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "saved_tradespeople",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "saved_tradespeople",
    "column_name": "notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "saved_tradespeople",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "clock_in_time",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "clock_in_latitude",
    "data_type": "numeric(10,8)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "clock_in_longitude",
    "data_type": "numeric(11,8)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "clock_in_address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "clock_in_distance_from_job",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "clock_in_photo_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "clock_out_time",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "clock_out_latitude",
    "data_type": "numeric(10,8)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "clock_out_longitude",
    "data_type": "numeric(11,8)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "clock_out_address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "clock_out_distance_from_job",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "clock_out_photo_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "total_hours",
    "data_type": "numeric(5,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "is_active",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "true",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "clock_in_within_job_radius",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "clock_out_within_job_radius",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "flagged_for_review",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "review_notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "column_name": "type",
    "data_type": "character varying(50)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": "Type: message, quote_paid, quote_accepted, booking_confirmed, payment_received, change_order_requested, etc"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "column_name": "title",
    "data_type": "character varying(200)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "column_name": "message",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "column_name": "is_read",
    "data_type": "boolean",
    "is_nullable": "NO",
    "column_default": "false",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "column_name": "booking_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "column_name": "conversation_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "column_name": "action_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "column_name": "read_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "user_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "business_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "first_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "last_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "phone",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "trade",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "trades",
    "data_type": "text[]",
    "is_nullable": "YES",
    "column_default": "'{}'::text[]",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "bio",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "avatar",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "location",
    "data_type": "jsonb",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "certifications",
    "data_type": "text[]",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "years_of_experience",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "hourly_rate",
    "data_type": "numeric(10,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "availability",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "change_orders_created_count",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": "Total change orders created"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "change_orders_approved_count",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": "Total approved"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "change_orders_rejected_count",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": "Total rejected"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "flagged_clock_entries_count",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "abuse_warnings_count",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "account_flagged_for_review",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": "Flagged for manual review"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "country",
    "data_type": "character varying(2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "ISO 3166-1 alpha-2 country code (e.g., AU, GB, US)"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "verification_status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'incomplete'::text",
    "column_description": "Current verification status"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "documents_submitted_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "When documents were submitted for review"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "documents_verified_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "When admin verified the documents"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "column_name": "verification_notes",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Admin notes on verification decision"
  },
  {
    "schema_name": "public",
    "table_name": "trigger_debug_log",
    "column_name": "id",
    "data_type": "integer",
    "is_nullable": "NO",
    "column_default": "nextval('trigger_debug_log_id_seq'::regclass)",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "trigger_debug_log",
    "column_name": "step",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "trigger_debug_log",
    "column_name": "booking_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "trigger_debug_log",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "trigger_debug_log",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "trigger_debug_log",
    "column_name": "wallet_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "trigger_debug_log",
    "column_name": "transaction_count",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "trigger_debug_log",
    "column_name": "details",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "trigger_debug_log",
    "column_name": "executed_at",
    "data_type": "timestamp without time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "trigger_execution_log",
    "column_name": "id",
    "data_type": "integer",
    "is_nullable": "NO",
    "column_default": "nextval('trigger_execution_log_id_seq'::regclass)",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "trigger_execution_log",
    "column_name": "trigger_name",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "trigger_execution_log",
    "column_name": "booking_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "trigger_execution_log",
    "column_name": "old_status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "trigger_execution_log",
    "column_name": "new_status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "trigger_execution_log",
    "column_name": "executed_at",
    "data_type": "timestamp without time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "column_name": "user_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "column_name": "access_token",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "column_name": "ip_address",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "column_name": "user_agent",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "column_name": "device_name",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "column_name": "device_type",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "column_name": "last_active",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "column_name": "revoked_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "category",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": "Document category: identity, proof_of_address, or business"
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "document_type",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "file_url",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "file_name",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "file_size",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "mime_type",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'pending'::text",
    "column_description": "Verification status: pending, approved, or rejected"
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "verified_by",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "verified_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "rejection_reason",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "country_code",
    "data_type": "character varying(2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": "ISO 3166-1 alpha-2 country code"
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "expiry_date",
    "data_type": "date",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "metadata",
    "data_type": "jsonb",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "wallet_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "job_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "type",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'completed'::text",
    "column_description": "Transaction status: held_on_platform (funds on Stripe, job ongoing), pending (job done, awaiting 7 days), completed (transferred to tradesperson), cancelled"
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "amount",
    "data_type": "numeric(12,2)",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "description",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "reference",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "metadata",
    "data_type": "jsonb",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "available_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Timestamp when funds will be moved from pending to available (completed_at + 7 days)"
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "stripe_transfer_id",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": "Stripe Transfer ID when funds are transferred from platform to tradesperson after 7-day hold"
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "gross_amount",
    "data_type": "numeric(12,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "platform_fee",
    "data_type": "numeric(12,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "net_amount",
    "data_type": "numeric(12,2)",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "booking_id",
    "data_type": "uuid",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "column_name": "balance_after",
    "data_type": "numeric",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "uuid_generate_v4()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "column_name": "tradesperson_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "column_name": "total_balance",
    "data_type": "numeric(12,2)",
    "is_nullable": "NO",
    "column_default": "0.00",
    "column_description": "Total of all balances (locked + pending + available + frozen)"
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "column_name": "available_balance",
    "data_type": "numeric(12,2)",
    "is_nullable": "NO",
    "column_default": "0.00",
    "column_description": "Funds available for immediate withdrawal"
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "column_name": "frozen_balance",
    "data_type": "numeric(12,2)",
    "is_nullable": "NO",
    "column_default": "0.00",
    "column_description": "Funds frozen due to customer disputes/reports"
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "column_name": "pending_balance",
    "data_type": "numeric(12,2)",
    "is_nullable": "NO",
    "column_default": "0.00",
    "column_description": "Funds in 7-day holding period after job completion"
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "column_name": "currency",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": "'GBP'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "column_name": "stripe_account_id",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "column_name": "stripe_account_status",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'not_connected'::text",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "column_description": null
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "column_name": "locked_balance",
    "data_type": "numeric(12,2)",
    "is_nullable": "NO",
    "column_default": "0",
    "column_description": "Funds locked due to disputes, pending penalties, etc (in pence/cents)"
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "column_name": "has_outstanding_debt",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "column_description": null
  }
]
[
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "constraint_name": "admin_audit_log_action_check",
    "constraint_type": "CHECK",
    "columns": "{action}",
    "constraint_definition": "CHECK ((action = ANY (ARRAY['view_document'::text, 'approve_document'::text, 'reject_document'::text, 'approve_all'::text, 'reject_all'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "constraint_name": "admin_audit_log_admin_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{admin_id}",
    "constraint_definition": "FOREIGN KEY (admin_id) REFERENCES admin_users(user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "constraint_name": "admin_audit_log_document_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{document_id}",
    "constraint_definition": "FOREIGN KEY (document_id) REFERENCES verification_documents(id)"
  },
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "constraint_name": "admin_audit_log_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "constraint_name": "admin_audit_log_target_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{target_tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (target_tradesperson_id) REFERENCES tradesperson_profiles(user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "admin_users",
    "constraint_name": "admin_users_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "admin_users",
    "constraint_name": "admin_users_role_check",
    "constraint_type": "CHECK",
    "columns": "{role}",
    "constraint_definition": "CHECK ((role = ANY (ARRAY['admin'::text, 'super_admin'::text, 'support'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "admin_users",
    "constraint_name": "admin_users_user_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{user_id}",
    "constraint_definition": "FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "admin_users",
    "constraint_name": "admin_users_user_id_key",
    "constraint_type": "UNIQUE",
    "columns": "{user_id}",
    "constraint_definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "constraint_name": "booking_disputes_booking_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{booking_id}",
    "constraint_definition": "FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "constraint_name": "booking_disputes_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "constraint_name": "bookings_cancelled_by_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{cancelled_by}",
    "constraint_definition": "FOREIGN KEY (cancelled_by) REFERENCES auth.users(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "constraint_name": "bookings_customer_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{customer_id}",
    "constraint_definition": "FOREIGN KEY (customer_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "constraint_name": "bookings_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "constraint_name": "bookings_payment_status_check",
    "constraint_type": "CHECK",
    "columns": "{payment_status}",
    "constraint_definition": "CHECK ((payment_status = ANY (ARRAY['pending'::text, 'deposit_paid'::text, 'paid'::text, 'refunded'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "constraint_name": "bookings_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "constraint_name": "bookings_price_type_check",
    "constraint_type": "CHECK",
    "columns": "{price_type}",
    "constraint_definition": "CHECK ((price_type = ANY (ARRAY['fixed'::text, 'hourly'::text, 'daily'::text, 'project'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "constraint_name": "bookings_quote_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{quote_id}",
    "constraint_definition": "FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "constraint_name": "bookings_status_check",
    "constraint_type": "CHECK",
    "columns": "{status}",
    "constraint_definition": "CHECK ((status = ANY (ARRAY['scheduled'::text, 'confirmed'::text, 'in_progress'::text, 'completed'::text, 'cancelled'::text, 'disputed'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "constraint_name": "bookings_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (tradesperson_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "constraint_name": "change_order_invoices_booking_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{booking_id}",
    "constraint_definition": "FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "constraint_name": "change_order_invoices_change_order_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{change_order_id}",
    "constraint_definition": "FOREIGN KEY (change_order_id) REFERENCES change_orders(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "constraint_name": "change_order_invoices_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "constraint_name": "change_order_invoices_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "constraint_name": "change_order_invoices_status_check",
    "constraint_type": "CHECK",
    "columns": "{status}",
    "constraint_definition": "CHECK (((status)::text = ANY ((ARRAY['draft'::character varying, 'submitted'::character varying, 'approved'::character varying, 'rejected'::character varying, 'paid'::character varying])::text[])))"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "constraint_name": "change_order_invoices_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (tradesperson_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "constraint_name": "change_orders_additional_amount_check",
    "constraint_type": "CHECK",
    "columns": "{additional_amount}",
    "constraint_definition": "CHECK ((additional_amount > (0)::numeric))"
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "constraint_name": "change_orders_booking_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{booking_id}",
    "constraint_definition": "FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "constraint_name": "change_orders_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "constraint_name": "change_orders_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "constraint_name": "change_orders_quote_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{quote_id}",
    "constraint_definition": "FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "constraint_name": "change_orders_reason_check",
    "constraint_type": "CHECK",
    "columns": "{reason}",
    "constraint_definition": "CHECK (((reason)::text = ANY ((ARRAY['materials'::character varying, 'hidden_damage'::character varying, 'scope_change'::character varying, 'code_compliance'::character varying, 'other'::character varying])::text[])))"
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "constraint_name": "change_orders_status_check",
    "constraint_type": "CHECK",
    "columns": "{status}",
    "constraint_definition": "CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying, 'completed'::character varying])::text[])))"
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "constraint_name": "requires_evidence",
    "constraint_type": "CHECK",
    "columns": "{evidence_urls}",
    "constraint_definition": "CHECK (((evidence_urls IS NOT NULL) AND (array_length(evidence_urls, 1) >= 2)))"
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "constraint_name": "conversations_participant1_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{participant1_id}",
    "constraint_definition": "FOREIGN KEY (participant1_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "constraint_name": "conversations_participant2_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{participant2_id}",
    "constraint_definition": "FOREIGN KEY (participant2_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "constraint_name": "conversations_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "constraint_name": "customer_profiles_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "constraint_name": "customer_profiles_user_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{user_id}",
    "constraint_definition": "FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "constraint_name": "customer_profiles_user_id_key",
    "constraint_type": "UNIQUE",
    "columns": "{user_id}",
    "constraint_definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "constraint_name": "document_requirements_country_code_key",
    "constraint_type": "UNIQUE",
    "columns": "{country_code}",
    "constraint_definition": "UNIQUE (country_code)"
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "constraint_name": "document_requirements_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "constraint_name": "employee_fuel_entries_approved_by_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{approved_by}",
    "constraint_definition": "FOREIGN KEY (approved_by) REFERENCES enterprise_employees(id)"
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "constraint_name": "employee_fuel_entries_employee_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{employee_id}",
    "constraint_definition": "FOREIGN KEY (employee_id) REFERENCES enterprise_employees(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "constraint_name": "employee_fuel_entries_enterprise_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{enterprise_id}",
    "constraint_definition": "FOREIGN KEY (enterprise_id) REFERENCES enterprises(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "constraint_name": "employee_fuel_entries_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "constraint_name": "employee_fuel_entries_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "constraint_name": "employee_locations_employee_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{employee_id}",
    "constraint_definition": "FOREIGN KEY (employee_id) REFERENCES enterprise_employees(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "constraint_name": "employee_locations_enterprise_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{enterprise_id}",
    "constraint_definition": "FOREIGN KEY (enterprise_id) REFERENCES enterprises(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "constraint_name": "employee_locations_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "constraint_name": "employee_supplies_approved_by_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{approved_by}",
    "constraint_definition": "FOREIGN KEY (approved_by) REFERENCES enterprise_employees(id)"
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "constraint_name": "employee_supplies_employee_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{employee_id}",
    "constraint_definition": "FOREIGN KEY (employee_id) REFERENCES enterprise_employees(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "constraint_name": "employee_supplies_enterprise_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{enterprise_id}",
    "constraint_definition": "FOREIGN KEY (enterprise_id) REFERENCES enterprises(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "constraint_name": "employee_supplies_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "constraint_name": "employee_supplies_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "constraint_name": "employee_time_entries_approved_by_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{approved_by}",
    "constraint_definition": "FOREIGN KEY (approved_by) REFERENCES enterprise_employees(id)"
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "constraint_name": "employee_time_entries_employee_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{employee_id}",
    "constraint_definition": "FOREIGN KEY (employee_id) REFERENCES enterprise_employees(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "constraint_name": "employee_time_entries_enterprise_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{enterprise_id}",
    "constraint_definition": "FOREIGN KEY (enterprise_id) REFERENCES enterprises(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "constraint_name": "employee_time_entries_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "constraint_name": "employee_time_entries_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "constraint_name": "enterprise_employees_enterprise_id_email_key",
    "constraint_type": "UNIQUE",
    "columns": "{enterprise_id,email}",
    "constraint_definition": "UNIQUE (enterprise_id, email)"
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "constraint_name": "enterprise_employees_enterprise_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{enterprise_id}",
    "constraint_definition": "FOREIGN KEY (enterprise_id) REFERENCES enterprises(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "constraint_name": "enterprise_employees_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "constraint_name": "enterprise_employees_user_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{user_id}",
    "constraint_definition": "FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "constraint_name": "enterprise_employees_user_id_key",
    "constraint_type": "UNIQUE",
    "columns": "{user_id}",
    "constraint_definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "constraint_name": "enterprise_jobs_assigned_by_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{assigned_by}",
    "constraint_definition": "FOREIGN KEY (assigned_by) REFERENCES enterprise_employees(id)"
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "constraint_name": "enterprise_jobs_assigned_employee_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{assigned_employee_id}",
    "constraint_definition": "FOREIGN KEY (assigned_employee_id) REFERENCES enterprise_employees(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "constraint_name": "enterprise_jobs_enterprise_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{enterprise_id}",
    "constraint_definition": "FOREIGN KEY (enterprise_id) REFERENCES enterprises(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "constraint_name": "enterprise_jobs_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "constraint_name": "enterprise_jobs_job_id_key",
    "constraint_type": "UNIQUE",
    "columns": "{job_id}",
    "constraint_definition": "UNIQUE (job_id)"
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "constraint_name": "enterprise_jobs_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "constraint_name": "enterprises_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "constraint_name": "enterprises_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (tradesperson_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "constraint_name": "enterprises_tradesperson_id_key",
    "constraint_type": "UNIQUE",
    "columns": "{tradesperson_id}",
    "constraint_definition": "UNIQUE (tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "constraint_name": "escrow_pools_amount_check",
    "constraint_type": "CHECK",
    "columns": "{amount}",
    "constraint_definition": "CHECK ((amount > (0)::numeric))"
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "constraint_name": "escrow_pools_change_order_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{change_order_id}",
    "constraint_definition": "FOREIGN KEY (change_order_id) REFERENCES change_orders(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "constraint_name": "escrow_pools_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "constraint_name": "escrow_pools_milestone_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{milestone_id}",
    "constraint_definition": "FOREIGN KEY (milestone_id) REFERENCES milestones(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "constraint_name": "escrow_pools_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "constraint_name": "escrow_pools_platform_fee_check",
    "constraint_type": "CHECK",
    "columns": "{platform_fee}",
    "constraint_definition": "CHECK ((platform_fee >= (0)::numeric))"
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "constraint_name": "escrow_pools_pool_type_check",
    "constraint_type": "CHECK",
    "columns": "{pool_type}",
    "constraint_definition": "CHECK (((pool_type)::text = ANY ((ARRAY['original_quote'::character varying, 'change_order'::character varying, 'milestone'::character varying])::text[])))"
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "constraint_name": "escrow_pools_quote_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{quote_id}",
    "constraint_definition": "FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "constraint_name": "escrow_pools_status_check",
    "constraint_type": "CHECK",
    "columns": "{status}",
    "constraint_definition": "CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'held'::character varying, 'released'::character varying, 'refunded'::character varying])::text[])))"
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "constraint_name": "escrow_pools_tradesperson_amount_check",
    "constraint_type": "CHECK",
    "columns": "{tradesperson_amount}",
    "constraint_definition": "CHECK ((tradesperson_amount >= (0)::numeric))"
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "constraint_name": "valid_amounts",
    "constraint_type": "CHECK",
    "columns": "{amount,platform_fee,tradesperson_amount}",
    "constraint_definition": "CHECK ((amount = (platform_fee + tradesperson_amount)))"
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "constraint_name": "hourly_invoices_hourly_rate_check",
    "constraint_type": "CHECK",
    "columns": "{hourly_rate}",
    "constraint_definition": "CHECK ((hourly_rate > (0)::numeric))"
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "constraint_name": "hourly_invoices_hours_worked_check",
    "constraint_type": "CHECK",
    "columns": "{hours_worked}",
    "constraint_definition": "CHECK ((hours_worked > (0)::numeric))"
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "constraint_name": "hourly_invoices_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "constraint_name": "hourly_invoices_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "constraint_name": "hourly_invoices_quote_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{quote_id}",
    "constraint_definition": "FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "constraint_name": "hourly_invoices_status_check",
    "constraint_type": "CHECK",
    "columns": "{status}",
    "constraint_definition": "CHECK (((status)::text = ANY ((ARRAY['draft'::character varying, 'submitted'::character varying, 'approved'::character varying, 'rejected'::character varying, 'paid'::character varying])::text[])))"
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "constraint_name": "hourly_invoices_total_amount_check",
    "constraint_type": "CHECK",
    "columns": "{total_amount}",
    "constraint_definition": "CHECK ((total_amount > (0)::numeric))"
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "constraint_name": "job_applications_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "constraint_name": "job_applications_job_id_tradesperson_id_key",
    "constraint_type": "UNIQUE",
    "columns": "{job_id,tradesperson_id}",
    "constraint_definition": "UNIQUE (job_id, tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "constraint_name": "job_applications_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "constraint_name": "job_applications_status_check",
    "constraint_type": "CHECK",
    "columns": "{status}",
    "constraint_definition": "CHECK ((status = ANY (ARRAY['pending'::text, 'accepted'::text, 'rejected'::text, 'withdrawn'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "constraint_name": "job_applications_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (tradesperson_id) REFERENCES tradesperson_profiles(user_id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "constraint_name": "job_categories_name_key",
    "constraint_type": "UNIQUE",
    "columns": "{name}",
    "constraint_definition": "UNIQUE (name)"
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "constraint_name": "job_categories_parent_category_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{parent_category_id}",
    "constraint_definition": "FOREIGN KEY (parent_category_id) REFERENCES job_categories(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "constraint_name": "job_categories_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "constraint_name": "job_categories_slug_key",
    "constraint_type": "UNIQUE",
    "columns": "{slug}",
    "constraint_definition": "UNIQUE (slug)"
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "constraint_name": "job_photos_employee_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{employee_id}",
    "constraint_definition": "FOREIGN KEY (employee_id) REFERENCES enterprise_employees(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "constraint_name": "job_photos_enterprise_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{enterprise_id}",
    "constraint_definition": "FOREIGN KEY (enterprise_id) REFERENCES enterprises(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "constraint_name": "job_photos_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "constraint_name": "job_photos_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "constraint_name": "jobs_assigned_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{assigned_tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (assigned_tradesperson_id) REFERENCES auth.users(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "constraint_name": "jobs_budget_type_check",
    "constraint_type": "CHECK",
    "columns": "{budget_type}",
    "constraint_definition": "CHECK ((budget_type = ANY (ARRAY['fixed'::text, 'hourly'::text, 'daily'::text, 'project'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "constraint_name": "jobs_customer_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{customer_id}",
    "constraint_definition": "FOREIGN KEY (customer_id) REFERENCES customer_profiles(user_id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "constraint_name": "jobs_escrow_held_check",
    "constraint_type": "CHECK",
    "columns": "{escrow_held}",
    "constraint_definition": "CHECK ((escrow_held >= (0)::numeric))"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "constraint_name": "jobs_payment_preference_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{payment_preference_id}",
    "constraint_definition": "FOREIGN KEY (payment_preference_id) REFERENCES payment_preferences(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "constraint_name": "jobs_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "constraint_name": "jobs_status_check",
    "constraint_type": "CHECK",
    "columns": "{status}",
    "constraint_definition": "CHECK ((status = ANY (ARRAY['open'::text, 'pending'::text, 'in_progress'::text, 'completed'::text, 'cancelled'::text, 'expired'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "constraint_name": "jobs_total_paid_check",
    "constraint_type": "CHECK",
    "columns": "{total_paid}",
    "constraint_definition": "CHECK ((total_paid >= (0)::numeric))"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "constraint_name": "jobs_urgency_check",
    "constraint_type": "CHECK",
    "columns": "{urgency}",
    "constraint_definition": "CHECK ((urgency = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'emergency'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "constraint_name": "login_history_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "constraint_name": "login_history_user_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{user_id}",
    "constraint_definition": "FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "constraint_name": "messages_booking_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{booking_id}",
    "constraint_definition": "FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "constraint_name": "messages_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "constraint_name": "messages_message_type_check",
    "constraint_type": "CHECK",
    "columns": "{message_type}",
    "constraint_definition": "CHECK ((message_type = ANY (ARRAY['text'::text, 'image'::text, 'document'::text, 'system'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "constraint_name": "messages_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "constraint_name": "messages_receiver_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{recipient_id}",
    "constraint_definition": "FOREIGN KEY (recipient_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "constraint_name": "messages_sender_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{sender_id}",
    "constraint_definition": "FOREIGN KEY (sender_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "constraint_name": "milestones_amount_check",
    "constraint_type": "CHECK",
    "columns": "{amount}",
    "constraint_definition": "CHECK ((amount > (0)::numeric))"
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "constraint_name": "milestones_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "constraint_name": "milestones_job_id_sequence_number_key",
    "constraint_type": "UNIQUE",
    "columns": "{job_id,sequence_number}",
    "constraint_definition": "UNIQUE (job_id, sequence_number)"
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "constraint_name": "milestones_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "constraint_name": "milestones_quote_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{quote_id}",
    "constraint_definition": "FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "constraint_name": "milestones_sequence_number_check",
    "constraint_type": "CHECK",
    "columns": "{sequence_number}",
    "constraint_definition": "CHECK ((sequence_number > 0))"
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "constraint_name": "milestones_status_check",
    "constraint_type": "CHECK",
    "columns": "{status}",
    "constraint_definition": "CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'funded'::character varying, 'in_progress'::character varying, 'submitted'::character varying, 'approved'::character varying, 'rejected'::character varying, 'completed'::character varying])::text[])))"
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "constraint_name": "notification_logs_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "constraint_name": "notification_logs_user_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{user_id}",
    "constraint_definition": "FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "constraint_name": "notification_preferences_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "constraint_name": "notification_preferences_user_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{user_id}",
    "constraint_definition": "FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "constraint_name": "notification_preferences_user_id_key",
    "constraint_type": "UNIQUE",
    "columns": "{user_id}",
    "constraint_definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "constraint_name": "notifications_application_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{application_id}",
    "constraint_definition": "FOREIGN KEY (application_id) REFERENCES job_applications(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "constraint_name": "notifications_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "constraint_name": "notifications_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "constraint_name": "notifications_type_check",
    "constraint_type": "CHECK",
    "columns": "{type}",
    "constraint_definition": "CHECK ((type = ANY (ARRAY['quote_received'::text, 'quote_accepted'::text, 'quote_rejected'::text, 'booking_confirmed'::text, 'booking_completed'::text, 'job_started'::text, 'job_update'::text, 'photos_uploaded'::text, 'change_order_requested'::text, 'change_order_approved'::text, 'change_order_rejected'::text, 'payment_received'::text, 'payment_made'::text, 'message'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "constraint_name": "notifications_user_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{user_id}",
    "constraint_definition": "FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "constraint_name": "payment_preferences_estimated_hours_max_check",
    "constraint_type": "CHECK",
    "columns": "{estimated_hours_max}",
    "constraint_definition": "CHECK ((estimated_hours_max > 0))"
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "constraint_name": "payment_preferences_estimated_hours_min_check",
    "constraint_type": "CHECK",
    "columns": "{estimated_hours_min}",
    "constraint_definition": "CHECK ((estimated_hours_min > 0))"
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "constraint_name": "payment_preferences_hourly_rate_check",
    "constraint_type": "CHECK",
    "columns": "{hourly_rate}",
    "constraint_definition": "CHECK ((hourly_rate > (0)::numeric))"
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "constraint_name": "payment_preferences_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "constraint_name": "payment_preferences_max_change_order_percentage_check",
    "constraint_type": "CHECK",
    "columns": "{max_change_order_percentage}",
    "constraint_definition": "CHECK (((max_change_order_percentage >= 0) AND (max_change_order_percentage <= 100)))"
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "constraint_name": "payment_preferences_milestone_count_check",
    "constraint_type": "CHECK",
    "columns": "{milestone_count}",
    "constraint_definition": "CHECK (((milestone_count >= 2) AND (milestone_count <= 10)))"
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "constraint_name": "payment_preferences_payment_type_check",
    "constraint_type": "CHECK",
    "columns": "{payment_type}",
    "constraint_definition": "CHECK (((payment_type)::text = ANY ((ARRAY['fixed'::character varying, 'change_orders'::character varying, 'milestones'::character varying, 'hourly_buffer'::character varying])::text[])))"
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "constraint_name": "payment_preferences_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "constraint_name": "valid_hourly_range",
    "constraint_type": "CHECK",
    "columns": "{estimated_hours_max,estimated_hours_min}",
    "constraint_definition": "CHECK ((estimated_hours_max >= estimated_hours_min))"
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "constraint_name": "payments_customer_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{customer_id}",
    "constraint_definition": "FOREIGN KEY (customer_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "constraint_name": "payments_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "constraint_name": "payments_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "constraint_name": "payments_quote_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{quote_id}",
    "constraint_definition": "FOREIGN KEY (quote_id) REFERENCES job_applications(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "constraint_name": "payments_status_check",
    "constraint_type": "CHECK",
    "columns": "{status}",
    "constraint_definition": "CHECK ((status = ANY (ARRAY['pending'::text, 'held_in_escrow'::text, 'released'::text, 'refunded'::text, 'cancelled'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "constraint_name": "payments_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (tradesperson_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "constraint_name": "payouts_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "constraint_name": "payouts_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (tradesperson_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "constraint_name": "payouts_wallet_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{wallet_id}",
    "constraint_definition": "FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "constraint_name": "portfolio_items_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "constraint_name": "portfolio_items_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (tradesperson_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_likes",
    "constraint_name": "portfolio_likes_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_likes",
    "constraint_name": "portfolio_likes_portfolio_item_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{portfolio_item_id}",
    "constraint_definition": "FOREIGN KEY (portfolio_item_id) REFERENCES portfolio_items(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_likes",
    "constraint_name": "portfolio_likes_portfolio_item_id_user_id_key",
    "constraint_type": "UNIQUE",
    "columns": "{portfolio_item_id,user_id}",
    "constraint_definition": "UNIQUE (portfolio_item_id, user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_likes",
    "constraint_name": "portfolio_likes_user_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{user_id}",
    "constraint_definition": "FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "constraint_name": "quotes_application_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{application_id}",
    "constraint_definition": "FOREIGN KEY (application_id) REFERENCES job_applications(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "constraint_name": "quotes_customer_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{customer_id}",
    "constraint_definition": "FOREIGN KEY (customer_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "constraint_name": "quotes_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "constraint_name": "quotes_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "constraint_name": "quotes_status_check",
    "constraint_type": "CHECK",
    "columns": "{status}",
    "constraint_definition": "CHECK ((status = ANY (ARRAY['draft'::text, 'sent'::text, 'viewed'::text, 'accepted'::text, 'rejected'::text, 'expired'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "constraint_name": "quotes_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (tradesperson_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "constraint_name": "reviews_booking_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{booking_id}",
    "constraint_definition": "FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "constraint_name": "reviews_booking_id_reviewer_id_key",
    "constraint_type": "UNIQUE",
    "columns": "{booking_id,reviewer_id}",
    "constraint_definition": "UNIQUE (booking_id, reviewer_id)"
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "constraint_name": "reviews_communication_rating_check",
    "constraint_type": "CHECK",
    "columns": "{communication_rating}",
    "constraint_definition": "CHECK (((communication_rating >= 1) AND (communication_rating <= 5)))"
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "constraint_name": "reviews_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "constraint_name": "reviews_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "constraint_name": "reviews_quality_rating_check",
    "constraint_type": "CHECK",
    "columns": "{quality_rating}",
    "constraint_definition": "CHECK (((quality_rating >= 1) AND (quality_rating <= 5)))"
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "constraint_name": "reviews_rating_check",
    "constraint_type": "CHECK",
    "columns": "{rating}",
    "constraint_definition": "CHECK (((rating >= 1) AND (rating <= 5)))"
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "constraint_name": "reviews_reviewee_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{reviewee_id}",
    "constraint_definition": "FOREIGN KEY (reviewee_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "constraint_name": "reviews_reviewer_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{reviewer_id}",
    "constraint_definition": "FOREIGN KEY (reviewer_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "constraint_name": "reviews_timeliness_rating_check",
    "constraint_type": "CHECK",
    "columns": "{timeliness_rating}",
    "constraint_definition": "CHECK (((timeliness_rating >= 1) AND (timeliness_rating <= 5)))"
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "constraint_name": "reviews_value_rating_check",
    "constraint_type": "CHECK",
    "columns": "{value_rating}",
    "constraint_definition": "CHECK (((value_rating >= 1) AND (value_rating <= 5)))"
  },
  {
    "schema_name": "public",
    "table_name": "saved_tradespeople",
    "constraint_name": "saved_tradespeople_customer_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{customer_id}",
    "constraint_definition": "FOREIGN KEY (customer_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "saved_tradespeople",
    "constraint_name": "saved_tradespeople_customer_id_tradesperson_id_key",
    "constraint_type": "UNIQUE",
    "columns": "{customer_id,tradesperson_id}",
    "constraint_definition": "UNIQUE (customer_id, tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "saved_tradespeople",
    "constraint_name": "saved_tradespeople_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "saved_tradespeople",
    "constraint_name": "saved_tradespeople_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (tradesperson_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "constraint_name": "time_clock_entries_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "constraint_name": "time_clock_entries_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "constraint_name": "tradesperson_notifications_booking_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{booking_id}",
    "constraint_definition": "FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "constraint_name": "tradesperson_notifications_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "constraint_name": "tradesperson_notifications_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "constraint_name": "tradesperson_notifications_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (tradesperson_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "constraint_name": "tradesperson_profiles_abuse_warnings_count_check",
    "constraint_type": "CHECK",
    "columns": "{abuse_warnings_count}",
    "constraint_definition": "CHECK ((abuse_warnings_count >= 0))"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "constraint_name": "tradesperson_profiles_change_orders_approved_count_check",
    "constraint_type": "CHECK",
    "columns": "{change_orders_approved_count}",
    "constraint_definition": "CHECK ((change_orders_approved_count >= 0))"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "constraint_name": "tradesperson_profiles_change_orders_created_count_check",
    "constraint_type": "CHECK",
    "columns": "{change_orders_created_count}",
    "constraint_definition": "CHECK ((change_orders_created_count >= 0))"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "constraint_name": "tradesperson_profiles_change_orders_rejected_count_check",
    "constraint_type": "CHECK",
    "columns": "{change_orders_rejected_count}",
    "constraint_definition": "CHECK ((change_orders_rejected_count >= 0))"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "constraint_name": "tradesperson_profiles_flagged_clock_entries_count_check",
    "constraint_type": "CHECK",
    "columns": "{flagged_clock_entries_count}",
    "constraint_definition": "CHECK ((flagged_clock_entries_count >= 0))"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "constraint_name": "tradesperson_profiles_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "constraint_name": "tradesperson_profiles_user_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{user_id}",
    "constraint_definition": "FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "constraint_name": "tradesperson_profiles_user_id_key",
    "constraint_type": "UNIQUE",
    "columns": "{user_id}",
    "constraint_definition": "UNIQUE (user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "constraint_name": "tradesperson_profiles_verification_status_check",
    "constraint_type": "CHECK",
    "columns": "{verification_status}",
    "constraint_definition": "CHECK ((verification_status = ANY (ARRAY['incomplete'::text, 'pending_documents'::text, 'pending_verification'::text, 'verified'::text, 'verification_failed'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "trigger_debug_log",
    "constraint_name": "trigger_debug_log_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "trigger_execution_log",
    "constraint_name": "trigger_execution_log_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "constraint_name": "user_sessions_access_token_key",
    "constraint_type": "UNIQUE",
    "columns": "{access_token}",
    "constraint_definition": "UNIQUE (access_token)"
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "constraint_name": "user_sessions_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "constraint_name": "user_sessions_user_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{user_id}",
    "constraint_definition": "FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "constraint_name": "verification_documents_category_check",
    "constraint_type": "CHECK",
    "columns": "{category}",
    "constraint_definition": "CHECK ((category = ANY (ARRAY['identity'::text, 'proof_of_address'::text, 'business'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "constraint_name": "verification_documents_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "constraint_name": "verification_documents_status_check",
    "constraint_type": "CHECK",
    "columns": "{status}",
    "constraint_definition": "CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "constraint_name": "verification_documents_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (tradesperson_id) REFERENCES tradesperson_profiles(user_id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "constraint_name": "verification_documents_verified_by_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{verified_by}",
    "constraint_definition": "FOREIGN KEY (verified_by) REFERENCES auth.users(id)"
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "constraint_name": "wallet_transactions_booking_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{booking_id}",
    "constraint_definition": "FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "constraint_name": "wallet_transactions_job_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{job_id}",
    "constraint_definition": "FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL"
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "constraint_name": "wallet_transactions_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "constraint_name": "wallet_transactions_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (tradesperson_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "constraint_name": "wallet_transactions_type_check",
    "constraint_type": "CHECK",
    "columns": "{type}",
    "constraint_definition": "CHECK ((type = ANY (ARRAY['credit'::text, 'debit'::text, 'payment_in'::text, 'payment_out'::text, 'payout'::text, 'refund'::text, 'fee'::text, 'adjustment'::text, 'penalty'::text])))"
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "constraint_name": "wallet_transactions_wallet_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{wallet_id}",
    "constraint_definition": "FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "constraint_name": "wallets_pkey",
    "constraint_type": "PRIMARY KEY",
    "columns": "{id}",
    "constraint_definition": "PRIMARY KEY (id)"
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "constraint_name": "wallets_tradesperson_id_fkey",
    "constraint_type": "FOREIGN KEY",
    "columns": "{tradesperson_id}",
    "constraint_definition": "FOREIGN KEY (tradesperson_id) REFERENCES auth.users(id) ON DELETE CASCADE"
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "constraint_name": "wallets_tradesperson_id_key",
    "constraint_type": "UNIQUE",
    "columns": "{tradesperson_id}",
    "constraint_definition": "UNIQUE (tradesperson_id)"
  }
]
[
  {
    "schema_name": "public",
    "function_name": "add_funds_to_wallet",
    "arguments": "p_tradesperson_id uuid, p_job_id uuid, p_gross_amount bigint, p_description text, p_completed_at timestamp with time zone DEFAULT now()",
    "function_definition": "CREATE OR REPLACE FUNCTION public.add_funds_to_wallet(p_tradesperson_id uuid, p_job_id uuid, p_gross_amount bigint, p_description text, p_completed_at timestamp with time zone DEFAULT now())\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\n  DECLARE\n    v_wallet_id UUID;\n    v_platform_fee NUMERIC(12, 2);\n    v_net_amount NUMERIC(12, 2);\n    v_gross_pounds NUMERIC(12, 2);\n    v_available_at TIMESTAMP WITH TIME ZONE;\n    v_transaction_id UUID;\n  BEGIN\n    v_gross_pounds := ROUND(p_gross_amount / 100.0, 2);\n    v_platform_fee := ROUND(v_gross_pounds * 0.15, 2);\n    v_net_amount := v_gross_pounds - v_platform_fee;\n    v_available_at := p_completed_at + INTERVAL '7 days';\n\n    INSERT INTO wallets (tradesperson_id)\n    VALUES (p_tradesperson_id)\n    ON CONFLICT (tradesperson_id) DO UPDATE SET updated_at = NOW()\n    RETURNING id INTO v_wallet_id;\n\n    IF v_wallet_id IS NULL THEN\n      SELECT id INTO v_wallet_id FROM wallets WHERE tradesperson_id = p_tradesperson_id;\n    END IF;\n\n    UPDATE wallets\n    SET\n      pending_balance = pending_balance + v_net_amount,\n      total_balance = total_balance + v_net_amount,\n      updated_at = NOW()\n    WHERE id = v_wallet_id;\n\n    INSERT INTO wallet_transactions (\n      wallet_id, tradesperson_id, job_id, type, amount,\n      gross_amount, platform_fee, net_amount, description,\n      status, available_at, created_at, updated_at\n    )\n    SELECT\n      v_wallet_id, p_tradesperson_id, p_job_id, 'payment_in', v_net_amount,\n      v_gross_pounds, v_platform_fee, v_net_amount, p_description,\n      'pending', v_available_at, NOW(), NOW()\n    FROM wallets WHERE id = v_wallet_id\n    RETURNING id INTO v_transaction_id;\n\n    RETURN v_transaction_id;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "approve_tradesperson_verification",
    "arguments": "p_tradesperson_id uuid, p_admin_id uuid, p_notes text DEFAULT NULL::text",
    "function_definition": "CREATE OR REPLACE FUNCTION public.approve_tradesperson_verification(p_tradesperson_id uuid, p_admin_id uuid, p_notes text DEFAULT NULL::text)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nBEGIN\n  -- Verify admin has permission\n  IF NOT EXISTS (\n    SELECT 1 FROM admin_users\n    WHERE user_id = p_admin_id\n    AND (permissions->>'verify_documents')::boolean = true\n  ) THEN\n    RAISE EXCEPTION 'Insufficient permissions';\n  END IF;\n\n  -- Approve all pending documents\n  UPDATE verification_documents\n  SET\n    status = 'approved',\n    verified_by = p_admin_id,\n    verified_at = NOW(),\n    updated_at = NOW()\n  WHERE tradesperson_id = p_tradesperson_id\n    AND status = 'pending';\n\n  -- Update tradesperson status\n  UPDATE tradesperson_profiles\n  SET\n    verification_status = 'verified',\n    documents_verified_at = NOW(),\n    verification_notes = p_notes,\n    updated_at = NOW()\n  WHERE user_id = p_tradesperson_id;\n\n  -- Log audit trail\n  INSERT INTO admin_audit_log (admin_id, action, target_tradesperson_id, details)\n  VALUES (\n    p_admin_id,\n    'approve_all',\n    p_tradesperson_id,\n    jsonb_build_object('notes', p_notes)\n  );\n\n  RETURN TRUE;\nEND;\n$function$\n",
    "volatility": "VOLATILE",
    "description": "Approve all documents and verify tradesperson"
  },
  {
    "schema_name": "public",
    "function_name": "auto_accept_quote_on_payment",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.auto_accept_quote_on_payment()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n  BEGIN\n    -- When payment status changes to 'held_in_escrow', accept the quote\n    IF NEW.status = 'held_in_escrow' AND (OLD.status IS NULL OR OLD.status != 'held_in_escrow') THEN\n\n      -- Update the quote status to 'accepted'\n      UPDATE job_applications\n      SET status = 'accepted'\n      WHERE id = NEW.quote_id\n        AND status = 'pending';\n\n      -- Reject all other quotes for this job\n      UPDATE job_applications\n      SET status = 'rejected'\n      WHERE job_id = NEW.job_id\n        AND id != NEW.quote_id\n        AND status = 'pending';\n\n      RAISE NOTICE 'Auto-accepted quote % for payment %', NEW.quote_id, NEW.id;\n    END IF;\n\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "auto_add_to_wallet_on_completion",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.auto_add_to_wallet_on_completion()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\n  DECLARE\n    v_wallet_id UUID;\n    v_locked_transaction RECORD;\n    v_available_at TIMESTAMP WITH TIME ZONE;\n    v_moved_count INTEGER := 0;\n    v_transaction_count INTEGER := 0;\n  BEGIN\n    -- LOG: Trigger was called\n    INSERT INTO trigger_execution_log (trigger_name, booking_id, old_status, new_status)\n    VALUES ('auto_add_to_wallet', NEW.id, OLD.status, NEW.status);\n\n    INSERT INTO trigger_debug_log (step, booking_id, job_id, tradesperson_id, details)\n    VALUES ('TRIGGER_START', NEW.id, NEW.job_id, NEW.tradesperson_id,\n            format('Status change: %s -> %s', OLD.status, NEW.status));\n\n    -- Only process when booking status changes to 'completed'\n    IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN\n\n      INSERT INTO trigger_debug_log (step, booking_id, details)\n      VALUES ('CONDITION_PASSED', NEW.id, 'Status is completed and was not completed before');\n\n      -- Get wallet\n      SELECT id INTO v_wallet_id\n      FROM wallets\n      WHERE tradesperson_id = NEW.tradesperson_id;\n\n      INSERT INTO trigger_debug_log (step, booking_id, wallet_id, details)\n      VALUES ('WALLET_LOOKUP', NEW.id, v_wallet_id,\n              CASE WHEN v_wallet_id IS NULL THEN 'No wallet found' ELSE 'Wallet found' END);\n\n      IF v_wallet_id IS NULL THEN\n        RETURN NEW;\n      END IF;\n\n      -- Calculate 7-day release date\n      v_available_at := COALESCE(NEW.completed_at, NOW()) + INTERVAL '7 days';\n\n      -- Count locked transactions\n      SELECT COUNT(*) INTO v_transaction_count\n      FROM wallet_transactions\n      WHERE tradesperson_id = NEW.tradesperson_id\n        AND job_id = NEW.job_id\n        AND status = 'locked'\n        AND type = 'payment_in';\n\n      INSERT INTO trigger_debug_log (step, booking_id, transaction_count, details)\n      VALUES ('LOCKED_TRANSACTIONS_FOUND', NEW.id, v_transaction_count,\n              format('Found %s locked transactions for job %s', v_transaction_count, NEW.job_id));\n\n      -- Find locked transactions by job_id\n      FOR v_locked_transaction IN\n        SELECT id, amount\n        FROM wallet_transactions\n        WHERE tradesperson_id = NEW.tradesperson_id\n          AND job_id = NEW.job_id\n          AND status = 'locked'\n          AND type = 'payment_in'\n      LOOP\n        INSERT INTO trigger_debug_log (step, booking_id, details)\n        VALUES ('PROCESSING_TRANSACTION', NEW.id,\n                format('Moving transaction %s amount %s', v_locked_transaction.id, v_locked_transaction.amount));\n\n        -- Update transaction status\n        UPDATE wallet_transactions\n        SET\n          status = 'pending',\n          available_at = v_available_at,\n          booking_id = NEW.id,\n          description = REPLACE(description, 'Awaiting job completion', '7-day hold period'),\n          updated_at = NOW()\n        WHERE id = v_locked_transaction.id;\n\n        -- Move from locked to pending in wallet\n        UPDATE wallets\n        SET\n          locked_balance = locked_balance - v_locked_transaction.amount,\n          pending_balance = pending_balance + v_locked_transaction.amount,\n          updated_at = NOW()\n        WHERE id = v_wallet_id;\n\n        v_moved_count := v_moved_count + 1;\n      END LOOP;\n\n      INSERT INTO trigger_debug_log (step, booking_id, transaction_count, details)\n      VALUES ('COMPLETED', NEW.id, v_moved_count,\n              format('Moved %s transactions to pending', v_moved_count));\n\n    ELSE\n      INSERT INTO trigger_debug_log (step, booking_id, details)\n      VALUES ('CONDITION_FAILED', NEW.id,\n              format('Condition not met. Status: %s, Old: %s', NEW.status, OLD.status));\n    END IF;\n\n    RETURN NEW;\n  EXCEPTION\n    WHEN OTHERS THEN\n      INSERT INTO trigger_debug_log (step, booking_id, details)\n      VALUES ('ERROR', NEW.id, format('Error: %s', SQLERRM));\n      RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "auto_create_booking_on_payment",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.auto_create_booking_on_payment()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n  DECLARE\n    v_job_title TEXT;\n    v_job_description TEXT;\n    v_job_location TEXT;\n  BEGIN\n    -- Only proceed if payment status changed to 'held_in_escrow'\n    IF NEW.status = 'held_in_escrow' AND (OLD.status IS NULL OR OLD.status != 'held_in_escrow') THEN\n\n      -- Check if booking already exists for this job and tradesperson\n      IF NOT EXISTS (\n        SELECT 1 FROM bookings\n        WHERE job_id = NEW.job_id\n        AND tradesperson_id = NEW.tradesperson_id\n      ) THEN\n\n        -- Get job details from jobs table\n        SELECT\n          title,\n          description,\n          COALESCE(location_address, 'Location TBD')\n        INTO\n          v_job_title,\n          v_job_description,\n          v_job_location\n        FROM jobs\n        WHERE id = NEW.job_id;\n\n        -- If job not found, use default values\n        IF v_job_title IS NULL THEN\n          v_job_title := 'Job from Quote #' || SUBSTRING(NEW.quote_id::text, 1, 8);\n          v_job_description := 'Booking created from payment';\n          v_job_location := 'Location TBD';\n        END IF;\n\n        -- Create the booking\n        INSERT INTO bookings (\n          customer_id,\n          tradesperson_id,\n          job_id,\n          title,\n          description,\n          location_address,\n          scheduled_date,\n          agreed_price,\n          status,\n          payment_status,\n          stripe_payment_intent_id\n        ) VALUES (\n          NEW.customer_id,\n          NEW.tradesperson_id,\n          NEW.job_id,\n          v_job_title,\n          v_job_description,\n          v_job_location,\n          NOW() + INTERVAL '1 day',  -- Start tomorrow\n          NEW.amount,\n          'scheduled',\n          'paid',  -- Mark as paid since payment is held_in_escrow\n          NEW.stripe_payment_intent_id\n        );\n\n        -- Log success\n        RAISE NOTICE 'Auto-created booking for payment % (job: %, tradesperson: %)',\n          NEW.id, NEW.job_id, NEW.tradesperson_id;\n      ELSE\n        RAISE NOTICE 'Booking already exists for payment % (job: %, tradesperson: %)',\n          NEW.id, NEW.job_id, NEW.tradesperson_id;\n      END IF;\n    END IF;\n\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "auto_create_escrow_pool_on_payment",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.auto_create_escrow_pool_on_payment()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n  DECLARE\n      v_quote_id UUID;\n  BEGIN\n      -- Only create escrow pool when payment status changes to 'held_in_escrow'\n      IF NEW.status = 'held_in_escrow' AND (OLD.status IS NULL OR OLD.status != 'held_in_escrow') THEN\n\n          -- Get the correct quote_id from quotes table\n          SELECT id INTO v_quote_id\n          FROM quotes\n          WHERE job_id = NEW.job_id\n            AND status = 'accepted'\n          LIMIT 1;\n\n          IF v_quote_id IS NULL THEN\n              RAISE WARNING 'No accepted quote found for job_id: %', NEW.job_id;\n              RETURN NEW;\n          END IF;\n\n          -- Create escrow pool with platform fee calculation\n          INSERT INTO escrow_pools (\n              job_id,\n              quote_id,\n              pool_type,\n              amount,\n              platform_fee,\n              tradesperson_amount,\n              status,\n              payment_intent_id,\n              held_at,\n              created_at,\n              updated_at\n          ) VALUES (\n              NEW.job_id,\n              v_quote_id,  -- Use quote from quotes table\n              'original_quote',\n              NEW.amount,\n              ROUND(NEW.amount * 0.15, 2),  -- 15% platform fee\n              ROUND(NEW.amount * 0.85, 2),  -- 85% to tradesperson\n              'held',\n              NEW.stripe_payment_intent_id,\n              NOW(),\n              NOW(),\n              NOW()\n          );\n\n          RAISE NOTICE 'Created escrow pool for payment: %', NEW.id;\n      END IF;\n\n      RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "auto_create_quote_on_acceptance",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.auto_create_quote_on_acceptance()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\n  DECLARE\n      v_customer_id UUID;\n      v_job_title TEXT;\n      v_job_description TEXT;\n  BEGIN\n      -- Only proceed if status changed to 'accepted'\n      IF NEW.status = 'accepted' AND (OLD.status IS NULL OR OLD.status != 'accepted') THEN\n          -- Get job details\n          SELECT customer_id, title, description\n          INTO v_customer_id, v_job_title, v_job_description\n          FROM jobs\n          WHERE id = NEW.job_id;\n\n          -- Create quote if it doesn't exist\n          IF NOT EXISTS (SELECT 1 FROM quotes WHERE application_id = NEW.id) THEN\n              INSERT INTO quotes (\n                  job_id,\n                  application_id,\n                  tradesperson_id,\n                  customer_id,\n                  title,\n                  description,\n                  subtotal,\n                  total_amount,\n                  original_amount,\n                  current_amount,\n                  status,\n                  created_at,\n                  updated_at\n              ) VALUES (\n                  NEW.job_id,\n                  NEW.id,\n                  NEW.tradesperson_id,\n                  v_customer_id,\n                  v_job_title,\n                  COALESCE(v_job_description, 'Job quote'),\n                  NEW.proposed_price,\n                  NEW.proposed_price,\n                  NEW.proposed_price,\n                  NEW.proposed_price,\n                  'accepted',\n                  NOW(),\n                  NOW()\n              );\n\n              RAISE NOTICE 'Auto-created quote for job_application: %', NEW.id;\n          END IF;\n      END IF;\n\n      RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "calculate_time_entry_hours",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.calculate_time_entry_hours()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n  BEGIN\n    IF NEW.clock_out_time IS NOT NULL AND NEW.clock_in_time IS NOT NULL THEN\n      NEW.total_hours := EXTRACT(EPOCH FROM (NEW.clock_out_time - NEW.clock_in_time)) / 3600\n                        - (COALESCE(NEW.break_duration_minutes, 0) / 60.0);\n      NEW.status := 'clocked_out';\n    END IF;\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "cleanup_old_sessions",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.cleanup_old_sessions()\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\n  BEGIN\n    DELETE FROM user_sessions\n    WHERE revoked_at IS NOT NULL\n      AND revoked_at < NOW() - INTERVAL '30 days';\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "confirm_payment_secure",
    "arguments": "p_payment_id uuid",
    "function_definition": "CREATE OR REPLACE FUNCTION public.confirm_payment_secure(p_payment_id uuid)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\n  DECLARE\n    v_payment RECORD;\n    v_wallet_id UUID;\n    v_booking_id UUID;\n    v_job_title TEXT;\n    v_tradesperson_amount_pence INTEGER;\n  BEGIN\n    RAISE NOTICE '[CONFIRM_PAYMENT] Starting for payment %', p_payment_id;\n\n    -- Get payment details\n    SELECT * INTO v_payment\n    FROM payments\n    WHERE id = p_payment_id;\n\n    IF NOT FOUND THEN\n      RAISE EXCEPTION 'Payment not found: %', p_payment_id;\n    END IF;\n\n    -- SECURITY CHECKS\n    IF v_payment.stripe_payment_intent_id IS NULL THEN\n      RAISE EXCEPTION 'Payment missing Stripe payment intent';\n    END IF;\n\n    IF v_payment.status != 'pending' THEN\n      RAISE EXCEPTION 'Payment already processed: %', v_payment.status;\n    END IF;\n\n    IF v_payment.created_at < NOW() - INTERVAL '1 hour' THEN\n      RAISE EXCEPTION 'Payment too old';\n    END IF;\n\n    IF auth.uid() IS NULL OR auth.uid() != v_payment.customer_id THEN\n      RAISE EXCEPTION 'Unauthorized';\n    END IF;\n\n    -- Update payment to held_in_escrow\n    UPDATE payments\n    SET\n      status = 'held_in_escrow',\n      paid_at = NOW(),\n      updated_at = NOW()\n    WHERE id = p_payment_id;\n\n    RAISE NOTICE '[CONFIRM_PAYMENT] Payment status updated to held_in_escrow';\n\n    -- Get job title\n    SELECT title INTO v_job_title FROM jobs WHERE id = v_payment.job_id;\n\n    -- Get or create wallet\n    SELECT id INTO v_wallet_id\n    FROM wallets\n    WHERE tradesperson_id = v_payment.tradesperson_id;\n\n    IF v_wallet_id IS NULL THEN\n      INSERT INTO wallets (\n        tradesperson_id,\n        total_balance,\n        available_balance,\n        locked_balance,\n        pending_balance,\n        frozen_balance,\n        currency\n      ) VALUES (\n        v_payment.tradesperson_id,\n        0, 0, 0, 0, 0, v_payment.currency\n      ) RETURNING id INTO v_wallet_id;\n\n      RAISE NOTICE '[CONFIRM_PAYMENT] Created wallet %', v_wallet_id;\n    END IF;\n\n    -- CONVERT TO PENCE (multiply by 100)\n    v_tradesperson_amount_pence := ROUND(v_payment.tradesperson_amount * 100);\n\n    RAISE NOTICE '[CONFIRM_PAYMENT] Amount in pence: %', v_tradesperson_amount_pence;\n\n    -- Find the booking for this payment (link wallet transaction to booking)\n    SELECT id INTO v_booking_id\n    FROM bookings\n    WHERE job_id = v_payment.job_id\n      AND tradesperson_id = v_payment.tradesperson_id\n      AND status IN ('scheduled', 'in_progress', 'completed')\n    ORDER BY created_at DESC\n    LIMIT 1;\n\n    IF v_booking_id IS NULL THEN\n      RAISE WARNING '[CONFIRM_PAYMENT] No booking found, will use job_id only';\n    ELSE\n      RAISE NOTICE '[CONFIRM_PAYMENT] Linked to booking %', v_booking_id;\n    END IF;\n\n    -- Update wallet locked balance (IN PENCE)\n    UPDATE wallets\n    SET\n      locked_balance = locked_balance + v_tradesperson_amount_pence,\n      total_balance = total_balance + v_tradesperson_amount_pence,\n      updated_at = NOW()\n    WHERE id = v_wallet_id;\n\n    -- Create wallet transaction (IN PENCE, WITH booking_id)\n    INSERT INTO wallet_transactions (\n      wallet_id,\n      tradesperson_id,\n      job_id,\n      booking_id,  -- IMPORTANT: Link to booking\n      type,\n      status,\n      amount,\n      gross_amount,\n      platform_fee,\n      net_amount,\n      description,\n      created_at,\n      updated_at\n    ) VALUES (\n      v_wallet_id,\n      v_payment.tradesperson_id,\n      v_payment.job_id,\n      v_booking_id,  -- Link to booking\n      'payment_in',\n      'locked',\n      v_tradesperson_amount_pence,  -- IN PENCE\n      ROUND(v_payment.amount * 100),  -- IN PENCE\n      ROUND(v_payment.platform_fee * 100),  -- IN PENCE\n      v_tradesperson_amount_pence,  -- IN PENCE\n      format('Payment for \"%s\" (Awaiting job completion)', COALESCE(v_job_title, 'Job')),\n      NOW(),\n      NOW()\n    );\n\n    RAISE NOTICE '[CONFIRM_PAYMENT] ✅ Created locked wallet transaction (£%)',\n      (v_tradesperson_amount_pence::FLOAT / 100);\n\n    RETURN TRUE;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "create_default_notification_preferences",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.create_default_notification_preferences()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\n  BEGIN\n    INSERT INTO notification_preferences (\n      user_id,\n      push_enabled,\n      quote_alerts,\n      booking_reminders,\n      message_notifications,\n      job_updates,\n      payment_notifications\n    ) VALUES (\n      NEW.id,\n      true,  -- Push enabled by default\n      true,  -- Quote alerts enabled\n      true,  -- Booking reminders enabled\n      true,  -- Message notifications enabled\n      true,  -- Job updates enabled\n      true   -- Payment notifications enabled\n    ) ON CONFLICT (user_id) DO NOTHING;\n\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "create_notification",
    "arguments": "p_user_id uuid, p_type text, p_title text, p_message text, p_job_id uuid DEFAULT NULL::uuid, p_booking_id uuid DEFAULT NULL::uuid, p_application_id uuid DEFAULT NULL::uuid, p_action_url text DEFAULT NULL::text",
    "function_definition": "CREATE OR REPLACE FUNCTION public.create_notification(p_user_id uuid, p_type text, p_title text, p_message text, p_job_id uuid DEFAULT NULL::uuid, p_booking_id uuid DEFAULT NULL::uuid, p_application_id uuid DEFAULT NULL::uuid, p_action_url text DEFAULT NULL::text)\n RETURNS SETOF notifications\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\n  BEGIN\n    RETURN QUERY\n    INSERT INTO notifications (\n      user_id, type, title, message, job_id, booking_id, application_id, action_url, read, created_at\n    )\n    VALUES (\n      p_user_id, p_type, p_title, p_message, p_job_id, p_booking_id, p_application_id, p_action_url, FALSE, NOW()\n    )\n    RETURNING *;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "create_payment_pending",
    "arguments": "p_quote_id uuid, p_customer_id uuid, p_tradesperson_id uuid, p_job_id uuid, p_amount numeric, p_platform_fee numeric, p_tradesperson_amount numeric, p_currency character varying",
    "function_definition": "CREATE OR REPLACE FUNCTION public.create_payment_pending(p_quote_id uuid, p_customer_id uuid, p_tradesperson_id uuid, p_job_id uuid, p_amount numeric, p_platform_fee numeric, p_tradesperson_amount numeric, p_currency character varying)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\n  DECLARE\n    v_payment_id UUID;\n  BEGIN\n    -- Insert payment with pending status (RLS bypassed via SECURITY DEFINER)\n    INSERT INTO payments (\n      quote_id,\n      customer_id,\n      tradesperson_id,\n      job_id,\n      amount,\n      platform_fee,\n      tradesperson_amount,\n      currency,\n      status,\n      created_at\n    ) VALUES (\n      p_quote_id,\n      p_customer_id,\n      p_tradesperson_id,\n      p_job_id,\n      p_amount,\n      p_platform_fee,\n      p_tradesperson_amount,\n      p_currency,\n      'pending',\n      NOW()\n    ) RETURNING id INTO v_payment_id;\n\n    RAISE NOTICE '[CREATE_PAYMENT] ✅ Created payment % with status=pending', v_payment_id;\n\n    RETURN v_payment_id;\n  EXCEPTION\n    WHEN OTHERS THEN\n      RAISE WARNING '[CREATE_PAYMENT] ❌ Error: % %', SQLERRM, SQLSTATE;\n      RAISE;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "create_payment_secure",
    "arguments": "p_quote_id uuid, p_customer_id uuid, p_tradesperson_id uuid, p_job_id uuid, p_amount numeric, p_platform_fee numeric, p_tradesperson_amount numeric, p_currency character varying, p_stripe_payment_intent_id text DEFAULT NULL::text",
    "function_definition": "CREATE OR REPLACE FUNCTION public.create_payment_secure(p_quote_id uuid, p_customer_id uuid, p_tradesperson_id uuid, p_job_id uuid, p_amount numeric, p_platform_fee numeric, p_tradesperson_amount numeric, p_currency character varying, p_stripe_payment_intent_id text DEFAULT NULL::text)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\n  DECLARE\n    v_payment_id UUID;\n    v_wallet_id UUID;\n    v_job_title TEXT;\n  BEGIN\n    -- Insert payment (RLS bypassed because SECURITY DEFINER)\n    INSERT INTO payments (\n      quote_id,\n      customer_id,\n      tradesperson_id,\n      job_id,\n      amount,\n      platform_fee,\n      tradesperson_amount,\n      currency,\n      status,\n      stripe_payment_intent_id,\n      created_at\n    ) VALUES (\n      p_quote_id,\n      p_customer_id,\n      p_tradesperson_id,\n      p_job_id,\n      p_amount,\n      p_platform_fee,\n      p_tradesperson_amount,\n      p_currency,\n      'held_in_escrow',\n      p_stripe_payment_intent_id,\n      NOW()\n    ) RETURNING id INTO v_payment_id;\n\n    RAISE NOTICE '[CREATE_PAYMENT] Created payment % for job %', v_payment_id, p_job_id;\n\n    -- Get job title\n    SELECT title INTO v_job_title FROM jobs WHERE id = p_job_id;\n\n    -- Get or create wallet (RLS bypassed)\n    SELECT id INTO v_wallet_id\n    FROM wallets\n    WHERE tradesperson_id = p_tradesperson_id;\n\n    IF v_wallet_id IS NULL THEN\n      INSERT INTO wallets (\n        tradesperson_id,\n        total_balance,\n        available_balance,\n        locked_balance,\n        pending_balance,\n        frozen_balance,\n        currency\n      ) VALUES (\n        p_tradesperson_id,\n        0, 0, 0, 0, 0, p_currency\n      ) RETURNING id INTO v_wallet_id;\n\n      RAISE NOTICE '[CREATE_PAYMENT] Created wallet %', v_wallet_id;\n    END IF;\n\n    -- Update wallet locked balance\n    UPDATE wallets\n    SET\n      locked_balance = locked_balance + p_tradesperson_amount,\n      total_balance = total_balance + p_tradesperson_amount,\n      updated_at = NOW()\n    WHERE id = v_wallet_id;\n\n    -- Create wallet transaction\n    INSERT INTO wallet_transactions (\n      wallet_id,\n      tradesperson_id,\n      job_id,\n      type,\n      status,\n      amount,\n      gross_amount,\n      platform_fee,\n      net_amount,\n      description,\n      created_at,\n      updated_at\n    ) VALUES (\n      v_wallet_id,\n      p_tradesperson_id,\n      p_job_id,\n      'payment_in',\n      'locked',\n      p_tradesperson_amount,\n      p_amount,\n      p_platform_fee,\n      p_tradesperson_amount,\n      format('Payment for \"%s\" (Awaiting job completion)', COALESCE(v_job_title, 'Job')),\n      NOW(),\n      NOW()\n    );\n\n    RAISE NOTICE '[CREATE_PAYMENT] ✅ Created locked wallet transaction';\n\n    RETURN v_payment_id;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "create_tradesperson_notification",
    "arguments": "p_tradesperson_id uuid, p_type character varying, p_title character varying, p_message text, p_job_id uuid DEFAULT NULL::uuid, p_booking_id uuid DEFAULT NULL::uuid, p_conversation_id uuid DEFAULT NULL::uuid",
    "function_definition": "CREATE OR REPLACE FUNCTION public.create_tradesperson_notification(p_tradesperson_id uuid, p_type character varying, p_title character varying, p_message text, p_job_id uuid DEFAULT NULL::uuid, p_booking_id uuid DEFAULT NULL::uuid, p_conversation_id uuid DEFAULT NULL::uuid)\n RETURNS TABLE(id uuid, created_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\n  BEGIN\n    RETURN QUERY\n    INSERT INTO tradesperson_notifications (\n      tradesperson_id,\n      type,\n      title,\n      message,\n      job_id,\n      booking_id,\n      conversation_id\n    ) VALUES (\n      p_tradesperson_id,\n      p_type,\n      p_title,\n      p_message,\n      p_job_id,\n      p_booking_id,\n      p_conversation_id\n    )\n    RETURNING tradesperson_notifications.id, tradesperson_notifications.created_at;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "create_wallet_for_tradesperson",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.create_wallet_for_tradesperson()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\n  BEGIN\n    -- Only create wallet for tradespeople\n    IF NEW.user_type = 'tradesperson' THEN\n      INSERT INTO wallets (tradesperson_id)\n      VALUES (NEW.user_id)\n      ON CONFLICT (tradesperson_id) DO NOTHING;\n    END IF;\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "create_wallet_transaction",
    "arguments": "p_wallet_id uuid, p_type character varying, p_amount numeric, p_currency character varying, p_description text, p_reference_id uuid DEFAULT NULL::uuid, p_stripe_transfer_id text DEFAULT NULL::text",
    "function_definition": "CREATE OR REPLACE FUNCTION public.create_wallet_transaction(p_wallet_id uuid, p_type character varying, p_amount numeric, p_currency character varying, p_description text, p_reference_id uuid DEFAULT NULL::uuid, p_stripe_transfer_id text DEFAULT NULL::text)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\n  DECLARE\n    transaction_id UUID;\n    new_balance DECIMAL;\n  BEGIN\n    -- Calculate new balance\n    SELECT balance + p_amount INTO new_balance\n    FROM wallets\n    WHERE id = p_wallet_id;\n\n    -- Create transaction\n    INSERT INTO wallet_transactions (\n      wallet_id,\n      type,\n      amount,\n      currency,\n      description,\n      reference_id,\n      stripe_transfer_id,\n      balance_after\n    ) VALUES (\n      p_wallet_id,\n      p_type,\n      p_amount,\n      p_currency,\n      p_description,\n      p_reference_id,\n      p_stripe_transfer_id,\n      new_balance\n    )\n    RETURNING id INTO transaction_id;\n\n    -- Update wallet balance\n    UPDATE wallets\n    SET balance = new_balance,\n        updated_at = NOW()\n    WHERE id = p_wallet_id;\n\n    RETURN transaction_id;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "deduct_cancellation_penalty",
    "arguments": "p_tradesperson_id uuid, p_booking_id uuid, p_penalty_amount numeric, p_description text",
    "function_definition": "CREATE OR REPLACE FUNCTION public.deduct_cancellation_penalty(p_tradesperson_id uuid, p_booking_id uuid, p_penalty_amount numeric, p_description text)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\n  DECLARE\n    v_wallet_id UUID;\n    v_transaction_id UUID;\n    v_current_total NUMERIC;\n    v_job_id UUID;\n  BEGIN\n    SELECT job_id INTO v_job_id FROM bookings WHERE id = p_booking_id;\n\n    INSERT INTO wallets (tradesperson_id)\n    VALUES (p_tradesperson_id)\n    ON CONFLICT (tradesperson_id) DO UPDATE SET updated_at = NOW()\n    RETURNING id INTO v_wallet_id;\n\n    IF v_wallet_id IS NULL THEN\n      SELECT id INTO v_wallet_id FROM wallets WHERE tradesperson_id = p_tradesperson_id;\n    END IF;\n\n    UPDATE wallets SET\n      available_balance = available_balance - p_penalty_amount,\n      total_balance = total_balance - p_penalty_amount,\n      has_outstanding_debt = CASE\n        WHEN (available_balance - p_penalty_amount) < 0 THEN TRUE\n        ELSE has_outstanding_debt\n      END,\n      updated_at = NOW()\n    WHERE id = v_wallet_id;\n\n    SELECT total_balance INTO v_current_total FROM wallets WHERE id = v_wallet_id;\n\n    INSERT INTO wallet_transactions (\n      wallet_id, tradesperson_id, job_id, booking_id, type, amount, description, status, metadata, created_at, updated_at\n    ) VALUES (\n      v_wallet_id, p_tradesperson_id, v_job_id, p_booking_id, 'penalty', -p_penalty_amount, p_description, 'completed',\n      jsonb_build_object('booking_id', p_booking_id, 'job_id', v_job_id, 'balance_after', v_current_total, 'penalty_percentage', 15),\n      NOW(), NOW()\n    )\n    RETURNING id INTO v_transaction_id;\n\n    RETURN v_transaction_id;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "get_job_for_tradesperson",
    "arguments": "p_job_id uuid, p_tradesperson_id uuid",
    "function_definition": "CREATE OR REPLACE FUNCTION public.get_job_for_tradesperson(p_job_id uuid, p_tradesperson_id uuid)\n RETURNS TABLE(id uuid, street_address text, city text, state_county text, postcode text, country text, location_address text)\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\n  BEGIN\n    -- Check if the tradesperson has a confirmed booking for this job\n    IF EXISTS (\n      SELECT 1\n      FROM bookings\n      WHERE job_id = p_job_id\n      AND tradesperson_id = p_tradesperson_id\n      AND status IN ('scheduled', 'in_progress', 'completed')\n    ) THEN\n      -- Return the job location details\n      RETURN QUERY\n      SELECT\n        j.id,\n        j.street_address,\n        j.city,\n        j.state_county,\n        j.postcode,\n        j.country,\n        j.location_address\n      FROM jobs j\n      WHERE j.id = p_job_id;\n    ELSE\n      -- Return empty result if no valid booking exists\n      RETURN;\n    END IF;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "get_secret",
    "arguments": "secret_name text",
    "function_definition": "CREATE OR REPLACE FUNCTION public.get_secret(secret_name text)\n RETURNS text\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\n  DECLARE\n    secret_value text;\n  BEGIN\n    SELECT decrypted_secret INTO secret_value\n    FROM vault.decrypted_secrets\n    WHERE name = secret_name;\n\n    RETURN secret_value;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "get_tradesperson_review_stats",
    "arguments": "tradesperson_user_id uuid",
    "function_definition": "CREATE OR REPLACE FUNCTION public.get_tradesperson_review_stats(tradesperson_user_id uuid)\n RETURNS TABLE(average_rating numeric, review_count bigint)\n LANGUAGE plpgsql\n STABLE\nAS $function$\nBEGIN\n  RETURN QUERY\n  SELECT\n    COALESCE(ROUND(AVG(rating), 1), 0)::NUMERIC as average_rating,\n    COUNT(*)::BIGINT as review_count\n  FROM reviews\n  WHERE tradesperson_id = tradesperson_user_id\n    AND rating IS NOT NULL;\nEND;\n$function$\n",
    "volatility": "STABLE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "get_vault_secret",
    "arguments": "secret_name text",
    "function_definition": "CREATE OR REPLACE FUNCTION public.get_vault_secret(secret_name text)\n RETURNS text\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\n  DECLARE\n    secret_value TEXT;\n  BEGIN\n    SELECT decrypted_secret INTO secret_value\n    FROM vault.decrypted_secrets\n    WHERE name = secret_name;\n\n    RETURN secret_value;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "get_verification_stats",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.get_verification_stats()\n RETURNS TABLE(total_tradespeople bigint, incomplete bigint, pending_documents bigint, pending_verification bigint, verified bigint, verification_failed bigint, avg_verification_time_hours numeric)\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nBEGIN\n  RETURN QUERY\n  SELECT\n    COUNT(*) AS total_tradespeople,\n    COUNT(*) FILTER (WHERE verification_status = 'incomplete') AS incomplete,\n    COUNT(*) FILTER (WHERE verification_status = 'pending_documents') AS pending_documents,\n    COUNT(*) FILTER (WHERE verification_status = 'pending_verification') AS pending_verification,\n    COUNT(*) FILTER (WHERE verification_status = 'verified') AS verified,\n    COUNT(*) FILTER (WHERE verification_status = 'verification_failed') AS verification_failed,\n    AVG(\n      EXTRACT(EPOCH FROM (documents_verified_at - documents_submitted_at)) / 3600\n    ) FILTER (WHERE documents_verified_at IS NOT NULL) AS avg_verification_time_hours\n  FROM tradesperson_profiles;\nEND;\n$function$\n",
    "volatility": "VOLATILE",
    "description": "Get verification statistics for admin dashboard"
  },
  {
    "schema_name": "public",
    "function_name": "increment_portfolio_views",
    "arguments": "item_id uuid",
    "function_definition": "CREATE OR REPLACE FUNCTION public.increment_portfolio_views(item_id uuid)\n RETURNS void\n LANGUAGE plpgsql\nAS $function$\n  BEGIN\n    UPDATE portfolio_items\n    SET views_count = views_count + 1\n    WHERE id = item_id;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "is_admin",
    "arguments": "user_uuid uuid DEFAULT auth.uid()",
    "function_definition": "CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid DEFAULT auth.uid())\n RETURNS boolean\n LANGUAGE plpgsql\n STABLE SECURITY DEFINER\nAS $function$\nBEGIN\n  RETURN EXISTS (\n    SELECT 1 FROM admin_users WHERE user_id = user_uuid\n  );\nEND;\n$function$\n",
    "volatility": "STABLE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "populate_enterprise_id",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.populate_enterprise_id()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n  BEGIN\n    IF NEW.enterprise_id IS NULL THEN\n      SELECT enterprise_id INTO NEW.enterprise_id\n      FROM public.enterprise_employees\n      WHERE id = NEW.employee_id;\n    END IF;\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "process_payment_to_wallet",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.process_payment_to_wallet()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nDECLARE\n  v_amount_in_pence BIGINT;\n  v_platform_fee_pence BIGINT;\n  v_net_amount_pence BIGINT;\nBEGIN\n  -- Only process if payment was just marked as released\n  IF NEW.status = 'released' AND OLD.status != 'released' THEN\n\n    -- Convert agreed_price (in pounds) to pence\n    v_amount_in_pence := ROUND(NEW.agreed_price * 100);\n\n    -- Calculate platform fee (15%) in pence\n    v_platform_fee_pence := ROUND(v_amount_in_pence * 0.15);\n\n    -- Net amount after platform fee\n    v_net_amount_pence := v_amount_in_pence - v_platform_fee_pence;\n\n    -- Create wallet transaction (amounts are in pence)\n    INSERT INTO wallet_transactions (\n      user_id,\n      amount,\n      transaction_type,\n      status,\n      description,\n      reference_type,\n      reference_id,\n      created_at\n    ) VALUES (\n      NEW.tradesperson_id,\n      v_net_amount_pence,\n      'payment_received',\n      'completed',\n      'Payment for job #' || NEW.job_id,\n      'payment',\n      NEW.id,\n      NOW()\n    );\n\n    -- Update wallet balance (add net amount in pence)\n    INSERT INTO wallets (user_id, balance_pence, currency, created_at, updated_at)\n    VALUES (NEW.tradesperson_id, v_net_amount_pence, 'GBP', NOW(), NOW())\n    ON CONFLICT (user_id)\n    DO UPDATE SET\n      balance_pence = wallets.balance_pence + v_net_amount_pence,\n      updated_at = NOW();\n\n    RAISE NOTICE 'Wallet credited: user_id=%, amount_pence=%, platform_fee_pence=%',\n      NEW.tradesperson_id, v_net_amount_pence, v_platform_fee_pence;\n  END IF;\n\n  RETURN NEW;\nEND;\n$function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "record_job_payment",
    "arguments": "p_tradesperson_id uuid, p_booking_id uuid, p_gross_amount bigint, p_stripe_payment_intent_id text, p_description text DEFAULT 'Job payment held on platform'::text",
    "function_definition": "CREATE OR REPLACE FUNCTION public.record_job_payment(p_tradesperson_id uuid, p_booking_id uuid, p_gross_amount bigint, p_stripe_payment_intent_id text, p_description text DEFAULT 'Job payment held on platform'::text)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n  v_wallet_id UUID;\n  v_platform_fee BIGINT;\n  v_net_amount BIGINT;\n  v_transaction_id UUID;\nBEGIN\n  -- Calculate platform fee (15%)\n  v_platform_fee := FLOOR(p_gross_amount * 0.15);\n  v_net_amount := p_gross_amount - v_platform_fee;\n\n  -- Get or create wallet\n  INSERT INTO wallets (tradesperson_id)\n  VALUES (p_tradesperson_id)\n  ON CONFLICT (tradesperson_id) DO UPDATE SET updated_at = NOW()\n  RETURNING id INTO v_wallet_id;\n\n  IF v_wallet_id IS NULL THEN\n    SELECT id INTO v_wallet_id FROM wallets WHERE tradesperson_id = p_tradesperson_id;\n  END IF;\n\n  -- Create transaction record but DON'T add to balance yet\n  -- Funds are held on Stripe platform account until release\n  INSERT INTO wallet_transactions (\n    wallet_id,\n    tradesperson_id,\n    booking_id,\n    type,\n    amount,\n    balance_after,\n    gross_amount,\n    platform_fee,\n    net_amount,\n    description,\n    status,\n    available_at,\n    metadata,\n    created_at\n  )\n  SELECT\n    v_wallet_id,\n    p_tradesperson_id,\n    p_booking_id,\n    'payment_in',\n    v_net_amount,\n    total_balance, -- Balance doesn't change yet - funds on platform\n    p_gross_amount,\n    v_platform_fee,\n    v_net_amount,\n    p_description,\n    'held_on_platform', -- New status: funds on Stripe platform, not in wallet yet\n    NULL, -- available_at set when job completes\n    jsonb_build_object(\n      'stripe_payment_intent_id', p_stripe_payment_intent_id,\n      'status', 'held_on_platform',\n      'awaiting_job_completion', true\n    ),\n    NOW()\n  FROM wallets WHERE id = v_wallet_id\n  RETURNING id INTO v_transaction_id;\n\n  RETURN v_transaction_id;\nEND;\n$function$\n",
    "volatility": "VOLATILE",
    "description": "Records payment that is held on Stripe platform account (not yet in wallet)"
  },
  {
    "schema_name": "public",
    "function_name": "recover_debt_from_earnings",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.recover_debt_from_earnings()\n RETURNS trigger\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\n  DECLARE\n    v_wallet_total_balance NUMERIC;\n    v_wallet_available_balance NUMERIC;\n    v_has_debt BOOLEAN;\n    v_debt_amount NUMERIC;\n    v_recovery_amount NUMERIC;\n  BEGIN\n    -- Only process incoming payments (payment_in type)\n    -- Skip if type field doesn't exist or is not payment_in\n    IF TG_OP = 'INSERT' THEN\n      -- Check if this is a payment_in transaction\n      IF COALESCE(NEW.type, '') != 'payment_in' OR COALESCE(NEW.status, '') != 'completed' THEN\n        RETURN NEW;\n      END IF;\n    ELSE\n      -- For UPDATE operations, skip\n      RETURN NEW;\n    END IF;\n\n    -- Get current wallet state\n    SELECT\n      total_balance,\n      available_balance,\n      COALESCE(has_outstanding_debt, FALSE)\n    INTO\n      v_wallet_total_balance,\n      v_wallet_available_balance,\n      v_has_debt\n    FROM wallets\n    WHERE id = NEW.wallet_id;\n\n    -- Check if wallet has debt (negative balance or debt flag)\n    IF v_has_debt = TRUE OR v_wallet_total_balance < 0 THEN\n\n      -- Calculate debt amount (absolute value if negative)\n      v_debt_amount := ABS(LEAST(v_wallet_total_balance, 0));\n\n      -- Calculate how much we can recover from this payment\n      v_recovery_amount := LEAST(v_debt_amount, ABS(COALESCE(NEW.net_amount, NEW.amount)));\n\n      IF v_recovery_amount > 0 THEN\n        -- Log the debt recovery\n        RAISE NOTICE 'Recovering debt: £% from incoming payment of £%',\n          v_recovery_amount / 100.0,\n          ABS(COALESCE(NEW.net_amount, NEW.amount)) / 100.0;\n\n        -- Create debt recovery transaction\n        INSERT INTO wallet_transactions (\n          wallet_id,\n          tradesperson_id,\n          type,\n          amount,\n          description,\n          status,\n          metadata,\n          created_at,\n          updated_at\n        ) VALUES (\n          NEW.wallet_id,\n          NEW.tradesperson_id,\n          'debt_recovery',\n          -v_recovery_amount,\n          'Automatic debt recovery from incoming payment',\n          'completed',\n          jsonb_build_object(\n            'recovered_from_transaction_id', NEW.id,\n            'original_debt', v_debt_amount,\n            'recovered_amount', v_recovery_amount\n          ),\n          NOW(),\n          NOW()\n        );\n\n        -- Update wallet balances\n        UPDATE wallets\n        SET\n          available_balance = available_balance - v_recovery_amount,\n          total_balance = total_balance - v_recovery_amount,\n          has_outstanding_debt = CASE\n            WHEN (total_balance - v_recovery_amount) >= 0 THEN FALSE\n            ELSE TRUE\n          END,\n          updated_at = NOW()\n        WHERE id = NEW.wallet_id;\n\n        RAISE NOTICE 'Debt recovery complete. Remaining balance: £%',\n          (v_wallet_total_balance - v_recovery_amount) / 100.0;\n      END IF;\n    END IF;\n\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "reject_tradesperson_verification",
    "arguments": "p_tradesperson_id uuid, p_admin_id uuid, p_rejection_reason text, p_notes text DEFAULT NULL::text",
    "function_definition": "CREATE OR REPLACE FUNCTION public.reject_tradesperson_verification(p_tradesperson_id uuid, p_admin_id uuid, p_rejection_reason text, p_notes text DEFAULT NULL::text)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nBEGIN\n  -- Verify admin has permission\n  IF NOT EXISTS (\n    SELECT 1 FROM admin_users\n    WHERE user_id = p_admin_id\n    AND (permissions->>'verify_documents')::boolean = true\n  ) THEN\n    RAISE EXCEPTION 'Insufficient permissions';\n  END IF;\n\n  -- Reject all pending documents\n  UPDATE verification_documents\n  SET\n    status = 'rejected',\n    verified_by = p_admin_id,\n    verified_at = NOW(),\n    rejection_reason = p_rejection_reason,\n    updated_at = NOW()\n  WHERE tradesperson_id = p_tradesperson_id\n    AND status = 'pending';\n\n  -- Update tradesperson status\n  UPDATE tradesperson_profiles\n  SET\n    verification_status = 'verification_failed',\n    verification_notes = p_notes,\n    updated_at = NOW()\n  WHERE user_id = p_tradesperson_id;\n\n  -- Log audit trail\n  INSERT INTO admin_audit_log (admin_id, action, target_tradesperson_id, details)\n  VALUES (\n    p_admin_id,\n    'reject_all',\n    p_tradesperson_id,\n    jsonb_build_object('reason', p_rejection_reason, 'notes', p_notes)\n  );\n\n  RETURN TRUE;\nEND;\n$function$\n",
    "volatility": "VOLATILE",
    "description": "Reject documents and require re-upload"
  },
  {
    "schema_name": "public",
    "function_name": "release_pending_funds",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.release_pending_funds()\n RETURNS TABLE(transaction_id uuid, tradesperson_id uuid, amount numeric, released_at timestamp with time zone)\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\n  BEGIN\n    RETURN QUERY\n    WITH released_transactions AS (\n      SELECT\n        wt.id,\n        wt.tradesperson_id,\n        wt.amount,\n        NOW() as released_time\n      FROM wallet_transactions wt\n      WHERE wt.status = 'pending'\n        AND wt.available_at IS NOT NULL\n        AND wt.available_at <= NOW()\n      FOR UPDATE SKIP LOCKED\n    ),\n    updated_transactions AS (\n      UPDATE wallet_transactions wt\n      SET status = 'completed'\n      FROM released_transactions rt\n      WHERE wt.id = rt.id\n      RETURNING wt.id, wt.tradesperson_id, wt.amount, rt.released_time\n    ),\n    updated_wallets AS (\n      UPDATE wallets w\n      SET\n        available_balance = available_balance + subq.total_amount,\n        pending_balance = pending_balance - subq.total_amount,\n        updated_at = NOW()\n      FROM (\n        SELECT ut.tradesperson_id, SUM(ut.amount) as total_amount\n        FROM updated_transactions ut\n        GROUP BY ut.tradesperson_id\n      ) subq\n      WHERE w.tradesperson_id = subq.tradesperson_id\n    )\n    SELECT ut.id, ut.tradesperson_id, ut.amount, ut.released_time FROM updated_transactions ut;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "revoke_session",
    "arguments": "session_id uuid",
    "function_definition": "CREATE OR REPLACE FUNCTION public.revoke_session(session_id uuid)\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\n  BEGIN\n    UPDATE user_sessions\n    SET revoked_at = NOW()\n    WHERE id = session_id\n      AND user_id = auth.uid()\n      AND revoked_at IS NULL;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "start_hold_period_on_completion",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.start_hold_period_on_completion()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n  BEGIN\n    -- When job is marked as completed, start 7-day hold period\n    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN\n      -- Set completed_at\n      NEW.completed_at := NOW();\n\n      -- Update associated wallet transaction to set available_at (NOW + 7 days)\n      -- Use job_id to match the booking's job\n      UPDATE wallet_transactions\n      SET\n        status = 'pending', -- Change from 'held_on_platform' to 'pending'\n        available_at = NOW() + INTERVAL '7 days',\n        metadata = jsonb_set(\n          COALESCE(metadata, '{}'::jsonb),\n          '{status}',\n          '\"pending_transfer\"'::jsonb\n        )\n      WHERE job_id = NEW.job_id  -- FIXED: Use job_id instead of booking_id\n        AND status = 'held_on_platform';\n    END IF;\n\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "submit_for_verification",
    "arguments": "p_tradesperson_id uuid",
    "function_definition": "CREATE OR REPLACE FUNCTION public.submit_for_verification(p_tradesperson_id uuid)\n RETURNS boolean\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\nDECLARE\n  v_identity_count INTEGER;\n  v_address_count INTEGER;\n  v_business_count INTEGER;\nBEGIN\n  -- Check if minimum documents uploaded (1 per category)\n  SELECT\n    COUNT(*) FILTER (WHERE category = 'identity'),\n    COUNT(*) FILTER (WHERE category = 'proof_of_address'),\n    COUNT(*) FILTER (WHERE category = 'business')\n  INTO v_identity_count, v_address_count, v_business_count\n  FROM verification_documents\n  WHERE tradesperson_id = p_tradesperson_id\n    AND status = 'pending';\n\n  IF v_identity_count < 1 OR v_address_count < 1 OR v_business_count < 1 THEN\n    RAISE EXCEPTION 'Minimum 1 document per category required';\n  END IF;\n\n  -- Update tradesperson verification status\n  UPDATE tradesperson_profiles\n  SET\n    verification_status = 'pending_verification',\n    documents_submitted_at = NOW(),\n    updated_at = NOW()\n  WHERE user_id = p_tradesperson_id;\n\n  RETURN TRUE;\nEND;\n$function$\n",
    "volatility": "VOLATILE",
    "description": "Mark documents as submitted for admin review"
  },
  {
    "schema_name": "public",
    "function_name": "sync_portfolio_likes_count",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.sync_portfolio_likes_count()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n  BEGIN\n    IF TG_OP = 'INSERT' THEN\n      UPDATE portfolio_items\n      SET likes_count = likes_count + 1\n      WHERE id = NEW.portfolio_item_id;\n    ELSIF TG_OP = 'DELETE' THEN\n      UPDATE portfolio_items\n      SET likes_count = likes_count - 1\n      WHERE id = OLD.portfolio_item_id;\n    END IF;\n    RETURN NULL;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "update_booking_completed_at",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.update_booking_completed_at()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN\n    NEW.completed_at := NOW();\n  END IF;\n  RETURN NEW;\nEND;\n$function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "update_change_order_invoices_updated_at",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.update_change_order_invoices_updated_at()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n  NEW.updated_at = NOW();\n  RETURN NEW;\nEND;\n$function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "update_conversation_timestamp",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.update_conversation_timestamp()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n  BEGIN\n    UPDATE conversations\n    SET updated_at = NOW()\n    WHERE id = NEW.conversation_id;\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "update_employee_last_active",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.update_employee_last_active()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n  BEGIN\n    UPDATE public.enterprise_employees\n    SET last_active_at = NOW()\n    WHERE id = NEW.employee_id;\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "update_notification_preferences_updated_at",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.update_notification_preferences_updated_at()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n  BEGIN\n    NEW.updated_at = NOW();\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "update_payments_updated_at",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.update_payments_updated_at()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n  BEGIN\n    NEW.updated_at = NOW();\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "update_portfolio_updated_at",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.update_portfolio_updated_at()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n  BEGIN\n    NEW.updated_at = NOW();\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "update_session_activity",
    "arguments": "token text",
    "function_definition": "CREATE OR REPLACE FUNCTION public.update_session_activity(token text)\n RETURNS void\n LANGUAGE plpgsql\n SECURITY DEFINER\nAS $function$\n  BEGIN\n    UPDATE user_sessions\n    SET last_active = NOW()\n    WHERE access_token = token\n      AND revoked_at IS NULL;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "update_updated_at",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.update_updated_at()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n  BEGIN\n    NEW.updated_at = NOW();\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "update_updated_at_column",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.update_updated_at_column()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\n  BEGIN\n    NEW.updated_at = NOW();\n    RETURN NEW;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "update_verification_updated_at",
    "arguments": "",
    "function_definition": "CREATE OR REPLACE FUNCTION public.update_verification_updated_at()\n RETURNS trigger\n LANGUAGE plpgsql\nAS $function$\nBEGIN\n  NEW.updated_at = NOW();\n  RETURN NEW;\nEND;\n$function$\n",
    "volatility": "VOLATILE",
    "description": null
  },
  {
    "schema_name": "public",
    "function_name": "upsert_wallet",
    "arguments": "p_tradesperson_id uuid, p_stripe_account_id text DEFAULT NULL::text, p_stripe_account_status text DEFAULT NULL::text",
    "function_definition": "CREATE OR REPLACE FUNCTION public.upsert_wallet(p_tradesperson_id uuid, p_stripe_account_id text DEFAULT NULL::text, p_stripe_account_status text DEFAULT NULL::text)\n RETURNS uuid\n LANGUAGE plpgsql\n SECURITY DEFINER\n SET search_path TO 'public'\nAS $function$\n  DECLARE\n    wallet_id UUID;\n  BEGIN\n    INSERT INTO wallets (\n      tradesperson_id,\n      stripe_account_id,\n      stripe_account_status,\n      balance\n    ) VALUES (\n      p_tradesperson_id,\n      p_stripe_account_id,\n      p_stripe_account_status,\n      0\n    )\n    ON CONFLICT (tradesperson_id) DO UPDATE SET\n      stripe_account_id = COALESCE(EXCLUDED.stripe_account_id, wallets.stripe_account_id),\n      stripe_account_status = COALESCE(EXCLUDED.stripe_account_status, wallets.stripe_account_status),\n      updated_at = NOW()\n    RETURNING id INTO wallet_id;\n\n    RETURN wallet_id;\n  END;\n  $function$\n",
    "volatility": "VOLATILE",
    "description": null
  }
]
[
  {
    "schema_name": "public",
    "table_name": "admin_users",
    "trigger_name": "trigger_admin_users_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trigger_admin_users_updated_at BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION update_verification_updated_at()"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "trigger_name": "trigger_auto_add_to_wallet",
    "trigger_level": "ROW",
    "trigger_timing": "AFTER",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trigger_auto_add_to_wallet AFTER UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION auto_add_to_wallet_on_completion()"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "trigger_name": "trigger_start_hold_period",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trigger_start_hold_period BEFORE UPDATE ON public.bookings FOR EACH ROW WHEN ((new.status IS DISTINCT FROM old.status)) EXECUTE FUNCTION start_hold_period_on_completion()"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "trigger_name": "update_bookings_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "trigger_name": "trg_update_change_order_invoices_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trg_update_change_order_invoices_updated_at BEFORE UPDATE ON public.change_order_invoices FOR EACH ROW EXECUTE FUNCTION update_change_order_invoices_updated_at()"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "trigger_name": "update_change_order_invoices_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER update_change_order_invoices_updated_at BEFORE UPDATE ON public.change_order_invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "trigger_name": "update_customer_profiles_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER update_customer_profiles_updated_at BEFORE UPDATE ON public.customer_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "trigger_name": "trigger_document_requirements_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trigger_document_requirements_updated_at BEFORE UPDATE ON public.document_requirements FOR EACH ROW EXECUTE FUNCTION update_verification_updated_at()"
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "trigger_name": "trigger_fuel_entries_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trigger_fuel_entries_updated_at BEFORE UPDATE ON public.employee_fuel_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at()"
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "trigger_name": "trigger_update_last_active_fuel",
    "trigger_level": "ROW",
    "trigger_timing": "AFTER",
    "trigger_event": "INSERT",
    "trigger_definition": "CREATE TRIGGER trigger_update_last_active_fuel AFTER INSERT ON public.employee_fuel_entries FOR EACH ROW EXECUTE FUNCTION update_employee_last_active()"
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "trigger_name": "trigger_supplies_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trigger_supplies_updated_at BEFORE UPDATE ON public.employee_supplies FOR EACH ROW EXECUTE FUNCTION update_updated_at()"
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "trigger_name": "trigger_update_last_active_supply",
    "trigger_level": "ROW",
    "trigger_timing": "AFTER",
    "trigger_event": "INSERT",
    "trigger_definition": "CREATE TRIGGER trigger_update_last_active_supply AFTER INSERT ON public.employee_supplies FOR EACH ROW EXECUTE FUNCTION update_employee_last_active()"
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "trigger_name": "trigger_calculate_hours",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "MULTIPLE",
    "trigger_definition": "CREATE TRIGGER trigger_calculate_hours BEFORE INSERT OR UPDATE ON public.employee_time_entries FOR EACH ROW EXECUTE FUNCTION calculate_time_entry_hours()"
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "trigger_name": "trigger_time_entries_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trigger_time_entries_updated_at BEFORE UPDATE ON public.employee_time_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at()"
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "trigger_name": "trigger_update_last_active_time",
    "trigger_level": "ROW",
    "trigger_timing": "AFTER",
    "trigger_event": "INSERT",
    "trigger_definition": "CREATE TRIGGER trigger_update_last_active_time AFTER INSERT ON public.employee_time_entries FOR EACH ROW EXECUTE FUNCTION update_employee_last_active()"
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "trigger_name": "trigger_employees_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trigger_employees_updated_at BEFORE UPDATE ON public.enterprise_employees FOR EACH ROW EXECUTE FUNCTION update_updated_at()"
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "trigger_name": "trigger_enterprise_jobs_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trigger_enterprise_jobs_updated_at BEFORE UPDATE ON public.enterprise_jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at()"
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "trigger_name": "trigger_enterprises_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trigger_enterprises_updated_at BEFORE UPDATE ON public.enterprises FOR EACH ROW EXECUTE FUNCTION update_updated_at()"
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "trigger_name": "auto_create_quote_on_acceptance",
    "trigger_level": "ROW",
    "trigger_timing": "AFTER",
    "trigger_event": "MULTIPLE",
    "trigger_definition": "CREATE TRIGGER auto_create_quote_on_acceptance AFTER INSERT OR UPDATE ON public.job_applications FOR EACH ROW EXECUTE FUNCTION auto_create_quote_on_acceptance()"
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "trigger_name": "update_job_applications_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON public.job_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "trigger_name": "update_job_categories_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER update_job_categories_updated_at BEFORE UPDATE ON public.job_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "trigger_name": "update_jobs_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "trigger_name": "on_message_insert",
    "trigger_level": "ROW",
    "trigger_timing": "AFTER",
    "trigger_event": "INSERT",
    "trigger_definition": "CREATE TRIGGER on_message_insert AFTER INSERT ON public.messages FOR EACH ROW WHEN ((new.conversation_id IS NOT NULL)) EXECUTE FUNCTION update_conversation_timestamp()"
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "trigger_name": "update_messages_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON public.messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "trigger_name": "update_notification_preferences_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON public.notification_preferences FOR EACH ROW EXECUTE FUNCTION update_notification_preferences_updated_at()"
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "trigger_name": "payments_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION update_payments_updated_at()"
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "trigger_name": "trg_process_payment_to_wallet",
    "trigger_level": "ROW",
    "trigger_timing": "AFTER",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trg_process_payment_to_wallet AFTER UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION process_payment_to_wallet()"
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "trigger_name": "trigger_auto_accept_quote",
    "trigger_level": "ROW",
    "trigger_timing": "AFTER",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trigger_auto_accept_quote AFTER UPDATE ON public.payments FOR EACH ROW WHEN ((new.status = 'held_in_escrow'::text)) EXECUTE FUNCTION auto_accept_quote_on_payment()"
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "trigger_name": "trigger_auto_create_booking",
    "trigger_level": "ROW",
    "trigger_timing": "AFTER",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trigger_auto_create_booking AFTER UPDATE ON public.payments FOR EACH ROW WHEN ((new.status = 'held_in_escrow'::text)) EXECUTE FUNCTION auto_create_booking_on_payment()"
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "trigger_name": "trigger_auto_create_escrow_pool",
    "trigger_level": "ROW",
    "trigger_timing": "AFTER",
    "trigger_event": "MULTIPLE",
    "trigger_definition": "CREATE TRIGGER trigger_auto_create_escrow_pool AFTER INSERT OR UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION auto_create_escrow_pool_on_payment()"
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "trigger_name": "portfolio_items_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER portfolio_items_updated_at BEFORE UPDATE ON public.portfolio_items FOR EACH ROW EXECUTE FUNCTION update_portfolio_updated_at()"
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_likes",
    "trigger_name": "portfolio_likes_sync",
    "trigger_level": "ROW",
    "trigger_timing": "AFTER",
    "trigger_event": "MULTIPLE",
    "trigger_definition": "CREATE TRIGGER portfolio_likes_sync AFTER INSERT OR DELETE ON public.portfolio_likes FOR EACH ROW EXECUTE FUNCTION sync_portfolio_likes_count()"
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "trigger_name": "update_quotes_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON public.quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "trigger_name": "update_reviews_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "trigger_name": "create_wallet_on_tradesperson_profile",
    "trigger_level": "ROW",
    "trigger_timing": "AFTER",
    "trigger_event": "INSERT",
    "trigger_definition": "CREATE TRIGGER create_wallet_on_tradesperson_profile AFTER INSERT ON public.tradesperson_profiles FOR EACH ROW EXECUTE FUNCTION create_wallet_for_tradesperson()"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "trigger_name": "update_tradesperson_profiles_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER update_tradesperson_profiles_updated_at BEFORE UPDATE ON public.tradesperson_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()"
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "trigger_name": "trigger_verification_documents_updated_at",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trigger_verification_documents_updated_at BEFORE UPDATE ON public.verification_documents FOR EACH ROW EXECUTE FUNCTION update_verification_updated_at()"
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "trigger_name": "trigger_recover_debt_from_earnings",
    "trigger_level": "ROW",
    "trigger_timing": "AFTER",
    "trigger_event": "INSERT",
    "trigger_definition": "CREATE TRIGGER trigger_recover_debt_from_earnings AFTER INSERT ON public.wallet_transactions FOR EACH ROW EXECUTE FUNCTION recover_debt_from_earnings()"
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "trigger_name": "trigger_recover_debt",
    "trigger_level": "ROW",
    "trigger_timing": "BEFORE",
    "trigger_event": "UPDATE",
    "trigger_definition": "CREATE TRIGGER trigger_recover_debt BEFORE UPDATE ON public.wallets FOR EACH ROW WHEN ((new.pending_balance IS DISTINCT FROM old.pending_balance)) EXECUTE FUNCTION recover_debt_from_earnings()"
  }
]
[
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "policy_name": "Admins can view own audit logs",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "SELECT",
    "using_expression": "(admin_id = auth.uid())",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "policy_name": "Super admins can view all audit logs",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "SELECT",
    "using_expression": "is_admin()",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "admin_users",
    "policy_name": "Admins can view own admin record",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "SELECT",
    "using_expression": "(user_id = auth.uid())",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "policy_name": "Users can create bookings",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "((auth.uid() = customer_id) OR (auth.uid() = tradesperson_id))"
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "policy_name": "Users can update own bookings",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "((auth.uid() = customer_id) OR (auth.uid() = tradesperson_id))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "policy_name": "Users can view own bookings",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "((auth.uid() = customer_id) OR (auth.uid() = tradesperson_id))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "policy_name": "Customers can approve/reject change order invoices",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "((EXISTS ( SELECT 1\n   FROM jobs j\n  WHERE ((j.id = change_order_invoices.job_id) AND (j.customer_id = auth.uid())))) AND ((status)::text = 'submitted'::text))",
    "with_check_expression": "(EXISTS ( SELECT 1\n   FROM jobs j\n  WHERE ((j.id = change_order_invoices.job_id) AND (j.customer_id = auth.uid()))))"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "policy_name": "Customers can update submitted change order invoices",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "((auth.uid() IN ( SELECT jobs.customer_id\n   FROM jobs\n  WHERE (jobs.id = change_order_invoices.job_id))) AND ((status)::text = 'submitted'::text))",
    "with_check_expression": "((auth.uid() IN ( SELECT jobs.customer_id\n   FROM jobs\n  WHERE (jobs.id = change_order_invoices.job_id))) AND ((status)::text = ANY ((ARRAY['approved'::character varying, 'rejected'::character varying, 'paid'::character varying])::text[])))"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "policy_name": "Customers can view change order invoices for their jobs",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() IN ( SELECT jobs.customer_id\n   FROM jobs\n  WHERE (jobs.id = change_order_invoices.job_id)))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "policy_name": "Tradespeople can create own change order invoices",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "policy_name": "Tradespeople can create their own change order invoices",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "policy_name": "Tradespeople can delete their own draft change order invoices",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "DELETE",
    "using_expression": "((auth.uid() = tradesperson_id) AND ((status)::text = 'draft'::text))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "policy_name": "Tradespeople can update own draft/rejected change order invoice",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "((auth.uid() = tradesperson_id) AND ((status)::text = ANY ((ARRAY['draft'::character varying, 'rejected'::character varying])::text[])))",
    "with_check_expression": "(auth.uid() = tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "policy_name": "Tradespeople can update their own draft change order invoices",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "((auth.uid() = tradesperson_id) AND ((status)::text = ANY ((ARRAY['draft'::character varying, 'rejected'::character varying])::text[])))",
    "with_check_expression": "((auth.uid() = tradesperson_id) AND ((status)::text = ANY ((ARRAY['draft'::character varying, 'submitted'::character varying, 'rejected'::character varying])::text[])))"
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "policy_name": "Tradespeople can view own change order invoices",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "policy_name": "Tradespeople can view their own change order invoices",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "policy_name": "Users can create conversations",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "((auth.uid() = participant1_id) OR (auth.uid() = participant2_id))"
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "policy_name": "Users can update their own conversations",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "((auth.uid() = participant1_id) OR (auth.uid() = participant2_id))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "policy_name": "Users can view their own conversations",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "((auth.uid() = participant1_id) OR (auth.uid() = participant2_id))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "policy_name": "Users can insert their own customer profile",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "policy_name": "Users can update their own customer profile",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "policy_name": "Users can view all customer profiles",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "true",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "policy_name": "Anyone can view document requirements",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "SELECT",
    "using_expression": "true",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "policy_name": "Super admins can modify document requirements",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "ALL",
    "using_expression": "(EXISTS ( SELECT 1\n   FROM admin_users\n  WHERE ((admin_users.user_id = auth.uid()) AND (admin_users.role = 'super_admin'::text))))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "policy_name": "Employees can insert their own fuel entries",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(employee_id IN ( SELECT enterprise_employees.id\n   FROM enterprise_employees\n  WHERE (enterprise_employees.user_id = auth.uid())))"
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "policy_name": "Employees can update their own pending fuel entries",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "((employee_id IN ( SELECT enterprise_employees.id\n   FROM enterprise_employees\n  WHERE (enterprise_employees.user_id = auth.uid()))) AND (status = 'pending'::text))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "policy_name": "Employees can view their own fuel entries",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(employee_id IN ( SELECT enterprise_employees.id\n   FROM enterprise_employees\n  WHERE (enterprise_employees.user_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "policy_name": "Enterprise owners can view all fuel entries",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(enterprise_id IN ( SELECT enterprises.id\n   FROM enterprises\n  WHERE (enterprises.tradesperson_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "policy_name": "Employees can insert their own location",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(employee_id IN ( SELECT enterprise_employees.id\n   FROM enterprise_employees\n  WHERE (enterprise_employees.user_id = auth.uid())))"
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "policy_name": "Enterprise owners can view employee locations",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(enterprise_id IN ( SELECT enterprises.id\n   FROM enterprises\n  WHERE (enterprises.tradesperson_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "policy_name": "Employees can insert their own supplies",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(employee_id IN ( SELECT enterprise_employees.id\n   FROM enterprise_employees\n  WHERE (enterprise_employees.user_id = auth.uid())))"
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "policy_name": "Employees can update their own pending supplies",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "((employee_id IN ( SELECT enterprise_employees.id\n   FROM enterprise_employees\n  WHERE (enterprise_employees.user_id = auth.uid()))) AND (status = 'pending'::text))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "policy_name": "Employees can view their own supplies",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(employee_id IN ( SELECT enterprise_employees.id\n   FROM enterprise_employees\n  WHERE (enterprise_employees.user_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "policy_name": "Enterprise owners can view all supplies",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(enterprise_id IN ( SELECT enterprises.id\n   FROM enterprises\n  WHERE (enterprises.tradesperson_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "policy_name": "Employees can insert their own time entries",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(employee_id IN ( SELECT enterprise_employees.id\n   FROM enterprise_employees\n  WHERE (enterprise_employees.user_id = auth.uid())))"
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "policy_name": "Employees can update their own time entries",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(employee_id IN ( SELECT enterprise_employees.id\n   FROM enterprise_employees\n  WHERE (enterprise_employees.user_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "policy_name": "Employees can view their own time entries",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(employee_id IN ( SELECT enterprise_employees.id\n   FROM enterprise_employees\n  WHERE (enterprise_employees.user_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "policy_name": "Enterprise owners can view all time entries",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(enterprise_id IN ( SELECT enterprises.id\n   FROM enterprises\n  WHERE (enterprises.tradesperson_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "policy_name": "Employees can view their own record",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(user_id = auth.uid())",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "policy_name": "Enterprise owners can delete employees",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "DELETE",
    "using_expression": "(enterprise_id IN ( SELECT enterprises.id\n   FROM enterprises\n  WHERE (enterprises.tradesperson_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "policy_name": "Enterprise owners can insert employees",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(enterprise_id IN ( SELECT enterprises.id\n   FROM enterprises\n  WHERE (enterprises.tradesperson_id = auth.uid())))"
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "policy_name": "Enterprise owners can update employees",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(enterprise_id IN ( SELECT enterprises.id\n   FROM enterprises\n  WHERE (enterprises.tradesperson_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "policy_name": "Enterprise owners can view their employees",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(enterprise_id IN ( SELECT enterprises.id\n   FROM enterprises\n  WHERE (enterprises.tradesperson_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "policy_name": "Employees can view their assigned jobs",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(assigned_employee_id IN ( SELECT enterprise_employees.id\n   FROM enterprise_employees\n  WHERE (enterprise_employees.user_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "policy_name": "Enterprise owners can manage enterprise jobs",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "ALL",
    "using_expression": "(enterprise_id IN ( SELECT enterprises.id\n   FROM enterprises\n  WHERE (enterprises.tradesperson_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "policy_name": "Enterprise owners can view all enterprise jobs",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(enterprise_id IN ( SELECT enterprises.id\n   FROM enterprises\n  WHERE (enterprises.tradesperson_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "policy_name": "Tradespeople can insert their own enterprise",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "policy_name": "Tradespeople can update their own enterprise",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "policy_name": "Tradespeople can view their own enterprise",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "policy_name": "Customers can update applications for their jobs",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(EXISTS ( SELECT 1\n   FROM jobs\n  WHERE ((jobs.id = job_applications.job_id) AND (jobs.customer_id = auth.uid()))))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "policy_name": "Job owners and applicants can view applications",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "((auth.uid() = tradesperson_id) OR (auth.uid() IN ( SELECT jobs.customer_id\n   FROM jobs\n  WHERE (jobs.id = job_applications.job_id))))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "policy_name": "Job owners view applications",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(EXISTS ( SELECT 1\n   FROM jobs\n  WHERE ((jobs.id = job_applications.job_id) AND (jobs.customer_id = auth.uid()))))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "policy_name": "Tradespeople can apply",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "policy_name": "Tradespeople can insert their own applications",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "policy_name": "Tradespeople can update their own applications",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "policy_name": "Tradespeople update own applications",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "policy_name": "Tradespeople view own applications",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "policy_name": "Anyone can view categories",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(is_active = true)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "policy_name": "Anyone can view open jobs",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(status = 'open'::text)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "policy_name": "Customers can create jobs",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = customer_id)"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "policy_name": "Customers can delete own jobs",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "DELETE",
    "using_expression": "(auth.uid() = customer_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "policy_name": "Customers can delete their own jobs",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "DELETE",
    "using_expression": "(auth.uid() = customer_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "policy_name": "Customers can insert their own jobs",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = customer_id)"
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "policy_name": "Customers can update own jobs",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = customer_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "policy_name": "Customers can update their own jobs",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = customer_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "policy_name": "Customers can view own jobs",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = customer_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "policy_name": "Tradespeople can view jobs they have change orders for",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(EXISTS ( SELECT 1\n   FROM change_orders\n  WHERE ((change_orders.job_id = jobs.id) AND (change_orders.tradesperson_id = auth.uid()))))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "policy_name": "Anyone can insert login history",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "true"
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "policy_name": "Users can view their own login history",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "policy_name": "Users can send messages",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = sender_id)"
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "policy_name": "Users can update received messages",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = recipient_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "policy_name": "Users can view their own messages",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "((auth.uid() = sender_id) OR (auth.uid() = recipient_id))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "policy_name": "Users can read own notification logs",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "policy_name": "Users can delete own notification preferences",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "DELETE",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "policy_name": "Users can insert own notification preferences",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "policy_name": "Users can read own notification preferences",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "policy_name": "Users can update own notification preferences",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": "(auth.uid() = user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "policy_name": "notification_preferences_insert_policy",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "true"
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "policy_name": "notification_preferences_select_policy",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "policy_name": "notification_preferences_update_policy",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "policy_name": "Users update own notifications",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "policy_name": "Users view own notifications",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "policy_name": "Customers can create payments",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = customer_id)"
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "policy_name": "Prevent direct payment inserts",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "false"
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "policy_name": "Prevent direct payment updates",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "UPDATE",
    "using_expression": "false",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "policy_name": "Service role full access",
    "permissive": "PERMISSIVE",
    "roles": "{service_role}",
    "command": "ALL",
    "using_expression": "true",
    "with_check_expression": "true"
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "policy_name": "System can update payments",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "((auth.uid() = customer_id) OR (auth.uid() = tradesperson_id))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "policy_name": "Users can view own payments",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "SELECT",
    "using_expression": "((auth.uid() = customer_id) OR (auth.uid() = tradesperson_id))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "policy_name": "Users can view their own payments",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "((auth.uid() = customer_id) OR (auth.uid() = tradesperson_id))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "policy_name": "Tradespeople can create their own payouts",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "policy_name": "Tradespeople can view their own payouts",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "policy_name": "Anyone can view visible portfolio items",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(is_visible = true)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "policy_name": "Tradespeople can delete their own portfolio",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "DELETE",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "policy_name": "Tradespeople can insert portfolio items",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "policy_name": "Tradespeople can update their own portfolio",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": "(auth.uid() = tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "policy_name": "Tradespeople can view their own portfolio",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_likes",
    "policy_name": "Anyone can view portfolio likes",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "true",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_likes",
    "policy_name": "Users can like portfolio items",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_likes",
    "policy_name": "Users can unlike portfolio items",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "DELETE",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "policy_name": "Customers respond to quotes",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = customer_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "policy_name": "Customers view quotes",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = customer_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "policy_name": "Tradespeople create quotes",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "policy_name": "Tradespeople update quotes",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "policy_name": "Tradespeople view own quotes",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "saved_tradespeople",
    "policy_name": "Customers save tradespeople",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = customer_id)"
  },
  {
    "schema_name": "public",
    "table_name": "saved_tradespeople",
    "policy_name": "Customers unsave tradespeople",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "DELETE",
    "using_expression": "(auth.uid() = customer_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "saved_tradespeople",
    "policy_name": "Customers view saved",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = customer_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "policy_name": "tradesperson_notifications_delete_policy",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "DELETE",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "policy_name": "tradesperson_notifications_insert_policy",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "true"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "policy_name": "tradesperson_notifications_select_policy",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "policy_name": "tradesperson_notifications_update_policy",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": "(auth.uid() = tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "policy_name": "Users can insert their own tradesperson profile",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "policy_name": "Users can update their own tradesperson profile",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "policy_name": "Users can view all tradesperson profiles",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "true",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "policy_name": "Users can delete their own sessions",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "DELETE",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "policy_name": "Users can insert their own sessions",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = user_id)"
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "policy_name": "Users can update their own sessions",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "policy_name": "Users can view their own sessions",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = user_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "policy_name": "Admins can update document verification status",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "UPDATE",
    "using_expression": "is_admin()",
    "with_check_expression": "is_admin()"
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "policy_name": "Admins can view all verification documents",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "SELECT",
    "using_expression": "is_admin()",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "policy_name": "Tradespeople can delete own pending documents",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "DELETE",
    "using_expression": "((tradesperson_id = auth.uid()) AND (status = 'pending'::text))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "policy_name": "Tradespeople can update own pending documents",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "UPDATE",
    "using_expression": "((tradesperson_id = auth.uid()) AND (status = 'pending'::text))",
    "with_check_expression": "(tradesperson_id = auth.uid())"
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "policy_name": "Tradespeople can upload own documents",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(tradesperson_id = auth.uid())"
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "policy_name": "Tradespeople can view own verification documents",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "SELECT",
    "using_expression": "(tradesperson_id = auth.uid())",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "policy_name": "Tradespeople can view their own transactions",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "policy_name": "wallet_transactions_select_policy",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "SELECT",
    "using_expression": "(wallet_id IN ( SELECT wallets.id\n   FROM wallets\n  WHERE (wallets.tradesperson_id = auth.uid())))",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "policy_name": "Tradespeople can create their own wallet",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "(auth.uid() = tradesperson_id)"
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "policy_name": "Tradespeople can update their own wallet",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "policy_name": "Tradespeople can view their own wallet",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "policy_name": "wallets_insert_policy",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "INSERT",
    "using_expression": null,
    "with_check_expression": "true"
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "policy_name": "wallets_select_policy",
    "permissive": "PERMISSIVE",
    "roles": "{authenticated}",
    "command": "SELECT",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": null
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "policy_name": "wallets_update_policy",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "command": "UPDATE",
    "using_expression": "(auth.uid() = tradesperson_id)",
    "with_check_expression": "(auth.uid() = tradesperson_id)"
  }
]
[
  {
    "id": "avatars",
    "name": "avatars",
    "owner": null,
    "public": true,
    "file_size_limit": 5242880,
    "allowed_mime_types": [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp"
    ],
    "created_at": "2025-10-15 03:04:43.187275+00",
    "updated_at": "2025-10-15 03:04:43.187275+00"
  },
  {
    "id": "job-images",
    "name": "job-images",
    "owner": null,
    "public": true,
    "file_size_limit": null,
    "allowed_mime_types": null,
    "created_at": "2025-10-13 02:39:45.505133+00",
    "updated_at": "2025-10-13 02:39:45.505133+00"
  },
  {
    "id": "portfolio-images",
    "name": "portfolio-images",
    "owner": null,
    "public": true,
    "file_size_limit": null,
    "allowed_mime_types": null,
    "created_at": "2025-10-16 01:46:30.510997+00",
    "updated_at": "2025-10-16 01:46:30.510997+00"
  },
  {
    "id": "verification-documents",
    "name": "verification-documents",
    "owner": null,
    "public": false,
    "file_size_limit": null,
    "allowed_mime_types": null,
    "created_at": "2025-10-16 21:18:39.101567+00",
    "updated_at": "2025-10-16 21:18:39.101567+00"
  }
]
[
  {
    "schema_name": "public",
    "table_name": "admin_audit_log",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "admin_users",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "booking_disputes",
    "rls_enabled": false,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "bookings",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "change_order_invoices",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "change_orders",
    "rls_enabled": false,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "conversations",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "customer_profiles",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "document_requirements",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "employee_fuel_entries",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "employee_locations",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "employee_supplies",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "employee_time_entries",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_employees",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "enterprise_jobs",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "enterprises",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "escrow_pools",
    "rls_enabled": false,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "hourly_invoices",
    "rls_enabled": false,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "job_applications",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "job_categories",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "job_photos",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "jobs",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "login_history",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "messages",
    "rls_enabled": false,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "milestones",
    "rls_enabled": false,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "notification_logs",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "notification_preferences",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "notifications",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "payment_preferences",
    "rls_enabled": false,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "payments",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "payouts",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_items",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "portfolio_likes",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "quotes",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "reviews",
    "rls_enabled": false,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "saved_tradespeople",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "time_clock_entries",
    "rls_enabled": false,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_notifications",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "tradesperson_profiles",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "trigger_debug_log",
    "rls_enabled": false,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "trigger_execution_log",
    "rls_enabled": false,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "user_sessions",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "verification_documents",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "wallet_transactions",
    "rls_enabled": true,
    "rls_forced": false
  },
  {
    "schema_name": "public",
    "table_name": "wallets",
    "rls_enabled": true,
    "rls_forced": false
  }
]
