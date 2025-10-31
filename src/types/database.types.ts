// Database types for BreezyHive Enterprise Platform
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ExpenseStatus = 'pending' | 'approved' | 'rejected' | 'reimbursed';
export type FuelType = 'petrol' | 'diesel' | 'electric';
export type SupplyCategory = 'materials' | 'tools' | 'equipment' | 'hardware';
export type JobStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type JobPriority = 'low' | 'medium' | 'high' | 'urgent';
export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'temporary';

// Existing table: employee_supplies (from mobile app)
export interface EmployeeSupply {
  id: string;
  employee_id: string;
  enterprise_id: string;
  job_id: string | null;
  supplier_name: string;
  purchase_date: string;
  description: string;
  category: SupplyCategory;
  quantity: number;
  unit: string;
  amount: number;
  currency: string;
  tax_amount: number | null;
  receipt_photo_urls: string[];
  invoice_number: string | null;
  notes: string | null;
  status: ExpenseStatus;
  created_at: string;
}

// Existing table: employee_fuel_entries (from mobile app)
export interface EmployeeFuelEntry {
  id: string;
  employee_id: string;
  enterprise_id: string;
  job_id: string | null;
  fuel_date: string;
  station_name: string;
  fuel_type: FuelType;
  latitude: number;
  longitude: number;
  address: string | null;
  litres: number;
  price_per_litre: number;
  total_amount: number;
  currency: string;
  vehicle_registration: string | null;
  odometer_reading: number | null;
  receipt_photo_url: string | null;
  notes: string | null;
  status: ExpenseStatus;
  created_at: string;
}

// Union type for all expenses
export type Expense = (EmployeeSupply & { expense_type: 'supply' }) | (EmployeeFuelEntry & { expense_type: 'fuel' });

// Extended types with employee info
export interface EmployeeSupplyWithEmployee extends EmployeeSupply {
  employee: {
    first_name: string;
    last_name: string;
    email: string;
    avatar_url?: string;
  };
  job?: {
    title: string;
    location: string;
  };
}

export interface EmployeeFuelEntryWithEmployee extends EmployeeFuelEntry {
  employee: {
    first_name: string;
    last_name: string;
    email: string;
    avatar_url?: string;
  };
  job?: {
    title: string;
    location: string;
  };
}

export interface ExpenseStats {
  total_expenses: number;
  pending_expenses: number;
  approved_expenses: number;
  rejected_expenses: number;
  total_amount: number;
  pending_amount: number;
  approved_amount: number;
  reimbursed_amount: number;
}

export interface ExpenseBreakdown {
  expense_type: string;
  count: number;
  total_amount: number;
}

export interface TopSpender {
  employee_id: string;
  employee_name: string;
  total_expenses: number;
  total_amount: number;
}

export interface MonthlyTrend {
  month: string;
  total_expenses: number;
  total_amount: number;
}

export interface EnterpriseEmployee {
  id: string;
  enterprise_id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: string;
  employment_type: EmploymentType;
  hourly_rate: number | null;
  hire_date: string;
  avatar_url: string | null;
  can_create_jobs: boolean;
  can_view_all_jobs: boolean;
  can_approve_expenses: boolean;
  is_active: boolean;
  created_at: string;
}

export interface EnterpriseJob {
  id: string;
  enterprise_id: string;
  title: string;
  description: string | null;
  location: string;
  status: JobStatus;
  priority: JobPriority;
  due_date: string | null;
  estimated_hours: number | null;
  budget: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Enterprise {
  id: string;
  tradesperson_id: string;
  business_name: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  email: string;
  industry: string | null;
  company_size: string | null;
  job_title: string | null;
  country: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_status: string | null;
  trial_ends_at: string | null;
  canceled_at: string | null;
  last_payment_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      employee_supplies: {
        Row: EmployeeSupply;
        Insert: Omit<EmployeeSupply, 'id' | 'created_at'>;
        Update: Partial<Omit<EmployeeSupply, 'id' | 'created_at'>>;
      };
      employee_fuel_entries: {
        Row: EmployeeFuelEntry;
        Insert: Omit<EmployeeFuelEntry, 'id' | 'created_at'>;
        Update: Partial<Omit<EmployeeFuelEntry, 'id' | 'created_at'>>;
      };
      enterprise_employees: {
        Row: EnterpriseEmployee;
        Insert: Omit<EnterpriseEmployee, 'id' | 'created_at'>;
        Update: Partial<Omit<EnterpriseEmployee, 'id' | 'created_at'>>;
      };
      enterprise_jobs: {
        Row: EnterpriseJob;
        Insert: Omit<EnterpriseJob, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<EnterpriseJob, 'id' | 'created_at'>>;
      };
      enterprises: {
        Row: Enterprise;
        Insert: Omit<Enterprise, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Enterprise, 'id' | 'created_at'>>;
      };
    };
    Views: {
      // Views will be defined here
    };
    Functions: {
      // Database functions will be added as needed
    };
    Enums: {
      expense_status: ExpenseStatus;
      fuel_type: FuelType;
      supply_category: SupplyCategory;
      job_status: JobStatus;
      job_priority: JobPriority;
    };
  };
}
