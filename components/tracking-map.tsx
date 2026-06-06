'use client'

import { useState, useEffect } from 'react'
import { MapPin, Clock, Phone, MessageSquare } from 'lucide-react'
import { Button } from './ui/button'

interface HelperLocation {
  latitude: number
  longitude: number
  timestamp: number
  status: 'on_way' | 'arrived' | 'in_service'
}

interface TrackingMapProps {
  bookingId: string
  helperName: string
  helperPhone?: string
  helperImage?: string
  estimatedArrival?: Date
  currentLocation?: HelperLocation
  onStartService?: () => void
  onComplete?: () => void
}

export function TrackingMap({
  bookingId,
  helperName,
  helperPhone,
  helperImage,
  estimatedArrival,
  currentLocation,
  onStartService,
  onComplete,
}: TrackingMapProps) {
  const [eta, setEta] = useState<string>('')

  useEffect(() => {
    if (estimatedArrival) {
      const now = new Date()
      const diffMs = estimatedArrival.getTime() - now.getTime()
      const minutes = Math.round(diffMs / 60000)

      if (minutes < 0) {
        setEta('Arrived')
      } else if (minutes < 1) {
        setEta('Arriving now')
      } else if (minutes === 1) {
        setEta('In 1 minute')
      } else {
        setEta(`In ${minutes} minutes`)
      }
    }
  }, [estimatedArrival])

  return (
    <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
      {/* Map Container - Placeholder for Google Maps */}
      <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <MapPin className="w-12 h-12 text-primary mb-4" />
          <p className="text-muted-foreground text-center">
            Google Maps integration needed
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Add your Google Maps API key to enable live tracking
          </p>
        </div>
      </div>

      {/* Helper Info */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-start gap-4 mb-6">
          {helperImage && (
            <img
              src={helperImage}
              alt={helperName}
              className="w-16 h-16 rounded-lg object-cover"
            />
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">{helperName}</h3>
            <div className="flex items-center gap-2 text-primary font-semibold mt-1">
              <Clock className="w-4 h-4" />
              <span>{eta}</span>
            </div>
          </div>
          {currentLocation && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Current Status</p>
              <p className="text-foreground font-semibold capitalize">
                {currentLocation.status.replace('_', ' ')}
              </p>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex gap-3">
          {helperPhone && (
            <Button variant="outline" size="sm" className="flex-1 gap-2">
              <Phone className="w-4 h-4" />
              Call
            </Button>
          )}
          <Button variant="outline" size="sm" className="flex-1 gap-2">
            <MessageSquare className="w-4 h-4" />
            Message
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 space-y-3">
        {currentLocation?.status === 'arrived' && onStartService && (
          <Button className="w-full bg-primary hover:bg-primary/90" onClick={onStartService}>
            Start Service
          </Button>
        )}

        {currentLocation?.status === 'in_service' && onComplete && (
          <>
            <Button className="w-full bg-primary hover:bg-primary/90" onClick={onComplete}>
              Complete Service
            </Button>
            <Button variant="outline" className="w-full">
              Report Issue
            </Button>
          </>
        )}

        {!currentLocation && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">Waiting for helper to start</p>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="px-6 py-4 bg-secondary/30 border-t border-border/50">
        <p className="text-xs text-muted-foreground">
          📍 To enable live tracking, add your Google Maps API key to environment variables
        </p>
      </div>
    </div>
  )
}
