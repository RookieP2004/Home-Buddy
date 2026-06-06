export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  priceInCents: number // Monthly price
  monthlyHours: number
  features: string[]
  stripeProductId?: string
  stripePriceId?: string
}

// HomeBuddy subscription plans
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'For occasional help',
    priceInCents: 1999, // $19.99/hour - this will be used for hourly bookings
    monthlyHours: 0, // Pay-as-you-go
    features: [
      'Instant booking',
      'Verified helpers',
      'Same-day service',
      'Flexible scheduling',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For regular help',
    priceInCents: 9900, // $99/month
    monthlyHours: 10,
    features: [
      '10 hours/month',
      'Priority booking',
      'Dedicated helpers',
      '20% discount on extra hours',
      'Early booking access',
      'Premium support',
    ],
    stripeProductId: 'prod_premium_homebuddy', // To be set from Stripe dashboard
    stripePriceId: 'price_premium_monthly', // To be set from Stripe dashboard
  },
  {
    id: 'family',
    name: 'Family',
    description: 'For regular family help',
    priceInCents: 24900, // $249/month
    monthlyHours: 999, // Unlimited
    features: [
      'Unlimited hours',
      'Multiple helpers',
      'Priority 24/7 support',
      'Helper replacement guarantee',
      'Flexible scheduling',
      'Invoice management',
      'Dedicated account manager',
    ],
    stripeProductId: 'prod_family_homebuddy', // To be set from Stripe dashboard
    stripePriceId: 'price_family_monthly', // To be set from Stripe dashboard
  },
]

export function getPlanById(id: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find((plan) => plan.id === id)
}

export function getPlanByStripeProductId(productId: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find((plan) => plan.stripeProductId === productId)
}

export function getPlanByStripePriceId(priceId: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find((plan) => plan.stripePriceId === priceId)
}
