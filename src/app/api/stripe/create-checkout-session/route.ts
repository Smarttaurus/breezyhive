import { NextRequest, NextResponse } from 'next/server'
import { stripe, SUBSCRIPTION_PRICES, type CompanySize } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const {
      companySize,
      customerId,
      customerEmail,
      trialDays = 14,
    } = await request.json()

    // Validate company size
    if (!companySize || !(companySize in SUBSCRIPTION_PRICES)) {
      return NextResponse.json(
        { error: 'Invalid company size' },
        { status: 400 }
      )
    }

    // Handle "Contact us" tier
    if (companySize === '500+') {
      return NextResponse.json(
        { error: 'This plan requires manual setup. Please contact us.' },
        { status: 400 }
      )
    }

    const pricing = SUBSCRIPTION_PRICES[companySize as CompanySize]

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
      success_url: `${request.headers.get('origin')}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/business/register?canceled=true`,
      metadata: {
        customer_id: customerId,
        company_size: companySize,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout session creation failed:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
