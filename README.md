# HomeBuddy - On-Demand Household Help Platform

A modern, full-stack web application connecting customers with verified household helpers. Built with Next.js 16, React 19, Neon PostgreSQL, and Stripe.

## Overview

HomeBuddy is a comprehensive marketplace platform that enables:
- Customers to find and book verified household helpers
- Real-time booking with instant confirmation
- Secure payment processing and subscription management
- Live tracking of helper arrival and service
- Transparent ratings and reviews
- Attendance tracking and automated billing

## Tech Stack

- **Frontend**: Next.js 16 + React 19 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: Better Auth (email + password)
- **Payments**: Stripe (subscriptions & payments)
- **Storage**: Vercel Blob (images & documents)
- **UI Components**: shadcn/ui
- **Maps**: Google Maps API (for live tracking)

## Features Implemented

### 1. Landing Page ✅
- Modern hero section with clear value proposition
- 6 feature cards highlighting key benefits
- How it works section with visual steps
- 3-tier pricing model
- Call-to-action sections
- Responsive footer

### 2. Authentication ✅
- Email + password registration and login
- Better Auth integration
- Secure session management
- Protected routes

### 3. Helper Discovery ✅
- Browse helpers by service category
- Filter and sort (rating, price, distance)
- Helper profile cards with ratings
- Detailed helper profiles with:
  - Reviews and ratings
  - Service offerings
  - Availability status
  - Response time

### 4. User Dashboard ✅
- 7 navigation tabs:
  - **Overview**: Quick stats and upcoming bookings
  - **My Bookings**: Full booking history
  - **Attendance**: Time tracking interface
  - **Billing**: Payment history and wallet
  - **Helpers**: Favorite helpers
  - **Subscriptions**: Plan management
  - **Profile**: User settings

### 5. Subscription Management ✅
- Premium plan ($99/month, 10 hours)
- Family plan ($249/month, unlimited)
- Stripe integration ready
- Subscription state tracking

### 6. Server Actions ✅
- Complete CRUD operations for all entities
- User-scoped security with getUserId() pattern
- Booking management
- Payment processing
- Notification system
- Wallet management
- Attendance tracking

### 7. Database Schema ✅
15+ tables covering:
- User profiles and authentication
- Helper profiles and services
- Bookings and subscriptions
- Payments and reviews
- Notifications and wallet
- Attendance tracking

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)
- Neon database (auto-provisioned)
- Stripe account (for payments)
- Google Maps API key (optional, for live tracking)

### Installation

```bash
# Install dependencies
pnpm install

# Create .env.local file with required variables
cp .env.example .env.local

# Start development server
pnpm dev
```

### Environment Variables

```bash
# Database (auto-provisioned by Neon integration)
DATABASE_URL=postgresql://...

# Authentication (generate: openssl rand -base64 32)
BETTER_AUTH_SECRET=your_secret_here

# Stripe (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Google Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

## Project Structure

```
/app
  ├── /api/auth/[...all]          # Authentication endpoint
  ├── /actions
  │   ├── home-buddy.ts           # Main business logic
  │   └── stripe.ts               # Payment actions
  ├── /helpers
  │   ├── page.tsx                # Helper listing
  │   └── [id]/page.tsx           # Helper profile
  ├── /dashboard
  │   └── page.tsx                # User dashboard (7 tabs)
  ├── /sign-in                     # Authentication
  ├── /sign-up
  ├── layout.tsx                   # Root layout
  ├── page.tsx                     # Landing page
  └── globals.css                  # Global styles

/components
  ├── auth-form.tsx               # Shared auth form
  ├── tracking-map.tsx            # Live tracking (Google Maps ready)
  └── /ui                         # shadcn components

/lib
  ├── auth.ts                     # Better Auth config
  ├── auth-client.ts              # Auth client
  ├── stripe.ts                   # Stripe utilities
  ├── subscriptions.ts            # Subscription plans
  └── /db
      ├── index.ts                # Drizzle client
      └── schema.ts               # Database schema (15+ tables)
