import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, Calendar, MapPin, Users, Clock, Search, Filter, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const upcomingEvents = [
  {
    id: 1,
    title: "NYC Sustainable Fashion Swap",
    date: "2024-02-15",
    time: "2:00 PM - 6:00 PM",
    location: "Brooklyn Community Center",
    address: "123 Green St, Brooklyn, NY 11201",
    attendees: 47,
    maxAttendees: 60,
    price: "Free",
    category: "Swap Event",
    image: "/placeholder.svg?height=200&width=300",
    organizer: "ReWear NYC Chapter",
    description:
      "Join us for our monthly clothing swap event! Bring 5-10 items in good condition and take home the same number of new-to-you pieces.",
  },
  {
    id: 2,
    title: "LA Eco Fashion Workshop",
    date: "2024-02-18",
    time: "1:00 PM - 5:00 PM",
    location: "Venice Beach Community Hall",
    address: "456 Ocean Ave, Venice, CA 90291",
    attendees: 32,
    maxAttendees: 40,
    price: "$15",
    category: "Workshop",
    image: "/placeholder.svg?height=200&width=300",
    organizer: "Green Fashion LA",
    description:
      "Learn about sustainable fashion practices, upcycling techniques, and how to build a conscious wardrobe.",
  },
  {
    id: 3,
    title: "Chicago Clothing Exchange",
    date: "2024-02-22",
    time: "11:00 AM - 4:00 PM",
    location: "Lincoln Park Library",
    address: "789 Park Ave, Chicago, IL 60614",
    attendees: 28,
    maxAttendees: 50,
    price: "Free",
    category: "Swap Event",
    image: "/placeholder.svg?height=200&width=300",
    organizer: "Windy City Swappers",
    description: "Community clothing exchange with a focus on professional and business casual attire.",
  },
  {
    id: 4,
    title: "Austin Sustainable Style Meetup",
    date: "2024-02-25",
    time: "3:00 PM - 7:00 PM",
    location: "South Austin Community Center",
    address: "321 Music Ln, Austin, TX 78704",
    attendees: 19,
    maxAttendees: 35,
    price: "$10",
    category: "Meetup",
    image: "/placeholder.svg?height=200&width=300",
    organizer: "Austin Eco Fashion",
    description: "Network with like-minded fashion enthusiasts and learn about local sustainable brands.",
  },
  {
    id: 5,
    title: "Seattle Repair Café",
    date: "2024-02-28",
    time: "10:00 AM - 3:00 PM",
    location: "Capitol Hill Community Center",
    address: "654 Pine St, Seattle, WA 98101",
    attendees: 15,
    maxAttendees: 25,
    price: "Free",
    category: "Workshop",
    image: "/placeholder.svg?height=200&width=300",
    organizer: "Seattle Repair Network",
    description: "Bring your damaged clothing and learn how to repair and extend the life of your garments.",
  },
  {
    id: 6,
    title: "Miami Beach Fashion Swap",
    date: "2024-03-02",
    time: "4:00 PM - 8:00 PM",
    location: "Miami Beach Convention Center",
    address: "1901 Convention Center Dr, Miami Beach, FL 33139",
    attendees: 67,
    maxAttendees: 100,
    price: "$5",
    category: "Swap Event",
    image: "/placeholder.svg?height=200&width=300",
    organizer: "Miami Sustainable Fashion",
    description: "Large-scale clothing swap with live music, refreshments, and sustainable fashion vendors.",
  },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">ReWear</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/browse">Browse Items</Link>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Local Events</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join sustainable fashion events in your area. Connect with like-minded people and make a difference
            together.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input placeholder="Search events by location or title..." className="pl-10" />
            </div>
            <div className="flex items-center gap-4">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="swap">Swap Events</SelectItem>
                  <SelectItem value="workshop">Workshops</SelectItem>
                  <SelectItem value="meetup">Meetups</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="nyc">New York</SelectItem>
                  <SelectItem value="la">Los Angeles</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                  <SelectItem value="austin">Austin</SelectItem>
                  <SelectItem value="seattle">Seattle</SelectItem>
                  <SelectItem value="miami">Miami</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Create Event CTA */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Want to organize an event?</h3>
              <p className="text-green-700">
                Create your own sustainable fashion event and bring your community together.
              </p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-green-600">{event.category}</Badge>
                  <Badge variant="outline" className="bg-white">
                    {event.price}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90">
                    {event.attendees}/{event.maxAttendees} attending
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString()} • {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Organized by {event.organizer}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">Join Event</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Events
          </Button>
        </div>

        {/* Event Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Event Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Swap Events</h3>
                <p className="text-gray-600 text-sm">
                  Bring items you no longer wear and exchange them for new-to-you pieces from other community members.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Workshops</h3>
                <p className="text-gray-600 text-sm">
                  Learn sustainable fashion practices, repair techniques, and how to build a conscious wardrobe.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Meetups</h3>
                <p className="text-gray-600 text-sm">
                  Network with like-minded individuals and discover local sustainable fashion brands and initiatives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
