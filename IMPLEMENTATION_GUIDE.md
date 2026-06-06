# HomeBuddy Implementation Guide

Complete guide for setting up and extending the HomeBuddy platform.

## Environment Setup

### Required Environment Variables

```bash
# Neon Database (auto-provisioned)
DATABASE_URL=postgresql://user:password@host/database

# Better Auth (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET=your-random-32-char-secret

# Stripe (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Google Maps (optional, for live tracking)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## Phase 1: Core Setup (COMPLETED ✅)

### ✅ Database & Authentication
- Neon PostgreSQL integration
- Drizzle ORM with full schema
- Better Auth email + password
- 15+ tables for complete data model

### ✅ Landing Page
- Hero section with CTA
- Feature showcase
- Pricing plans
- How it works section
- Footer

### ✅ Helper Discovery
- Browse helpers by service
- Helper profile cards
- Filter and sort options
- Detailed helper profiles with reviews

### ✅ Dashboard
- 7-tab user dashboard
- Upcoming bookings
- Billing management
- Subscription handling
- Helper favorites
- Profile settings

### ✅ Authentication Pages
- Sign in / Sign up pages
- Shared auth form component
- Session management

## Phase 2: Payments & Subscriptions

### To Complete: Stripe Integration

1. **Setup Stripe Products**
   ```bash
   # Go to https://dashboard.stripe.com/products
   # Create 2 products:
   # - Premium Plan ($99/month, 10 hours)
   # - Family Plan ($249/month, unlimited)
   
   # Copy the Price IDs and update lib/subscriptions.ts:
   # stripePriceId: "price_xxxxx"
   ```

2. **Create Checkout Page**
   ```tsx
   // app/checkout/page.tsx
   // Use components/checkout.tsx with Stripe Elements
   // Call startSubscriptionCheckout() action
   ```

3. **Create Success Page**
   ```tsx
   // app/subscription-success/page.tsx
   // Verify subscription with verifyAndSaveSubscription()
   // Show success message
   ```

4. **Wallet Top-up Page**
   ```tsx
   // app/wallet/page.tsx
   // Use createPaymentIntentForWallet() action
   // Implement Stripe Payment Element
   ```

### To Complete: Booking Flow Modal

1. **Multi-step Booking Modal**
   - Step 1: Select date & time
   - Step 2: Confirm address
   - Step 3: Add special requests
   - Step 4: Review & pay

2. **Integration Points**
   - Use `createBooking()` action
   - Trigger payment flow if needed
   - Save booking to database
   - Send confirmation notification

## Phase 3: Live Tracking & Notifications

### Google Maps Integration

1. **Install Package**
   ```bash
   pnpm add @googlemaps/js-api-loader react-google-maps/api
   ```

2. **Add API Key**
   - Get key from Google Cloud Console
   - Add to `.env.local`

3. **Implement Tracking Component**
   - Replace `TrackingMap` placeholder
   - Show helper's real-time location
   - Display ETA

### Real-time Notifications

1. **Email Notifications**
   - Setup SendGrid or Mailgun
   - Create email templates for:
     - Booking confirmation
     - Service reminder
     - Service completion
     - Review request

2. **Push Notifications**
   - Implement web push (OneSignal, Firebase)
   - Send booking updates
   - Helper arrival notifications

## Phase 4: Helper Onboarding

### Helper Registration Flow

1. **Create Helper Signup**
   ```tsx
   // app/become-helper/page.tsx
   // Guide through:
   // - Profile setup
   // - Service selection
   // - Availability configuration
   // - Bank account setup
   ```

2. **Background Check Integration**
   - Integrate with third-party service (Checkr, Jumio)
   - Verify identity documents
   - Store verification status in database

3. **Helper Dashboard**
   ```tsx
   // app/helper-dashboard/page.tsx
   // Tabs for:
   // - Incoming requests
   // - My schedule
   // - Earnings
   // - Ratings
   // - Wallet withdrawal
   ```

## Phase 5: Advanced Features

### Smart Recommendations
```typescript
// Recommend helpers based on:
// - Service type
// - User history
// - Location
// - Ratings
// - Availability
```

### Helper Replacement
```typescript
// If helper cancels:
// - Find alternative helpers nearby
// - Send replacement offers
// - Auto-assign if no response
```

### Subscription Usage Tracking
```typescript
// Track monthly hours used
// Warn when approaching limit
// Offer overage billing
// Auto-downgrade if unused
```

## Database Migrations

All tables are created automatically via Drizzle with the schema in `/lib/db/schema.ts`. To add new tables:

1. Add table definition to `schema.ts`
2. Export it from the same file
3. Ensure `userId` column for user-scoped data
4. Server actions automatically use the getUserId() pattern

## Security Best Practices

1. **Always scope by userId**
   ```typescript
   const userId = await getUserId()
   .where(eq(table.userId, userId))
   ```

2. **Never trust client input**
   - Validate all server action parameters
   - Use type checking

3. **Secure payment data**
   - Never store card numbers
   - Use Stripe tokenization
   - Comply with PCI DSS

4. **Rate limiting**
   - Implement on sensitive endpoints
   - Use Upstash Redis for distributed rate limiting

## Testing Stripe Locally

### Test Card Numbers
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- CVC: Any 3 digits
- Date: Any future date

### Test Events
- Use Stripe CLI to test webhook handling
- Run: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

## Deployment Checklist

- [ ] Set production Stripe keys
- [ ] Configure Neon database
- [ ] Set BETTER_AUTH_SECRET
- [ ] Setup Google Maps API
- [ ] Configure email service
- [ ] Test payment flow end-to-end
- [ ] Verify authentication works
- [ ] Test booking creation
- [ ] Test subscription creation
- [ ] Monitor error logs

## API Endpoints to Create

### Webhooks
- `POST /api/webhooks/stripe` - Stripe events
- `POST /api/webhooks/google-maps` - Map updates

### Services
- `GET /api/services` - List all services
- `GET /api/helpers/[id]` - Helper details
- `GET /api/bookings/[id]` - Booking details

### Payment
- `POST /api/payments/intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment

## Performance Optimization

1. **Database**
   - Index frequently queried columns
   - Use pagination for list endpoints
   - Cache helper ratings/reviews

2. **Frontend**
   - Lazy load Google Maps
   - Optimize images
   - Use SWR for data fetching

3. **API**
   - Implement rate limiting
   - Cache responses
   - Use CDN for static assets

## Monitoring & Analytics

1. **Error Tracking**: Setup Sentry
2. **Analytics**: Setup PostHog
3. **Performance**: Use Vercel Analytics
4. **Uptime**: Monitor critical endpoints

## Resources

- [Stripe Docs](https://stripe.com/docs)
- [Google Maps API](https://developers.google.com/maps)
- [Better Auth Docs](https://better-auth.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

## Support & Troubleshooting

### Common Issues

**Database connection fails**
- Check DATABASE_URL format
- Verify Neon connection is active
- Test with: `psql $DATABASE_URL`

**Auth not working**
- Verify BETTER_AUTH_SECRET is set
- Check /api/auth/[...all] is created
- Verify domain in trustedOrigins

**Stripe integration fails**
- Check API keys are correct
- Verify environment variables loaded
- Test with Stripe test cards

**Google Maps not loading**
- Verify API key is set
- Check API is enabled in GCP console
- Verify domain is authorized

## Next Steps

1. Complete Phase 2 (Stripe integration)
2. Add Phase 3 (Live tracking)
3. Implement Phase 4 (Helper onboarding)
4. Roll out Phase 5 (Advanced features)
5. Deploy to production
6. Monitor and iterate based on user feedback
