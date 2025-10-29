import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@14.11.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2025-09-30.clover',
  httpClient: Stripe.createFetchHttpClient(),
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CheckoutRequest {
  companySize: string
  customerId: string
  customerEmail: string
  trialDays?: number
}

const SUBSCRIPTION_PRICES: Record<string, { amount: number; currency: string; interval: string }> = {
  '1-10': { amount: 2999, currency: 'gbp', interval: 'month' },
  '11-50': { amount: 4999, currency: 'gbp', interval: 'month' },
  '51-200': { amount: 9999, currency: 'gbp', interval: 'month' },
  '201-500': { amount: 15999, currency: 'gbp', interval: 'month' },
  '500+': { amount: 0, currency: 'gbp', interval: 'month' },
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Received request to create checkout session')
    const { companySize, customerId, customerEmail, trialDays = 14 }: CheckoutRequest = await req.json()
    console.log('Request data:', { companySize, customerId, customerEmail, trialDays })

    // Validate company size
    if (!companySize || !(companySize in SUBSCRIPTION_PRICES)) {
      return new Response(
        JSON.stringify({ error: 'Invalid company size' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Handle "Contact us" tier
    if (companySize === '500+') {
      return new Response(
        JSON.stringify({ error: 'This plan requires manual setup. Please contact us.' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const pricing = SUBSCRIPTION_PRICES[companySize]
    const origin = req.headers.get('origin') || 'https://breezyhive.com'

    console.log('Creating Stripe session with pricing:', pricing)
    console.log('Stripe API Key present:', !!Deno.env.get('STRIPE_SECRET_KEY'))

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: pricing.currency,
            product_data: {
              name: `BreezyHive Enterprise - ${companySize} employees`,
              description: `Monthly subscription for ${companySize} employees with 14-day free trial`,
            },
            unit_amount: pricing.amount,
            recurring: {
              interval: pricing.interval as 'month',
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: trialDays,
        metadata: {
          customer_id: customerId,
          company_size: companySize,
        },
      },
      customer_email: customerEmail,
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/business/register?canceled=true`,
      metadata: {
        customer_id: customerId,
        company_size: companySize,
      },
    })

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  } catch (error: any) {
    console.error('Stripe checkout session creation failed:', error)
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      stack: error.stack
    })
    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to create checkout session',
        details: error.type || 'Unknown error type'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
