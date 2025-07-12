"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, X, Car, Clock, DollarSign } from "lucide-react"
import type { google } from "google-maps"

interface Location {
  lat: number
  lng: number
  address: string
}

interface AdvancedMapProps {
  onClose?: () => void
  onLocationSelect?: (pickup: Location, destination: Location) => void
  className?: string
}

export function AdvancedMap({ onClose, onLocationSelect, className }: AdvancedMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [userLocation, setUserLocation] = useState<Location | null>(null)
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null)
  const [destinationLocation, setDestinationLocation] = useState<Location | null>(null)
  const [pickupInput, setPickupInput] = useState("")
  const [destinationInput, setDestinationInput] = useState("")
  const [distance, setDistance] = useState<string>("")
  const [duration, setDuration] = useState<string>("")
  const [estimatedCost, setEstimatedCost] = useState<number>(0)
  const [step, setStep] = useState<"pickup" | "destination" | "confirm">("pickup")

  const pickupMarkerRef = useRef<google.maps.Marker | null>(null)
  const destinationMarkerRef = useRef<google.maps.Marker | null>(null)
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null)

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: "Current Location",
          }
          setUserLocation(location)
          setPickupLocation(location)
          setPickupInput("Current Location")
        },
        (error) => {
          console.error("Error getting location:", error)
          const defaultLocation = { lat: 40.7128, lng: -74.006, address: "New York, NY" }
          setUserLocation(defaultLocation)
        },
      )
    }
  }, [])

  useEffect(() => {
    if (userLocation && mapRef.current && window.google) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: userLocation.lat, lng: userLocation.lng },
        zoom: 13,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      })

      // Add click listener for map
      newMap.addListener("click", (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const lat = event.latLng.lat()
          const lng = event.latLng.lng()

          // Reverse geocoding to get address
          const geocoder = new window.google.maps.Geocoder()
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results?.[0]) {
              const location = {
                lat,
                lng,
                address: results[0].formatted_address,
              }

              if (step === "pickup") {
                setPickupLocation(location)
                setPickupInput(location.address)
                addPickupMarker(newMap, location)
              } else if (step === "destination") {
                setDestinationLocation(location)
                setDestinationInput(location.address)
                addDestinationMarker(newMap, location)
              }
            }
          })
        }
      })

      setMap(newMap)

      // Add initial pickup marker if we have user location
      if (pickupLocation) {
        addPickupMarker(newMap, pickupLocation)
      }
    }
  }, [userLocation, step])

  const addPickupMarker = (map: google.maps.Map, location: Location) => {
    // Remove existing pickup marker
    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.setMap(null)
    }

    const marker = new window.google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: "Pickup Location",
      icon: {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="12" fill="#10B981" stroke="white" strokeWidth="3"/>
            <circle cx="16" cy="16" r="4" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32),
      },
    })

    pickupMarkerRef.current = marker
  }

  const addDestinationMarker = (map: google.maps.Map, location: Location) => {
    // Remove existing destination marker
    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.setMap(null)
    }

    const marker = new window.google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: "Destination",
      icon: {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C11.58 2 8 5.58 8 10c0 7.5 8 18 8 18s8-10.5 8-18c0-4.42-3.58-8-8-8z" fill="#EF4444" stroke="white" strokeWidth="2"/>
            <circle cx="16" cy="10" r="3" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32),
      },
    })

    destinationMarkerRef.current = marker

    // Calculate route if both locations are set
    if (pickupLocation && map) {
      calculateRoute(map, pickupLocation, location)
    }
  }

  const calculateRoute = (map: google.maps.Map, pickup: Location, destination: Location) => {
    const directionsService = new window.google.maps.DirectionsService()

    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null)
    }

    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#10B981",
        strokeWeight: 4,
      },
    })

    directionsRenderer.setMap(map)
    directionsRendererRef.current = directionsRenderer

    directionsService.route(
      {
        origin: { lat: pickup.lat, lng: pickup.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          directionsRenderer.setDirections(result)

          const route = result.routes[0]
          const leg = route.legs[0]

          setDistance(leg.distance?.text || "")
          setDuration(leg.duration?.text || "")

          // Calculate estimated cost (base rate + per km)
          const distanceValue = leg.distance?.value || 0
          const baseCost = 5 // $5 base
          const perKmCost = 0.5 // $0.5 per km
          const cost = baseCost + (distanceValue / 1000) * perKmCost
          setEstimatedCost(Math.round(cost * 100) / 100)

          setStep("confirm")
        }
      },
    )
  }

  const searchLocation = (query: string, isPickup: boolean) => {
    if (!map || !query) return

    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ address: query }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        const location = results[0].geometry.location
        const address = results[0].formatted_address

        const locationObj = {
          lat: location.lat(),
          lng: location.lng(),
          address: address,
        }

        if (isPickup) {
          setPickupLocation(locationObj)
          addPickupMarker(map, locationObj)
          map.setCenter(location)
        } else {
          setDestinationLocation(locationObj)
          addDestinationMarker(map, locationObj)
          map.setCenter(location)
        }
      }
    })
  }

  const confirmBooking = () => {
    if (pickupLocation && destinationLocation && onLocationSelect) {
      onLocationSelect(pickupLocation, destinationLocation)
    }
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            Select Pickup & Destination
          </CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex flex-col lg:flex-row flex-1">
            {/* Map */}
            <div className="flex-1 relative">
              <div ref={mapRef} className="w-full h-full min-h-[400px] bg-gray-200 flex items-center justify-center">
                {!window.google && (
                  <div className="text-center text-gray-500">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p>Loading map...</p>
                    <p className="text-xs">Google Maps API key required</p>
                  </div>
                )}
              </div>

              {/* Step indicator */}
              <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${step === "pickup" ? "bg-green-600" : "bg-gray-300"}`} />
                  <span className={step === "pickup" ? "font-semibold" : ""}>Select Pickup</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <div className={`w-3 h-3 rounded-full ${step === "destination" ? "bg-red-600" : "bg-gray-300"}`} />
                  <span className={step === "destination" ? "font-semibold" : ""}>Select Destination</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <div className={`w-3 h-3 rounded-full ${step === "confirm" ? "bg-blue-600" : "bg-gray-300"}`} />
                  <span className={step === "confirm" ? "font-semibold" : ""}>Confirm</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="w-full lg:w-80 p-6 bg-gray-50 space-y-4">
              {/* Pickup Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Pickup Location</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter pickup address..."
                    value={pickupInput}
                    onChange={(e) => setPickupInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && searchLocation(pickupInput, true)}
                    className={step === "pickup" ? "border-green-500" : ""}
                  />
                  <Button
                    size="sm"
                    onClick={() => searchLocation(pickupInput, true)}
                    disabled={!pickupInput}
                    variant={step === "pickup" ? "default" : "outline"}
                  >
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
                {step === "pickup" && (
                  <p className="text-xs text-green-600">Click on the map to select pickup location</p>
                )}
              </div>

              {/* Destination Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Destination</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter destination address..."
                    value={destinationInput}
                    onChange={(e) => setDestinationInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && searchLocation(destinationInput, false)}
                    className={step === "destination" ? "border-red-500" : ""}
                  />
                  <Button
                    size="sm"
                    onClick={() => searchLocation(destinationInput, false)}
                    disabled={!destinationInput}
                    variant={step === "destination" ? "default" : "outline"}
                  >
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
                {step === "destination" && (
                  <p className="text-xs text-red-600">Click on the map to select destination</p>
                )}
              </div>

              {/* Step Controls */}
              <div className="flex gap-2">
                {step === "pickup" && pickupLocation && (
                  <Button onClick={() => setStep("destination")} className="flex-1 bg-green-600 hover:bg-green-700">
                    Next: Select Destination
                  </Button>
                )}
                {step === "destination" && (
                  <Button variant="outline" onClick={() => setStep("pickup")} className="bg-transparent">
                    Back
                  </Button>
                )}
              </div>

              {/* Route Information */}
              {step === "confirm" && distance && duration && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Trip Details</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Distance</span>
                      </div>
                      <Badge variant="outline">{distance}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Duration</span>
                      </div>
                      <Badge variant="outline">{duration}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Estimated Cost</span>
                      </div>
                      <Badge className="bg-green-600">${estimatedCost}</Badge>
                    </div>
                  </div>

                  <Button onClick={confirmBooking} className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    <Car className="w-4 h-4 mr-2" />
                    Confirm Pickup & Delivery
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
