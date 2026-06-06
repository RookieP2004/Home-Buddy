'use server'

import { auth } from '@/lib/auth'
import { stripe, createOrGetCustomer, createCheckoutSession } from '@/lib/stripe'
import { SUBSCRIPTION_PLANS, getPlanById } from '@/lib/subscriptions'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { subscription } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

/**
 * Start a subscription checkout session
 */
export async function startSubscriptionCheckout(
  planId: string,
  baseUrl: string
) {
  const userId = await getUserId()
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user?.email) {
    throw new Error('User email not found')
  }

  const plan = getPlanById(planId)
  if (!plan || !plan.stripePriceId) {
    throw new Error('Invalid plan or plan not yet configured')
  }

  // Create or get Stripe customer
  const stripeCustomer = await createOrGetCustomer(
    session.user.email,
    session.user.name || undefined
  )

  // Create checkout session
  const checkoutSession = await createCheckoutSession({
    customerId: stripeCustomer.id,
    priceId: plan.stripePriceId,
    successUrl: `${baseUrl}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${baseUrl}/dashboard?tab=subscriptions`,
    userId,
  })

  return {
    sessionId: checkoutSession.id,
    url: checkoutSession.url,
  }
}

/**
 * Verify subscription and save to database
 */
export async function verifyAndSaveSubscription(sessionId: string) {
  const userId = await getUserId()

  try {
    // Get checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)

    if (!checkoutSession.subscription) {
      throw new Error('No subscription found in checkout session')
    }

    // Get subscription details
    const stripeSubscription = await stripe.subscriptions.retrieve(
      checkoutSession.subscription as string
    )

    // Find which plan this subscription is for
    const planPrice = stripeSubscription.items.data[0]?.price.id
    const plan = SUBSCRIPTION_PLANS.find((p) => p.stripePriceId === planPrice)

    if (!plan) {
      throw new Error('Plan not found for this subscription')
    }

    // Check if user already has an active subscription
    const existingSubscription = await db
      .select()
      .from(subscription)
      .where(eq(subscription.userId, userId))
      .limit(1)

    if (existingSubscription.length > 0) {
      // Update existing subscription
      await db
        .update(subscription)
        .set({
          planType: plan.id,
          stripeSubscriptionId: stripeSubscription.id,
          status: stripeSubscription.status === 'active' ? 'active' : 'paused',
          renewalDate: new Date(stripeSubscription.current_period_end * 1000),
          monthlyHours: plan.monthlyHours,
          price: plan.priceInCents.toString(),
          updatedAt: new Date(),
        })
        .where(eq(subscription.userId, userId))
    } else {
      // Create new subscription record
      const { v4: uuidv4 } = await import('uuid')
      await db.insert(subscription).values({
        id: uuidv4(),
        userId,
        planType: plan.id,
        billingCycle: 'monthly',
        status: stripeSubscription.status === 'active' ? 'active' : 'paused',
        monthlyHours: plan.monthlyHours,
        price: plan.priceInCents.toString(),
        stripeSubscriptionId: stripeSubscription.id,
        startDate: new Date(),
        renewalDate: new Date(stripeSubscription.current_period_end * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return {
      success: true,
      plan: plan.name,
      subscriptionId: stripeSubscription.id,
    }
  } catch (error) {
    console.error('Failed to verify subscription:', error)
    throw error
  }
}

/**
 * Cancel user's subscription
 */
export async function cancelUserSubscription() {
  const userId = await getUserId()

  try {
    // Get user's subscription from database
    const userSubscription = await db
      .select()
      .from(subscription)
      .where(eq(subscription.userId, userId))
      .limit(1)

    if (!userSubscription.length || !userSubscription[0].stripeSubscriptionId) {
      throw new Error('No active subscription found')
    }

    // Cancel with Stripe
    await stripe.subscriptions.update(userSubscription[0].stripeSubscriptionId, {
      cancel_at_period_end: true,
    })

    // Update database
    await db
      .update(subscription)
      .set({
        status: 'cancelled',
        cancellationDate: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(subscription.userId, userId))

    return { success: true }
  } catch (error) {
    console.error('Failed to cancel subscription:', error)
    throw error
  }
}

/**
 * Get user's subscription details from Stripe
 */
export async function getUserSubscriptionDetails() {
  const userId = await getUserId()

  try {
    const userSubscription = await db
      .select()
      .from(subscription)
      .where(eq(subscription.userId, userId))
      .limit(1)

    if (!userSubscription.length) {
      return null
    }

    const sub = userSubscription[0]

    if (sub.stripeSubscriptionId) {
      const stripeSubscription = await stripe.subscriptions.retrieve(
        sub.stripeSubscriptionId
      )

      return {
        id: sub.id,
        planType: sub.planType,
        status: sub.status,
        currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        monthlyHours: sub.monthlyHours,
        price: sub.price,
        stripeSubscriptionId: sub.stripeSubscriptionId,
      }
    }

    return {
      id: sub.id,
      planType: sub.planType,
      status: sub.status,
      monthlyHours: sub.monthlyHours,
      price: sub.price,
    }
  } catch (error) {
    console.error('Failed to get subscription details:', error)
    return null
  }
}

/**
 * Create a payment intent for wallet top-up or one-time service
 */
export async function createPaymentIntentForWallet(amountInDollars: number) {
  const userId = await getUserId()
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user?.email) {
    throw new Error('User email not found')
  }

  try {
    // Create or get Stripe customer
    const stripeCustomer = await createOrGetCustomer(
      session.user.email,
      session.user.name || undefined
    )

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amountInDollars * 100), // Convert to cents
      currency: 'usd',
      customer: stripeCustomer.id,
      description: `HomeBuddy Wallet Top-up`,
      metadata: {
        userId,
        type: 'wallet_topup',
      },
    })

    return {
      clientSecret: paymentIntent.client_secret,
      amount: amountInDollars,
    }
  } catch (error) {
    console.error('Failed to create payment intent:', error)
    throw error
  }
}
