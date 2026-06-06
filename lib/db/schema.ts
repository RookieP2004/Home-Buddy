import { pgTable, text, timestamp, boolean, decimal, integer, jsonb, date } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------
// Add your app tables below. Always include a plain `userId` column so queries
// can be scoped per user — the security model depends on this column existing,
// not on a foreign key. Do NOT add a foreign key constraint
// (`.references(() => user.id, ...)`) unless the user explicitly asks for
// foreign keys or referential integrity; FK constraints make iterating on the
// schema harder.
//
// Example:
//
// import { serial } from "drizzle-orm/pg-core"
//
// export const todos = pgTable("todos", {
//   id: serial("id").primaryKey(),
//   userId: text("userId").notNull(),
//   title: text("title").notNull(),
//   completed: boolean("completed").notNull().default(false),
//   createdAt: timestamp("createdAt").notNull().defaultNow(),
// })
//
// If the user asks for foreign keys, add the reference back in:
//   userId: text("userId")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),

// HomeBuddy specific tables

export const userProfile = pgTable('user_profile', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  userType: text('userType').notNull().default('customer'), // 'customer', 'helper', 'both'
  phoneNumber: text('phoneNumber'),
  dateOfBirth: date('dateOfBirth'),
  profilePhoto: text('profilePhoto'),
  bio: text('bio'),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  zipCode: text('zipCode'),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0'),
  totalReviews: integer('totalReviews').default(0),
  verificationStatus: text('verificationStatus').default('pending'), // 'pending', 'verified', 'rejected'
  backgroundCheckStatus: text('backgroundCheckStatus').default('not_started'), // 'not_started', 'pending', 'verified', 'failed'
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const helper = pgTable('helper', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  userProfileId: text('userProfileId').notNull(),
  hourlyRate: decimal('hourlyRate', { precision: 8, scale: 2 }),
  availability: jsonb('availability'),
  isAvailable: boolean('isAvailable').default(true),
  yearsOfExperience: integer('yearsOfExperience'),
  totalHoursWorked: integer('totalHoursWorked').default(0),
  totalEarnings: decimal('totalEarnings', { precision: 12, scale: 2 }).default('0'),
  cancellationRate: decimal('cancellationRate', { precision: 3, scale: 2 }).default('0'),
  responseTime: integer('responseTime'), // in minutes
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const service = pgTable('service', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  basePrice: decimal('basePrice', { precision: 8, scale: 2 }),
  estimatedDuration: integer('estimatedDuration'), // in minutes
  icon: text('icon'),
  isActive: boolean('isActive').default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const booking = pgTable('booking', {
  id: text('id').primaryKey(),
  customerId: text('customerId').notNull(),
  helperId: text('helperId').notNull(),
  serviceId: text('serviceId').notNull(),
  status: text('status').notNull().default('pending'), // 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'
  scheduledStartTime: timestamp('scheduledStartTime').notNull(),
  scheduledEndTime: timestamp('scheduledEndTime').notNull(),
  actualStartTime: timestamp('actualStartTime'),
  actualEndTime: timestamp('actualEndTime'),
  address: text('address').notNull(),
  notes: text('notes'),
  totalPrice: decimal('totalPrice', { precision: 10, scale: 2 }),
  paymentStatus: text('paymentStatus').default('pending'), // 'pending', 'paid', 'failed', 'refunded'
  rating: decimal('rating', { precision: 3, scale: 2 }),
  review: text('review'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const subscription = pgTable('subscription', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  planType: text('planType').notNull(), // 'standard', 'premium', 'family'
  billingCycle: text('billingCycle').notNull(), // 'monthly', 'yearly'
  status: text('status').notNull().default('active'), // 'active', 'paused', 'cancelled'
  monthlyHours: integer('monthlyHours'),
  price: decimal('price', { precision: 8, scale: 2 }),
  startDate: timestamp('startDate').notNull(),
  renewalDate: timestamp('renewalDate'),
  cancellationDate: timestamp('cancellationDate'),
  stripeSubscriptionId: text('stripeSubscriptionId'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const attendanceTracking = pgTable('attendance_tracking', {
  id: text('id').primaryKey(),
  bookingId: text('bookingId').notNull(),
  customerId: text('customerId').notNull(),
  helperId: text('helperId').notNull(),
  checkInTime: timestamp('checkInTime'),
  checkOutTime: timestamp('checkOutTime'),
  hoursWorked: decimal('hoursWorked', { precision: 8, scale: 2 }),
  notes: text('notes'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const payment = pgTable('payment', {
  id: text('id').primaryKey(),
  bookingId: text('bookingId'),
  userId: text('userId').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text('paymentMethod'), // 'card', 'wallet', 'subscription'
  stripePaymentId: text('stripePaymentId'),
  status: text('status').notNull().default('pending'), // 'pending', 'completed', 'failed', 'refunded'
  transactionDate: timestamp('transactionDate'),
  description: text('description'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const review = pgTable('review', {
  id: text('id').primaryKey(),
  bookingId: text('bookingId').notNull(),
  reviewerId: text('reviewerId').notNull(),
  revieweeId: text('revieweeId').notNull(),
  rating: decimal('rating', { precision: 3, scale: 2 }).notNull(),
  comment: text('comment'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const notification = pgTable('notification', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  type: text('type').notNull(), // 'booking_confirmed', 'booking_cancelled', 'payment_received', 'review_received', etc.
  title: text('title').notNull(),
  message: text('message'),
  relatedId: text('relatedId'),
  isRead: boolean('isRead').default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const wallet = pgTable('wallet', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull().unique(),
  balance: decimal('balance', { precision: 12, scale: 2 }).default('0'),
  totalDeposited: decimal('totalDeposited', { precision: 12, scale: 2 }).default('0'),
  totalSpent: decimal('totalSpent', { precision: 12, scale: 2 }).default('0'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})
