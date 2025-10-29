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

  // Marketing
  agreeToMarketing?: boolean
}

export const authService = {
  /**
   * Register a new enterprise/business account
   */
  async registerBusiness(data: RegisterData) {
    try {
      console.log('Starting registration for:', data.email)

      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            user_type: 'enterprise',
          },
        },
      })

      console.log('Auth response:', { authData, authError })

      if (authError) {
        console.error('Auth error details:', JSON.stringify(authError, null, 2))
        throw authError
      }
      if (!authData.user) throw new Error('Failed to create user')

      // 2. Create tradesperson_profiles record (business owner)
      const { error: tradespersonError } = await supabase
        .from('tradesperson_profiles')
        .insert({
          user_id: authData.user.id,
          business_name: data.businessName,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          trade: data.businessType,
          country: 'GB',
          is_enterprise_owner: true,
          registered_via: 'website',
        })

      if (tradespersonError) {
        console.error('Tradesperson profile error:', tradespersonError)
        console.error('Full error details:', JSON.stringify(tradespersonError, null, 2))
        throw new Error(`Failed to create business profile: ${tradespersonError.message || tradespersonError.code}`)
      }

      // 3. Create enterprises record
      const { error: enterpriseError } = await supabase
        .from('enterprises')
        .insert({
          tradesperson_id: authData.user.id,
          business_name: data.businessName,
          address: data.address,
          city: data.city,
          postcode: data.postcode,
          phone: data.phone,
          email: data.email,
          industry: data.businessType,
          company_size: data.companySize,
          job_title: data.jobTitle,
          marketing_consent: data.agreeToMarketing || false,
          country: 'GB',
          registered_via: 'website',
        })

      if (enterpriseError) {
        console.error('Enterprise error:', enterpriseError)
        console.error('Full error details:', JSON.stringify(enterpriseError, null, 2))
        throw new Error(`Failed to create enterprise account: ${enterpriseError.message || enterpriseError.code}`)
      }

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
