'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Clock, Shield, Zap, Users, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-lg bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                <span className="text-white font-bold text-sm sm:text-lg">H</span>
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden xs:inline">HomeBuddy</span>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent xs:hidden">HB</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
              <a href="#features" className="text-muted-foreground hover:text-primary transition font-medium text-sm">
                Why Us
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition font-medium text-sm">
                How It Works
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition font-medium text-sm">
                Pricing
              </a>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden sm:flex gap-2 flex-shrink-0">
              <Link href="/sign-in" className="hidden md:block">
                <Button variant="outline" className="border-2 rounded-lg font-semibold">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg px-4 sm:px-6">Book Now</Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex-shrink-0 inline-flex items-center justify-center p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-foreground hover:text-primary font-medium">
                Why Us
              </a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-foreground hover:text-primary font-medium">
                How It Works
              </a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-foreground hover:text-primary font-medium">
                Pricing
              </a>
              <div className="flex flex-col gap-2 pt-2 px-4">
                <Link href="/sign-in" className="w-full sm:hidden">
                  <Button variant="outline" className="w-full border-2 rounded-lg font-semibold">Sign In</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="hidden sm:inline-block bg-secondary px-4 py-2 rounded-full text-sm font-semibold text-accent mb-4 sm:mb-6">
                ⚡ 24/7 Help Available
              </div>
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                Help at Your
                <span className="text-primary block">Doorstep</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-10 leading-relaxed max-w-md">
                Get verified household helpers in minutes. Trusted by thousands, rated 4.9 stars.
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/sign-up" className="w-full">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl py-3 sm:py-6 text-base sm:text-lg h-auto">
                    Book Now
                  </Button>
                </Link>
                <Link href="#how-it-works" className="w-full">
                  <Button className="w-full text-base sm:text-lg font-semibold rounded-xl py-3 sm:py-6 border-2 h-auto">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>

            <div className="order-1 md:order-2 relative h-64 sm:h-96 md:h-full min-h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="bg-white rounded-full p-4 sm:p-8 shadow-xl mb-4 sm:mb-6 w-fit mx-auto">
                    <Clock className="w-12 h-12 sm:w-20 sm:h-20 text-primary" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-primary">15 mins</p>
                  <p className="text-muted-foreground mt-2 text-xs sm:text-lg">Average helper arrival</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 sm:mb-4">Why 50,000+ trust HomeBuddy?</h2>
            <p className="text-sm sm:text-lg text-muted-foreground">Everything you need for reliable household help</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-border shadow-sm hover:shadow-lg transition duration-300">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-secondary rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <Zap className="w-6 sm:w-7 h-6 sm:h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">15 min Booking</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Find and book trusted helpers instantly. Real-time availability and instant confirmation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-border shadow-sm hover:shadow-lg transition duration-300">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-secondary rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <Shield className="w-6 sm:w-7 h-6 sm:h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">100% Verified</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                All helpers are background-checked and verified. 4.9★ average rating from customers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-border shadow-sm hover:shadow-lg transition duration-300">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-secondary rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <Clock className="w-6 sm:w-7 h-6 sm:h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">Flexible Hours</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                One-time help or recurring subscriptions. Available 24/7 for your convenience.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-border shadow-sm hover:shadow-lg transition duration-300">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-secondary rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <MapPin className="w-6 sm:w-7 h-6 sm:h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">Live Tracking</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Real-time location tracking. Know exactly when your helper arrives.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-border shadow-sm hover:shadow-lg transition duration-300">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-secondary rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <Users className="w-6 sm:w-7 h-6 sm:h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">Auto Tracking</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Automatic check-in/check-out. Digital records and invoicing at your fingertips.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-border shadow-sm hover:shadow-lg transition duration-300">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-secondary rounded-full flex items-center justify-center mb-4 sm:mb-5">
                <Star className="w-6 sm:w-7 h-6 sm:h-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">Secure Payments</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Multiple payment options. Transparent pricing with no hidden charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 sm:mb-4">Get Help in 4 Steps</h2>
            <p className="text-sm sm:text-lg text-muted-foreground">Simple, fast, and secure</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: 1, title: 'Tell Us', desc: 'What help you need and when', icon: '📝' },
              { step: 2, title: 'Browse', desc: 'Browse verified helpers near you', icon: '🔍' },
              { step: 3, title: 'Book', desc: 'Select and confirm in seconds', icon: '✓' },
              { step: 4, title: 'Track', desc: 'Real-time tracking & payment', icon: '🎉' },
            ].map((item) => (
              <div key={item.step} className="relative flex flex-col items-start sm:items-start">
                <div className="bg-gradient-to-br from-primary to-accent text-white w-14 sm:w-16 h-14 sm:h-16 rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl mb-4 sm:mb-6 shadow-lg flex-shrink-0">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                {item.step < 4 && (
                  <div className="hidden lg:block absolute top-7 sm:top-8 left-full w-4 sm:w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent -ml-6 sm:-ml-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 sm:mb-4">Plans for Every Budget</h2>
            <p className="text-sm sm:text-lg text-muted-foreground">No hidden charges. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Plan 1 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-border hover:shadow-xl transition duration-300">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">Pay Per Use</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">One-time help</p>
              </div>
              <div className="mb-6 sm:mb-8">
                <span className="text-3xl sm:text-4xl font-bold text-foreground">₹199</span>
                <span className="text-muted-foreground text-xs sm:text-sm">/hour</span>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-11 sm:h-12 rounded-lg sm:rounded-xl mb-6 sm:mb-8 text-sm sm:text-base">Book Now</Button>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <li className="flex gap-2 sm:gap-3 text-foreground">
                  <span className="text-primary text-base sm:text-lg flex-shrink-0">✓</span> 15 min booking
                </li>
                <li className="flex gap-2 sm:gap-3 text-foreground">
                  <span className="text-primary text-base sm:text-lg flex-shrink-0">✓</span> Verified helpers
                </li>
                <li className="flex gap-2 sm:gap-3 text-foreground">
                  <span className="text-primary text-base sm:text-lg flex-shrink-0">✓</span> Live tracking
                </li>
              </ul>
            </div>

            {/* Plan 2 - Featured */}
            <div className="bg-gradient-to-br from-primary to-accent text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-primary transform md:scale-105 relative shadow-xl ring-2 ring-offset-4 ring-primary">
              <div className="absolute -top-3 sm:-top-5 left-1/2 transform -translate-x-1/2 bg-accent px-3 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-white">
                MOST POPULAR
              </div>
              <div className="mb-4 sm:mb-6 pt-2">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Monthly Pass</h3>
                <p className="text-white/90 text-xs sm:text-sm">For regular users</p>
              </div>
              <div className="mb-6 sm:mb-8">
                <span className="text-3xl sm:text-4xl font-bold">₹1,899</span>
                <span className="text-white/90 text-xs sm:text-sm">/month</span>
              </div>
              <Button className="w-full bg-white text-primary hover:bg-white/90 font-semibold h-11 sm:h-12 rounded-lg sm:rounded-xl mb-6 sm:mb-8 text-sm sm:text-base">Start Free Trial</Button>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <li className="flex gap-2 sm:gap-3">
                  <span className="text-base sm:text-lg flex-shrink-0">✓</span> 10 hours/month
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="text-base sm:text-lg flex-shrink-0">✓</span> 20% discount
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="text-base sm:text-lg flex-shrink-0">✓</span> Priority support
                </li>
                <li className="flex gap-2 sm:gap-3">
                  <span className="text-base sm:text-lg flex-shrink-0">✓</span> Dedicated helpers
                </li>
              </ul>
            </div>

            {/* Plan 3 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-border hover:shadow-xl transition duration-300">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">Annual Plan</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">Save 30% yearly</p>
              </div>
              <div className="mb-6 sm:mb-8">
                <span className="text-3xl sm:text-4xl font-bold text-foreground">₹19,899</span>
                <span className="text-muted-foreground text-xs sm:text-sm">/year</span>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-11 sm:h-12 rounded-lg sm:rounded-xl mb-6 sm:mb-8 text-sm sm:text-base">Get Deal</Button>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <li className="flex gap-2 sm:gap-3 text-foreground">
                  <span className="text-primary text-base sm:text-lg flex-shrink-0">✓</span> Unlimited hours
                </li>
                <li className="flex gap-2 sm:gap-3 text-foreground">
                  <span className="text-primary text-base sm:text-lg flex-shrink-0">✓</span> Multiple helpers
                </li>
                <li className="flex gap-2 sm:gap-3 text-foreground">
                  <span className="text-primary text-base sm:text-lg flex-shrink-0">✓</span> 24/7 support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-primary via-accent to-primary rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight">Get Help. Get Home.</h2>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl mb-6 sm:mb-10 opacity-95 max-w-2xl mx-auto">Book a verified helper in 15 minutes. Available 24/7 across your city.</p>
              <Link href="/sign-up" className="inline-block">
                <Button className="bg-white text-primary hover:bg-white/90 font-semibold rounded-lg sm:rounded-xl px-6 sm:px-8 py-3 sm:py-4 h-auto text-sm sm:text-lg">
                  Download HomeBuddy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 mb-8 sm:mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm sm:text-lg">H</span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-foreground">HomeBuddy</span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">Trusted household help at your fingertips. Available 24/7.</p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-3 sm:mb-6 text-xs sm:text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-xs sm:text-sm">
                <li><a href="#" className="hover:text-primary transition font-medium">Cleaning</a></li>
                <li><a href="#" className="hover:text-primary transition font-medium">Cooking</a></li>
                <li><a href="#" className="hover:text-primary transition font-medium">Laundry</a></li>
                <li><a href="#" className="hover:text-primary transition font-medium">Groceries</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-3 sm:mb-6 text-xs sm:text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-xs sm:text-sm">
                <li><a href="#" className="hover:text-primary transition font-medium">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition font-medium">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition font-medium">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition font-medium">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-3 sm:mb-6 text-xs sm:text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-xs sm:text-sm">
                <li><a href="#" className="hover:text-primary transition font-medium">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition font-medium">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition font-medium">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 sm:pt-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <p className="text-muted-foreground text-xs sm:text-sm text-center md:text-left">&copy; 2024 HomeBuddy. All rights reserved. | Made with ❤️ in India</p>
              <div className="flex gap-4 sm:gap-6 justify-center md:justify-end text-xs sm:text-sm">
                <a href="#" className="text-muted-foreground hover:text-primary transition font-medium">Facebook</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition font-medium">Twitter</a>
                <a href="#" className="text-muted-foreground hover:text-primary transition font-medium">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
