import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
})

export async function createCheckoutSession(options: {
  customerId?: string
  priceId: string
  successUrl: string
  cancelUrl: string
  userId: string
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: options.priceId,
          quantity: 1,
        },
      ],
      success_url: options.successUrl,
      cancel_url: options.cancelUrl,
      customer: options.customerId,
      metadata: {
        userId: options.userId,
      },
    })

    return session
  } catch (error) {
    console.error('Failed to create checkout session:', error)
    throw error
  }
}

export async function createOrGetCustomer(email: string, name?: string) {
  try {
    // Search for existing customer
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    })

    if (customers.data.length > 0) {
      return customers.data[0]
    }

    // Create new customer
    return await stripe.customers.create({
      email,
      name,
    })
  } catch (error) {
    console.error('Failed to create or get customer:', error)
    throw error
  }
}

export async function getCustomerByEmail(email: string) {
  try {
    const customers = await stripe.customers.list({
      email,
      limit: 1,
    })

    return customers.data[0] || null
  } catch (error) {
    console.error('Failed to get customer:', error)
    return null
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })
  } catch (error) {
    console.error('Failed to cancel subscription:', error)
    throw error
  }
}

export async function getSubscription(subscriptionId: string) {
  try {
    return await stripe.subscriptions.retrieve(subscriptionId)
  } catch (error) {
    console.error('Failed to get subscription:', error)
    throw error
  }
}

export async function createPaymentIntent(options: {
  amount: number // in cents
  customerId: string
  description?: string
  metadata?: Record<string, string>
}) {
  try {
    return await stripe.paymentIntents.create({
      amount: options.amount,
      currency: 'usd',
      customer: options.customerId,
      description: options.description,
      metadata: options.metadata,
    })
  } catch (error) {
    console.error('Failed to create payment intent:', error)
    throw error
  }
}

export async function refundPayment(paymentIntentId: string, amountInCents?: number) {
  try {
    return await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amountInCents,
    })
  } catch (error) {
    console.error('Failed to refund payment:', error)
    throw error
  }
}
