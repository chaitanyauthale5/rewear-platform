import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Users, Calendar, MapPin, Star, Award, MessageCircle, Heart, Recycle, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const communityStats = [
  { label: "Active Members", value: "15,247", icon: Users },
  { label: "Items Swapped", value: "89,432", icon: Recycle },
  { label: "CO₂ Saved", value: "234 tons", icon: Leaf },
  { label: "Local Events", value: "156", icon: Calendar },
]

const topSwappers = [
  {
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=60&width=60",
    swaps: 127,
    rating: 4.9,
    location: "San Francisco, CA",
    badge: "Eco Champion",
    specialties: ["Vintage", "Designer"],
  },
  {
    name: "Mike Rodriguez",
    avatar: "/placeholder.svg?height=60&width=60",
    swaps: 98,
    rating: 4.8,
    location: "Austin, TX",
    badge: "Sustainability Hero",
    specialties: ["Streetwear", "Casual"],
  },
  {
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=60&width=60",
    swaps: 89,
    rating: 5.0,
    location: "Portland, OR",
    badge: "Green Warrior",
    specialties: ["Boho", "Handmade"],
  },
  {
    name: "David Kim",
    avatar: "/placeholder.svg?height=60&width=60",
    swaps: 76,
    rating: 4.7,
    location: "Seattle, WA",
    badge: "Circular Fashion Advocate",
    specialties: ["Tech Wear", "Minimalist"],
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "NYC Sustainable Fashion Swap",
    date: "2024-02-15",
    time: "2:00 PM - 6:00 PM",
    location: "Brooklyn Community Center",
    address: "123 Green St, Brooklyn, NY",
    attendees: 47,
    maxAttendees: 60,
    image: "/placeholder.svg?height=200&width=300",
    organizer: "ReWear NYC Chapter",
  },
  {
    id: 2,
    title: "LA Eco Fashion Meetup",
    date: "2024-02-18",
    time: "1:00 PM - 5:00 PM",
    location: "Venice Beach Community Hall",
    address: "456 Ocean Ave, Venice, CA",
    attendees: 32,
    maxAttendees: 40,
    image: "/placeholder.svg?height=200&width=300",
    organizer: "Green Fashion LA",
  },
  {
    id: 3,
    title: "Chicago Clothing Exchange",
    date: "2024-02-22",
    time: "11:00 AM - 4:00 PM",
    location: "Lincoln Park Library",
    address: "789 Park Ave, Chicago, IL",
    attendees: 28,
    maxAttendees: 50,
    image: "/placeholder.svg?height=200&width=300",
    organizer: "Windy City Swappers",
  },
]

const successStories = [
  {
    user: "Jessica M.",
    avatar: "/placeholder.svg?height=50&width=50",
    story:
      "I've saved over $2,000 this year by swapping instead of buying new clothes. Plus, I've met amazing people who share my values!",
    swaps: 45,
    savings: "$2,156",
  },
  {
    user: "Alex R.",
    avatar: "/placeholder.svg?height=50&width=50",
    story:
      "ReWear helped me completely transform my wardrobe sustainably. I love knowing that my old clothes are being loved by someone else.",
    swaps: 32,
    savings: "$1,890",
  },
  {
    user: "Maria L.",
    avatar: "/placeholder.svg?height=50&width=50",
    story:
      "As a college student, ReWear has been a lifesaver. I can stay fashionable without breaking the bank or harming the environment.",
    swaps: 28,
    savings: "$1,245",
  },
]

