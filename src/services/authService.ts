import { supabase } from '@/lib/supabase'

export interface RegisterData {
  // Business Info
  businessName: string
  businessType: string
  companySize: string
  address: string
  city: string
  postcode: string

  // Contact Info
  firstName: string
  lastName: string
  email: string
  phone: string
  jobTitle: string

  // Password
  password: string
}

export const authService = {
  /**
   * Register a new enterprise/business account
   */
  async registerBusiness(data: RegisterData) {
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            user_type: 'business',
          },
        },
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('Failed to create user')

      // 2. Create business profile
      // TODO: Insert into business_profiles table when schema is provided
      // const { error: profileError } = await supabase
      //   .from('business_profiles')
      //   .insert({
      //     user_id: authData.user.id,
      //     business_name: data.businessName,
      //     business_type: data.businessType,
      //     company_size: data.companySize,
      //     address: data.address,
      //     city: data.city,
      //     postcode: data.postcode,
      //     first_name: data.firstName,
      //     last_name: data.lastName,
      //     phone: data.phone,
      //     job_title: data.jobTitle,
      //   })

      // if (profileError) throw profileError

      return { user: authData.user, session: authData.session }
    } catch (error: any) {
      console.error('Registration error:', error)
      throw new Error(error.message || 'Failed to register')
    }
  },

  /**
   * Sign in existing user
   */
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { user: data.user, session: data.session }
    } catch (error: any) {
      console.error('Sign in error:', error)
      throw new Error(error.message || 'Failed to sign in')
    }
  },

  /**
   * Sign out current user
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error: any) {
      console.error('Sign out error:', error)
      throw new Error(error.message || 'Failed to sign out')
    }
  },

  /**
   * Get current session
   */
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      return data.session
    } catch (error: any) {
      console.error('Get session error:', error)
      return null
    }
  },

  /**
   * Get current user
   */
  async getUser() {
    try {
      const { data, error } = await supabase.auth.getUser()
      if (error) throw error
      return data.user
    } catch (error: any) {
      console.error('Get user error:', error)
      return null
    }
  },
}
