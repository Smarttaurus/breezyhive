import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

// Client-side Stripe instance
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
}

// Subscription pricing based on company size
export const SUBSCRIPTION_PRICES = {
  '1-10': {
    amount: 2999, // £29.99 in pence
    currency: 'gbp',
    interval: 'month',
  },
  '11-50': {
    amount: 4999, // £49.99
    currency: 'gbp',
    interval: 'month',
  },
  '51-200': {
    amount: 9999, // £99.99
    currency: 'gbp',
    interval: 'month',
  },
  '201-500': {
    amount: 15999, // £159.99
    currency: 'gbp',
    interval: 'month',
  },
  '500+': {
    amount: 0, // Contact us - no automatic pricing
    currency: 'gbp',
    interval: 'month',
  },
} as const

export type CompanySize = keyof typeof SUBSCRIPTION_PRICES