const impactData = [
  {
    metric: "Water Saved",
    value: "2.3M",
    unit: "liters",
    description: "Equivalent to 920 bathtubs full of water",
  },
  {
    metric: "CO₂ Reduced",
    value: "234",
    unit: "tons",
    description: "Same as taking 51 cars off the road for a year",
  },
  {
    metric: "Textile Waste Prevented",
    value: "45.7",
    unit: "tons",
    description: "Enough to fill 3 garbage trucks",
  },
  {
    metric: "Trees Saved",
    value: "1,247",
    unit: "trees",
    description: "Equivalent to a small forest",
  },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">ReWear</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/browse">Browse Items</Link>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/signup">Join Community</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100">
            <Users className="w-4 h-4 mr-1" />
            Growing Community
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Our Community</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of conscious consumers creating a more sustainable future through fashion. Together, we're
            making a real difference.
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
            <Link href="/signup">Become a Member</Link>
          </Button>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See the incredible impact our community is making on the environment and fashion industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {communityStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Environmental Impact */}
          <div className="bg-green-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Environmental Impact This Year</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactData.map((impact, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {impact.value}
                    <span className="text-lg ml-1">{impact.unit}</span>
                  </div>
                  <div className="font-semibold text-gray-900 mb-2">{impact.metric}</div>
                  <div className="text-sm text-gray-600">{impact.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="members" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="members">Top Members</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="stories">Success Stories</TabsTrigger>
              <TabsTrigger value="chapters">Local Chapters</TabsTrigger>
              <TabsTrigger value="whatsapp">WhatsApp Community</TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Champions</h2>
                <p className="text-gray-600">Meet our most active and helpful community members</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topSwappers.map((member, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{member.name}</h3>
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              {member.badge}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Recycle className="w-4 h-4" />
                              {member.swaps} swaps
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {member.rating}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {member.location}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {member.specialties.map((specialty, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
                <p className="text-gray-600">Join local swap events and meet fellow community members</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="relative">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-600">
                        {event.attendees}/{event.maxAttendees} attending
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString()} • {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="text-xs text-gray-500">{event.address}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">by {event.organizer}</span>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Join Event
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" size="lg">
                  View All Events
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="stories" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
                <p className="text-gray-600">Real stories from our community members</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {successStories.map((story, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarImage src={story.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{story.user[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{story.user}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{story.swaps} swaps</span>
                            <span className="text-green-600 font-semibold">{story.savings} saved</span>
                          </div>
                        </div>
                      </div>
                      <blockquote className="text-gray-700 italic">"{story.story}"</blockquote>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" size="lg">
                  Share Your Story
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="chapters" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Local Chapters</h2>
                <p className="text-gray-600">Find and connect with ReWear communities in your area</p>
              </div>

            </TabsContent>

            <TabsContent value="whatsapp" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-700 mb-4 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-8 h-8"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.828-2.05C13.41 27.634 14.686 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.18 0-2.336-.207-3.432-.615l-.244-.09-4.646 1.217 1.24-4.527-.16-.234C7.23 18.13 6.5 16.6 6.5 15c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm5.07-6.13c-.277-.139-1.637-.807-1.89-.899-.253-.093-.437-.139-.62.139-.184.277-.713.899-.874 1.085-.16.185-.323.208-.6.07-.277-.139-1.17-.431-2.23-1.374-.824-.735-1.38-1.642-1.542-1.92-.16-.277-.017-.427.122-.565.126-.125.277-.324.415-.486.139-.162.185-.277.277-.462.093-.185.046-.347-.023-.486-.07-.139-.62-1.497-.85-2.05-.224-.539-.453-.466-.62-.475l-.527-.01c-.17 0-.446.064-.68.3-.232.232-.88.861-.88 2.1s.902 2.438 1.028 2.607c.126.162 1.776 2.713 4.305 3.697.602.207 1.07.33 1.436.422.603.153 1.153.132 1.588.08.484-.057 1.637-.668 1.87-1.312.232-.646.232-1.2.162-1.312-.07-.115-.253-.185-.53-.324z"/></svg>
                  WhatsApp Community
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto mb-6">
                  Join our official WhatsApp community to connect, share, and get real-time updates with other ReWear members. Click the button below to join instantly!
                </p>
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 mx-auto"
                  asChild
                >
                  <a href="https://chat.whatsapp.com/CQQOHdMUrNmJosHSWt71kv" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.828-2.05C13.41 27.634 14.686 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.18 0-2.336-.207-3.432-.615l-.244-.09-4.646 1.217 1.24-4.527-.16-.234C7.23 18.13 6.5 16.6 6.5 15c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm5.07-6.13c-.277-.139-1.637-.807-1.89-.899-.253-.093-.437-.139-.62.139-.184.277-.713.899-.874 1.085-.16.185-.323.208-.6.07-.277-.139-1.17-.431-2.23-1.374-.824-.735-1.38-1.642-1.542-1.92-.16-.277-.017-.427.122-.565.126-.125.277-.324.415-.486.139-.162.185-.277.277-.462.093-.185.046-.347-.023-.486-.07-.139-.62-1.497-.85-2.05-.224-.539-.453-.466-.62-.475l-.527-.01c-.17 0-.446.064-.68.3-.232.232-.88.861-.88 2.1s.902 2.438 1.028 2.607c.126.162 1.776 2.713 4.305 3.697.602.207 1.07.33 1.436.422.603.153 1.153.132 1.588.08.484-.057 1.637-.668 1.87-1.312.232-.646.232-1.2.162-1.312-.07-.115-.253-.185-.53-.324z"/></svg>
                    Join WhatsApp Community
                  </a>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <div className="text-center mt-8">
        <Button variant="outline" asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>

      {/* Community Guidelines */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Guidelines</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our community thrives on respect, honesty, and sustainability. Here are our core values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Be Respectful</h3>
                <p className="text-gray-600 text-sm">
                  Treat all community members with kindness and respect. We're all here to make a positive impact.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Communicate Clearly</h3>
                <p className="text-gray-600 text-sm">
                  Be honest about item conditions and responsive in your communications. Good communication builds
                  trust.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Leaf className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Stay Sustainable</h3>
                <p className="text-gray-600 text-sm">
                  Remember our mission of sustainability. Every swap helps reduce waste and protect our environment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Growing Community</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Be part of the sustainable fashion movement. Connect with like-minded individuals and make a real
            difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
              <Link href="/signup">Join ReWear Today</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              asChild
            >
              <Link href="/events">Find Local Events</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-200 text-white hover:bg-green-50 hover:text-green-700 bg-transparent flex items-center gap-2"
              asChild
            >
              <Link href="https://chat.whatsapp.com/CQQOHdMUrNmJosHSWt71kv" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.828-2.05C13.41 27.634 14.686 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.18 0-2.336-.207-3.432-.615l-.244-.09-4.646 1.217 1.24-4.527-.16-.234C7.23 18.13 6.5 16.6 6.5 15c0-5.238 4.262-9.5 9.5-9.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm5.07-6.13c-.277-.139-1.637-.807-1.89-.899-.253-.093-.437-.139-.62.139-.184.277-.713.899-.874 1.085-.16.185-.323.208-.6.07-.277-.139-1.17-.431-2.23-1.374-.824-.735-1.38-1.642-1.542-1.92-.16-.277-.017-.427.122-.565.126-.125.277-.324.415-.486.139-.162.185-.277.277-.462.093-.185.046-.347-.023-.486-.07-.139-.62-1.497-.85-2.05-.224-.539-.453-.466-.62-.475l-.527-.01c-.17 0-.446.064-.68.3-.232.232-.88.861-.88 2.1s.902 2.438 1.028 2.607c.126.162 1.776 2.713 4.305 3.697.602.207 1.07.33 1.436.422.603.153 1.153.132 1.588.08.484-.057 1.637-.668 1.87-1.312.232-.646.232-1.2.162-1.312-.07-.115-.253-.185-.53-.324z"/></svg>
                Join our WhatsApp Community
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
