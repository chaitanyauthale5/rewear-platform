"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin, Navigation, X } from "lucide-react"
import type { google } from "google-maps"

interface GoogleMapsProps {
  destination?: string
  onClose?: () => void
  className?: string
}

export function GoogleMaps({ destination, onClose, className }: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [searchQuery, setSearchQuery] = useState(destination || "")

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          // Default to New York if location access is denied
          setUserLocation({ lat: 40.7128, lng: -74.006 })
        },
      )
    }
  }, [])

  useEffect(() => {
    if (userLocation && mapRef.current && window.google) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 13,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      })

      // Add user location marker
      new window.google.maps.Marker({
        position: userLocation,
        map: newMap,
        title: "Your Location",
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" fill="#3B82F6"/>
              <circle cx="12" cy="12" r="3" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(24, 24),
        },
      })

      setMap(newMap)
    }
  }, [userLocation])

  const searchLocation = () => {
    if (!map || !searchQuery) return

    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const location = results[0].geometry.location
        map.setCenter(location)
        map.setZoom(15)

        // Add destination marker
        new window.google.maps.Marker({
          position: location,
          map: map,
          title: searchQuery,
          icon: {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EF4444"/>
                <circle cx="12" cy="9" r="2.5" fill="white"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24),
          },
        })

        // Show directions if user location is available
        if (userLocation) {
          const directionsService = new window.google.maps.DirectionsService()
          const directionsRenderer = new window.google.maps.DirectionsRenderer({
            suppressMarkers: true,
          })
          directionsRenderer.setMap(map)

          directionsService.route(
            {
              origin: userLocation,
              destination: location,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === "OK") {
                directionsRenderer.setDirections(result)
              }
            },
          )
        }
      }
    })
  }

  const openInGoogleMaps = () => {
    if (searchQuery) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`
      window.open(url, "_blank")
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-600" />
          Directions
        </CardTitle>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter destination address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchLocation()}
          />
          <Button onClick={searchLocation} disabled={!searchQuery}>
            <Navigation className="w-4 h-4" />
          </Button>
        </div>

        <div ref={mapRef} className="w-full h-64 rounded-lg bg-gray-200 flex items-center justify-center">
          {!window.google && (
            <div className="text-center text-gray-500">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p>Loading map...</p>
              <p className="text-xs">Google Maps API key required</p>
            </div>
          )}
        </div>

        {searchQuery && (
          <Button onClick={openInGoogleMaps} variant="outline" className="w-full bg-transparent">
            Open in Google Maps
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