```

## Key Features & Implementation Details

### User-Scoped Security
All queries automatically scope to the current user:
```typescript
const userId = await getUserId() // From Better Auth session
// All queries: .where(eq(table.userId, userId))
```

### Subscription Plans
Three tiers available:
- **Standard**: $19/hour (pay-as-you-go)
- **Premium**: $99/month (10 hours, 20% discount)
- **Family**: $249/month (unlimited hours)

### Booking Flow
1. Browse helpers by service
2. View helper profile & reviews
3. Create booking with date/time/address
4. Process payment (Stripe)
5. Receive confirmation notification
6. Track helper in real-time
7. Rate and review service

### Notification System
Built-in notifications for:
- Booking confirmations
- Helper arrival alerts
- Service reminders
- Review requests
- Payment receipts

## API Actions Reference

### User Profile
- `createOrUpdateUserProfile()` - Setup user profile
- `getUserProfile()` - Get user info

### Helper Profile
- `becomeAHelper()` - Register as helper
- `getHelperProfile()` - Get helper info

### Bookings
- `createBooking()` - Create new booking
- `getMyBookings()` - User's bookings
- `getBookingsAsHelper()` - Helper's incoming bookings
- `updateBookingStatus()` - Change booking status
- `rateAndReviewBooking()` - Leave review

### Subscriptions
- `createSubscription()` - Start subscription
- `getUserSubscription()` - Get active plan
- `cancelSubscription()` - Cancel plan

### Payments & Wallet
- `createPayment()` - Record payment
- `getPaymentHistory()` - User's transactions
- `addToWallet()` - Top up wallet balance

### Notifications
- `getNotifications()` - Fetch notifications
- `markNotificationAsRead()` - Mark as read

### Attendance
- `recordCheckIn()` - Check-in helper
- `recordCheckOut()` - Check-out and calculate hours

## Deployment

### To Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Then redeploy
vercel --prod
```

### Production Checklist
- [ ] Set Stripe production keys
- [ ] Configure Neon production database
- [ ] Set BETTER_AUTH_SECRET
- [ ] Add Google Maps API key
- [ ] Setup email service (SendGrid/Mailgun)
- [ ] Configure webhook handlers
- [ ] Test payment flow
- [ ] Monitor error logs

## Performance Optimizations

- Server-side rendering with Next.js 16
- Database query optimization with indexes
- Image optimization with next/image
- CSS-in-JS with Tailwind (production build optimization)
- API route caching
- Database connection pooling (Neon)

## Security Features

- Email + password authentication with Better Auth
- Session-based security with httpOnly cookies
- Per-query user scoping (no RLS needed)
- Server-side price validation for payments
- No client-side sensitive data
- CSRF protection via Next.js
- Rate limiting ready (implement with Upstash)

## Remaining Tasks for Full Launch

1. **Phase 2: Complete Payment Integration**
   - Create checkout page with Stripe Elements
   - Implement success/cancellation pages
   - Setup wallet top-up functionality

2. **Phase 3: Live Tracking**
   - Add Google Maps integration
   - Implement real-time location updates
   - Setup WebSocket for live notifications

3. **Phase 4: Helper Onboarding**
   - Create helper signup flow
   - Background check integration
   - Helper dashboard implementation

4. **Phase 5: Advanced Features**
   - Smart recommendations
   - Helper replacement system
   - Usage analytics
   - Admin dashboard

See `IMPLEMENTATION_GUIDE.md` for detailed instructions on remaining phases.

## Testing

### Stripe Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- CVC: Any 3 digits
- Expiry: Any future date

### Test Accounts
- Email: Any valid email
- Password: Any password (8+ chars recommended)

## Support & Documentation

- [Neon Docs](https://neon.tech/docs)
- [Better Auth](https://better-auth.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Stripe Docs](https://stripe.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

## Contact

For questions or support, contact the development team.

---

**Last Updated**: June 2024
**Version**: 1.0.0
**Status**: MVP Complete, Ready for Phase 2 Integration
