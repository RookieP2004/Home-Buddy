'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Clock, ChevronRight } from 'lucide-react'

// Mock data for demonstration
const MOCK_HELPERS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rating: 4.9,
    reviews: 248,
    services: ['Cleaning', 'Laundry', 'Organizing'],
    hourlyRate: 25,
    distance: 0.5,
    availability: 'Available today',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    rating: 4.8,
    reviews: 156,
    services: ['Cleaning', 'House Management'],
    hourlyRate: 22,
    distance: 1.2,
    availability: 'Available in 2 hours',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'James Wilson',
    rating: 4.7,
    reviews: 189,
    services: ['Gardening', 'Yard Work', 'Repairs'],
    hourlyRate: 28,
    distance: 2.1,
    availability: 'Available tomorrow',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'Emma Chen',
    rating: 4.9,
    reviews: 203,
    services: ['Cooking', 'Meal Prep', 'Grocery Shopping'],
    hourlyRate: 30,
    distance: 0.8,
    availability: 'Available today',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    name: 'David Lee',
    rating: 4.6,
    reviews: 134,
    services: ['Cleaning', 'Windows', 'Carpets'],
    hourlyRate: 20,
    distance: 1.5,
    availability: 'Available in 4 hours',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    rating: 4.8,
    reviews: 167,
    services: ['Pet Care', 'Dog Walking', 'Pet Sitting'],
    hourlyRate: 18,
    distance: 0.3,
    availability: 'Available in 1 hour',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
]

export default function HelpersPage() {
  const [selectedService, setSelectedService] = useState('all')
  const [sortBy, setSortBy] = useState('rating')

  const services = ['all', 'Cleaning', 'Gardening', 'Cooking', 'Pet Care', 'Repairs']

  const filteredHelpers =
    selectedService === 'all'
      ? MOCK_HELPERS
      : MOCK_HELPERS.filter((h) => h.services.includes(selectedService))

  const sortedHelpers = [...filteredHelpers].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'price') return a.hourlyRate - b.hourlyRate
    if (sortBy === 'distance') return a.distance - b.distance
    return 0
  })

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-8">Find Trusted Helpers</h1>

          {/* Service Filter */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">By Service</h3>
            <div className="flex flex-wrap gap-3">
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedService === service
                      ? 'bg-primary text-white'
                      : 'bg-secondary text-foreground hover:bg-muted'
                  }`}
                >
                  {service.charAt(0).toUpperCase() + service.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="mt-2 px-4 py-2 rounded-lg border border-border bg-background text-foreground"
              >
                <option value="rating">Rating</option>
                <option value="price">Price (Low to High)</option>
                <option value="distance">Distance</option>
              </select>
            </div>
            <div className="text-sm text-muted-foreground pt-8">
              Showing {sortedHelpers.length} helpers
            </div>
          </div>
        </div>

        {/* Helpers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedHelpers.map((helper) => (
            <Link key={helper.id} href={`/helpers/${helper.id}`}>
              <div className="bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 hover:shadow-lg transition h-full">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                  <img
                    src={helper.image}
                    alt={helper.name}
                    className="w-full h-full object-cover opacity-75 hover:opacity-100 transition"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-bold text-sm text-foreground">{helper.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{helper.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {helper.reviews} reviews
                  </p>

                  {/* Services */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {helper.services.slice(0, 2).map((service) => (
                      <span
                        key={service}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                      >
                        {service}
                      </span>
                    ))}
                    {helper.services.length > 2 && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        +{helper.services.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{helper.distance} km away</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{helper.availability}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">${helper.hourlyRate}</p>
                      <p className="text-xs text-muted-foreground">/hour</p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      Book Now
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
