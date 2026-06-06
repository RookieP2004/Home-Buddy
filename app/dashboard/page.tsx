'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Home, 
  Clock, 
  CreditCard, 
  Users, 
  Settings,
  LogOut,
  ChevronRight,
  Star,
  MapPin,
  AlertCircle
} from 'lucide-react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [notifications, setNotifications] = useState(3)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'helpers', label: 'My Helpers', icon: Users },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: Settings },
  ]

  // Mock data
  const upcomingBookings = [
    {
      id: 1,
      helper: 'Sarah Johnson',
      service: 'House Cleaning',
      date: 'Today, 2:00 PM',
      status: 'confirmed',
      price: 50,
    },
    {
      id: 2,
      helper: 'Maria Garcia',
      service: 'Laundry Service',
      date: 'Tomorrow, 10:00 AM',
      status: 'pending',
      price: 35,
    },
  ]

  const stats = [
    { label: 'Total Bookings', value: '24' },
    { label: 'Hours Booked', value: '48' },
    { label: 'Total Spent', value: '$1,280' },
    { label: 'Favorite Helpers', value: '5' },
  ]

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
          <div className="flex items-center gap-6">
            <div className="relative">
              <button className="text-muted-foreground hover:text-foreground relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-card rounded-xl border border-border/50 p-6">
              <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-xl border border-border/50 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-border/50">
                <div className="w-12 h-12 bg-primary rounded-full mb-3" />
                <h3 className="font-bold text-foreground">John Doe</h3>
                <p className="text-sm text-muted-foreground">john@example.com</p>
              </div>

              <nav className="p-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'text-foreground hover:bg-secondary'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Upcoming Bookings */}
                <div className="bg-card rounded-xl border border-border/50 p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Bookings</h2>
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50"
                      >
                        <div>
                          <p className="font-semibold text-foreground">{booking.service}</p>
                          <p className="text-sm text-muted-foreground">with {booking.helper}</p>
                          <p className="text-xs text-muted-foreground mt-1">{booking.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">${booking.price}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded font-medium ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="#bookings" onClick={() => setActiveTab('bookings')}>
                    <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                      View All Bookings
                    </Button>
                  </Link>
                </div>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/helpers">
                    <Button className="w-full h-24 bg-primary hover:bg-primary/90 text-lg">
                      <div className="text-center">
                        <p>Book a Helper</p>
                        <p className="text-sm opacity-90">Find trusted help</p>
                      </div>
                    </Button>
                  </Link>
                  <div className="bg-card rounded-xl border border-border/50 p-6">
                    <p className="text-sm text-muted-foreground mb-2">Account Balance</p>
                    <p className="text-3xl font-bold text-foreground">$250.00</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-card rounded-xl border border-border/50 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">My Bookings</h2>
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-6 border border-border/50 rounded-lg hover:border-primary/50 transition"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{booking.service}</h3>
                          <p className="text-muted-foreground">{booking.helper}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{booking.date}</p>
                      <p className="text-2xl font-bold text-foreground">${booking.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="bg-card rounded-xl border border-border/50 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Attendance Tracking</h2>
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No active sessions</p>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="bg-card rounded-xl border border-border/50 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Billing & Payments</h2>
                <div className="bg-secondary/30 p-6 rounded-lg mb-6">
                  <p className="text-muted-foreground text-sm mb-2">Account Balance</p>
                  <p className="text-4xl font-bold text-foreground mb-4">$250.00</p>
                  <Button className="bg-primary hover:bg-primary/90">Add Funds</Button>
                </div>
                <h3 className="font-bold text-foreground mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between p-3 border border-border/50 rounded-lg">
                      <span className="text-foreground">House Cleaning Service</span>
                      <span className="text-foreground font-bold">-$50.00</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'helpers' && (
              <div className="bg-card rounded-xl border border-border/50 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">My Favorite Helpers</h2>
                <div className="grid gap-4">
                  {['Sarah Johnson', 'Maria Garcia', 'Emma Chen'].map((name, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary rounded-full" />
                        <div>
                          <p className="font-semibold text-foreground">{name}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            <span>4.9</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Book Again
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'subscriptions' && (
              <div className="bg-card rounded-xl border border-border/50 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">My Subscriptions</h2>
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
                  <p className="opacity-90 mb-4">10 hours/month • Save 20%</p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="opacity-90">/month</span>
                  </div>
                  <Button className="bg-white text-primary hover:bg-white/90 mb-4">
                    Upgrade to Family Plan
                  </Button>
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white/10">
                    Manage Subscription
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-card rounded-xl border border-border/50 p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Profile Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      value="John Doe"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      value="john@example.com"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
