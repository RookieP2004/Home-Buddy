'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Clock, Shield, CheckCircle } from 'lucide-react'

export default function HelperProfilePage({ params }: { params: { id: string } }) {
  const [showBookingModal, setShowBookingModal] = useState(false)

  // Mock helper data
  const helper = {
    id: params.id,
    name: 'Sarah Johnson',
    rating: 4.9,
    reviews: 248,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop',
    bio: 'Professional household manager with 8+ years of experience. Specializing in deep cleaning, organization, and home management.',
    services: ['Cleaning', 'Laundry', 'Organizing', 'Home Management'],
    hourlyRate: 25,
    experience: '8+ years',
    responseTime: '15 minutes',
    completedJobs: 248,
    verificationStatus: 'Verified',
    availability: 'Available today, Tomorrow, Next week',
    reviews_list: [
      {
        id: 1,
        reviewer: 'John D.',
        rating: 5,
        text: 'Excellent service! Very professional and thorough. Will definitely book again.',
        date: '2 days ago',
      },
      {
        id: 2,
        reviewer: 'Emily R.',
        rating: 5,
        text: 'Sarah is amazing! She turned my messy apartment into a clean, organized space.',
        date: '1 week ago',
      },
      {
        id: 3,
        reviewer: 'Michael T.',
        rating: 4,
        text: 'Great job overall. Very reliable and punctual.',
        date: '2 weeks ago',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-foreground">HomeBuddy</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/sign-in">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/helpers" className="text-primary hover:text-primary/80 font-medium mb-8 inline-block">
          ← Back to Helpers
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Profile */}
          <div className="md:col-span-2">
            {/* Profile Card */}
            <div className="bg-card rounded-xl border border-border/50 overflow-hidden mb-8">
              <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20">
                <img
                  src={helper.image}
                  alt={helper.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">{helper.name}</h1>
                    <p className="text-muted-foreground">{helper.bio}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg">
                      <Star className="w-5 h-5 fill-primary" />
                      <span className="text-2xl font-bold">{helper.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{helper.reviews} reviews</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-8 border-y border-border/50">
                  <div>
                    <p className="text-muted-foreground text-sm">Completed Jobs</p>
                    <p className="text-2xl font-bold text-foreground">{helper.completedJobs}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Experience</p>
                    <p className="text-2xl font-bold text-foreground">{helper.experience}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Response Time</p>
                    <p className="text-2xl font-bold text-foreground">{helper.responseTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-card rounded-xl border border-border/50 p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Services Offered</h2>
              <div className="grid grid-cols-2 gap-4">
                {helper.services.map((service) => (
                  <div key={service} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification */}
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-bold text-green-900 dark:text-green-200">Verified & Trusted</h3>
              </div>
              <p className="text-green-800 dark:text-green-300">
                This helper has been background-checked and verified by HomeBuddy. All qualifications and references have been confirmed.
              </p>
            </div>

            {/* Reviews */}
            <div className="bg-card rounded-xl border border-border/50 p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Recent Reviews</h2>
              <div className="space-y-6">
                {helper.reviews_list.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-border/50 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{review.reviewer}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {Array(review.rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                      </div>
                    </div>
                    <p className="text-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div>
            <div className="bg-card rounded-xl border border-border/50 p-8 sticky top-24">
              <div className="mb-8">
                <p className="text-muted-foreground text-sm mb-2">Hourly Rate</p>
                <p className="text-4xl font-bold text-foreground">
                  ${helper.hourlyRate}
                  <span className="text-lg text-muted-foreground">/hr</span>
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>0.5 km away</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Available today</span>
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 py-6 text-lg mb-4"
                onClick={() => setShowBookingModal(true)}
              >
                Book Now
              </Button>

              <Button variant="outline" className="w-full py-6">
                Message Helper
              </Button>

              <div className="mt-8 p-4 bg-secondary/30 rounded-lg text-sm text-muted-foreground">
                <p className="font-semibold text-foreground mb-2">Flexible Cancellation</p>
                <p>Cancel up to 24 hours before for full refund</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
