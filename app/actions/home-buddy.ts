'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import {
  userProfile,
  helper,
  booking,
  subscription,
  payment,
  review,
  notification,
  service,
  wallet,
  attendanceTracking,
} from '@/lib/db/schema'
import { and, desc, eq, gte, lte, like, sql } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'

/**
 * Resolve the current user id from the Better Auth session.
 * Every server action that touches user data MUST go through this helper
 * — it is the only thing standing between one user and another's rows.
 */
async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

// ============================================================================
// User Profile Actions
// ============================================================================

export async function createOrUpdateUserProfile(data: {
  userType: string
  phoneNumber?: string
  profilePhoto?: string
  bio?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
}) {
  const userId = await getUserId()

  const existingProfile = await db
    .select()
    .from(userProfile)
    .where(eq(userProfile.userId, userId))
    .limit(1)

  if (existingProfile.length > 0) {
    await db
      .update(userProfile)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(userProfile.userId, userId))
  } else {
    await db.insert(userProfile).values({
      id: uuidv4(),
      userId,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  revalidatePath('/dashboard')
}

export async function getUserProfile() {
  const userId = await getUserId()
  const profile = await db
    .select()
    .from(userProfile)
    .where(eq(userProfile.userId, userId))
    .limit(1)

  return profile[0] || null
}

// ============================================================================
// Helper Profile Actions
// ============================================================================

export async function becomeAHelper(data: {
  hourlyRate: number
  yearsOfExperience?: number
  responseTime?: number
  availability?: Record<string, unknown>
}) {
  const userId = await getUserId()

  // Create or get user profile
  let profile = await db
    .select()
    .from(userProfile)
    .where(eq(userProfile.userId, userId))
    .limit(1)

  if (!profile.length) {
    const profileId = uuidv4()
    await db.insert(userProfile).values({
      id: profileId,
      userId,
      userType: 'helper',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    profile = await db
      .select()
      .from(userProfile)
      .where(eq(userProfile.id, profileId))
      .limit(1)
  } else if (profile[0].userType === 'customer') {
    await db
      .update(userProfile)
      .set({ userType: 'both' })
      .where(eq(userProfile.id, profile[0].id))
  }

  // Create helper record
  const existingHelper = await db
    .select()
    .from(helper)
    .where(eq(helper.userId, userId))
    .limit(1)

  if (existingHelper.length > 0) {
    await db
      .update(helper)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(helper.userId, userId))
  } else {
    await db.insert(helper).values({
      id: uuidv4(),
      userId,
      userProfileId: profile[0].id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  revalidatePath('/dashboard')
}

export async function getHelperProfile() {
  const userId = await getUserId()
  const helperProfile = await db
    .select()
    .from(helper)
    .where(eq(helper.userId, userId))
    .limit(1)

  return helperProfile[0] || null
}

// ============================================================================
// Booking Actions
// ============================================================================

export async function createBooking(data: {
  helperId: string
  serviceId: string
  scheduledStartTime: Date
  scheduledEndTime: Date
  address: string
  notes?: string
  totalPrice: number
}) {
  const customerId = await getUserId()

  const bookingId = uuidv4()
  await db.insert(booking).values({
    id: bookingId,
    customerId,
    ...data,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  // Create notification for helper
  await db.insert(notification).values({
    id: uuidv4(),
    userId: data.helperId,
    type: 'booking_request',
    title: 'New Booking Request',
    message: 'You have received a new booking request',
    relatedId: bookingId,
    createdAt: new Date(),
  })

  revalidatePath('/bookings')
  return bookingId
}

export async function getMyBookings() {
  const userId = await getUserId()
  const myBookings = await db
    .select()
    .from(booking)
    .where(eq(booking.customerId, userId))
    .orderBy(desc(booking.createdAt))

  return myBookings
}

export async function getBookingsAsHelper() {
  const userId = await getUserId()
  const helperBookings = await db
    .select()
    .from(booking)
    .where(eq(booking.helperId, userId))
    .orderBy(desc(booking.createdAt))

  return helperBookings
}

export async function updateBookingStatus(
  bookingId: string,
  status: string
) {
  const userId = await getUserId()

  // Verify user is either the helper or customer of this booking
  const bookingRecord = await db
    .select()
    .from(booking)
    .where(eq(booking.id, bookingId))
    .limit(1)

  if (!bookingRecord.length) throw new Error('Booking not found')

  const b = bookingRecord[0]
  if (b.customerId !== userId && b.helperId !== userId) {
    throw new Error('Unauthorized')
  }

  await db
    .update(booking)
    .set({ status, updatedAt: new Date() })
    .where(eq(booking.id, bookingId))

  revalidatePath('/bookings')
  revalidatePath('/dashboard')
}

export async function rateAndReviewBooking(
  bookingId: string,
  data: {
    rating: number
    review?: string
  }
) {
  const reviewerId = await getUserId()

  const bookingRecord = await db
    .select()
    .from(booking)
    .where(eq(booking.id, bookingId))
    .limit(1)

  if (!bookingRecord.length) throw new Error('Booking not found')

  const b = bookingRecord[0]
  if (b.customerId !== reviewerId) throw new Error('Only customer can review')

  // Update booking with rating and review
  await db
    .update(booking)
    .set({ rating: data.rating.toString(), review: data.review, updatedAt: new Date() })
    .where(eq(booking.id, bookingId))

  // Create review record
  await db.insert(review).values({
    id: uuidv4(),
    bookingId,
    reviewerId,
    revieweeId: b.helperId,
    rating: data.rating.toString(),
    comment: data.review,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  revalidatePath('/bookings')
}

// ============================================================================
// Subscription Actions
// ============================================================================

export async function createSubscription(data: {
  planType: 'standard' | 'premium' | 'family'
  billingCycle: 'monthly' | 'yearly'
  monthlyHours: number
  price: number
  stripeSubscriptionId?: string
}) {
  const userId = await getUserId()

  const subscriptionId = uuidv4()
  await db.insert(subscription).values({
    id: subscriptionId,
    userId,
    ...data,
    startDate: new Date(),
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  revalidatePath('/dashboard')
  return subscriptionId
}

export async function getUserSubscription() {
  const userId = await getUserId()
  const userSub = await db
    .select()
    .from(subscription)
    .where(and(eq(subscription.userId, userId), eq(subscription.status, 'active')))
    .limit(1)

  return userSub[0] || null
}

export async function cancelSubscription() {
  const userId = await getUserId()

  await db
    .update(subscription)
    .set({ status: 'cancelled', cancellationDate: new Date(), updatedAt: new Date() })
    .where(and(eq(subscription.userId, userId), eq(subscription.status, 'active')))

  revalidatePath('/dashboard')
}

// ============================================================================
// Payment Actions
// ============================================================================

export async function createPayment(data: {
  bookingId?: string
  amount: number
  paymentMethod: string
  stripePaymentId?: string
  description?: string
}) {
  const userId = await getUserId()

  const paymentId = uuidv4()
  await db.insert(payment).values({
    id: paymentId,
    userId,
    ...data,
    status: 'pending',
    transactionDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return paymentId
}

export async function getPaymentHistory() {
  const userId = await getUserId()
  const payments = await db
    .select()
    .from(payment)
    .where(eq(payment.userId, userId))
    .orderBy(desc(payment.createdAt))

  return payments
}

export async function updatePaymentStatus(paymentId: string, status: string) {
  const userId = await getUserId()

  // Verify user owns this payment
  const paymentRecord = await db
    .select()
    .from(payment)
    .where(eq(payment.id, paymentId))
    .limit(1)

  if (!paymentRecord.length || paymentRecord[0].userId !== userId) {
    throw new Error('Unauthorized')
  }

  await db
    .update(payment)
    .set({ status, updatedAt: new Date() })
    .where(eq(payment.id, paymentId))

  revalidatePath('/dashboard')
}

// ============================================================================
// Notification Actions
// ============================================================================

export async function getNotifications() {
  const userId = await getUserId()
  const notifications = await db
    .select()
    .from(notification)
    .where(eq(notification.userId, userId))
    .orderBy(desc(notification.createdAt))
    .limit(50)

  return notifications
}

export async function markNotificationAsRead(notificationId: string) {
  const userId = await getUserId()

  // Verify user owns this notification
  const notif = await db
    .select()
    .from(notification)
    .where(eq(notification.id, notificationId))
    .limit(1)

  if (!notif.length || notif[0].userId !== userId) {
    throw new Error('Unauthorized')
  }

  await db
    .update(notification)
    .set({ isRead: true })
    .where(eq(notification.id, notificationId))
}

// ============================================================================
// Wallet Actions
// ============================================================================

export async function getOrCreateWallet() {
  const userId = await getUserId()

  let userWallet = await db
    .select()
    .from(wallet)
    .where(eq(wallet.userId, userId))
    .limit(1)

  if (!userWallet.length) {
    await db.insert(wallet).values({
      id: uuidv4(),
      userId,
      balance: '0',
      totalDeposited: '0',
      totalSpent: '0',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    userWallet = await db
      .select()
      .from(wallet)
      .where(eq(wallet.userId, userId))
      .limit(1)
  }

  return userWallet[0] || null
}

export async function addToWallet(amount: number) {
  const userId = await getUserId()

  const userWallet = await getOrCreateWallet()

  if (userWallet) {
    const newBalance = (parseFloat(userWallet.balance as unknown as string) + amount).toFixed(2)
    const newDeposited = (parseFloat(userWallet.totalDeposited as unknown as string) + amount).toFixed(2)

    await db
      .update(wallet)
      .set({
        balance: newBalance,
        totalDeposited: newDeposited,
        updatedAt: new Date(),
      })
      .where(eq(wallet.userId, userId))

    revalidatePath('/dashboard')
  }
}

// ============================================================================
// Service Actions
// ============================================================================

export async function getAllServices() {
  const services = await db
    .select()
    .from(service)
    .where(eq(service.isActive, true))

  return services
}

// ============================================================================
// Attendance Tracking Actions
// ============================================================================

export async function recordCheckIn(bookingId: string) {
  const userId = await getUserId()

  const existingAttendance = await db
    .select()
    .from(attendanceTracking)
    .where(eq(attendanceTracking.bookingId, bookingId))
    .limit(1)

  if (existingAttendance.length > 0) {
    await db
      .update(attendanceTracking)
      .set({ checkInTime: new Date(), updatedAt: new Date() })
      .where(eq(attendanceTracking.bookingId, bookingId))
  } else {
    // Get booking to get customer and helper IDs
    const bookingRecord = await db
      .select()
      .from(booking)
      .where(eq(booking.id, bookingId))
      .limit(1)

    if (bookingRecord.length > 0) {
      const b = bookingRecord[0]
      await db.insert(attendanceTracking).values({
        id: uuidv4(),
        bookingId,
        customerId: b.customerId,
        helperId: b.helperId,
        checkInTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }

  revalidatePath('/dashboard')
}

export async function recordCheckOut(bookingId: string) {
  const userId = await getUserId()

  const attendance = await db
    .select()
    .from(attendanceTracking)
    .where(eq(attendanceTracking.bookingId, bookingId))
    .limit(1)

  if (attendance.length > 0) {
    const checkInTime = attendance[0].checkInTime
    let hoursWorked = 0

    if (checkInTime) {
      const checkOutTime = new Date()
      const diffMs = checkOutTime.getTime() - checkInTime.getTime()
      hoursWorked = parseFloat((diffMs / (1000 * 60 * 60)).toFixed(2))
    }

    await db
      .update(attendanceTracking)
      .set({ checkOutTime: new Date(), hoursWorked: hoursWorked.toString(), updatedAt: new Date() })
      .where(eq(attendanceTracking.bookingId, bookingId))

    revalidatePath('/dashboard')
  }
}
