import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Leaf, Users, Recycle, Heart, Star, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const clothingItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    condition: "Excellent",
    points: 25,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTkclKpw619MQ5VH-wIUGETkmTxJPQrVpt-AhOXWtsGjALlN3pmFgULgScRFxSmY6OD_73DdqOa7KsyRYUktTly8j3LK7Np7p7bHdFWI-Hk",
    user: "Sarah M.",
    rating: 4.8,
    badges: ["Trending", "Eco-Friendly", "Vintage"]
  },
  {
    id: 2,
    title: "Graphic Oversized Tee",
    category: "Tops",
    condition: "Fair",
    points: 10,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIdNwdYG0GWmxrrOJOryTXcGdX0ECGCe7IxQ&s",
    user: "Raj P.",
    rating: 4.1,
    badges: ["Casual", "Youth Pick"]
  },
  {
    id: 3,
    title: "Recycled Sneakers",
    category: "Footwear",
    condition: "Good",
    points: 18,
    image: "https://everydayrecycler.com/wp-content/uploads/2020/09/Old-Shoes.jpg",
    user: "Karan S.",
    rating: 4.5,
    badges: ["Sustainable", "Unisex"]
  }
]
const stats = [
  { label: "Items Exchanged", value: "12,847", icon: Recycle },
  { label: "Active Members", value: "3,421", icon: Users },
  { label: "CO₂ Saved (kg)", value: "8,932", icon: Leaf },
  { label: "Community Rating", value: "4.9", icon: Star },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">ReWear</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/browse" className="text-gray-600 hover:text-green-600 transition-colors">
              Browse Items
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">
              How It Works
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-green-600 transition-colors">
              Community
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100">
            <Leaf className="w-4 h-4 mr-1" />
            Sustainable Fashion Revolution
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Reviving Fashion,
            <span className="text-green-600 block">Reducing Waste</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of conscious consumers exchanging unused clothing through direct swaps or our innovative
            point-based system. Make fashion sustainable, one swap at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/signup">
                Start Swapping <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/browse">Browse Items</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/add-item">List an Item</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="border-green-200">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </section>

      {/* Featured Items Carousel */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Items</h2>
            <p className="text-gray-600">Discover amazing pieces from our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clothingItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600">{item.points} pts</Badge>
                    {/* Product Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {item.badges.slice(0, 2).map((badge:string, index:number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className={`text-xs ${
                            badge === "Premium"
                              ? "bg-purple-100 text-purple-800"
                              : badge === "Trending"
                                ? "bg-orange-100 text-orange-800"
                                : badge === "New"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                          }`}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {item.condition}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{item.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">by {item.user}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/browse">View All Items</Link>
            </Button>
          </div>
        </div>
        </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-green-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How ReWear Works</h2>
            <p className="text-gray-600">Simple steps to sustainable fashion</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">List Your Items</h3>
              <p className="text-gray-600">Upload photos and details of clothing you no longer wear</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse & Swap</h3>
              <p className="text-gray-600">Find items you love and propose swaps or use points</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make Impact</h3>
              <p className="text-gray-600">Reduce waste while refreshing your wardrobe sustainably</p>
            </div>
          </div>
        </div>
        </section>

      {/* Impact Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Environmental Impact</h2>
          <p className="text-gray-600 mb-8">Together, we're making a difference</p>
          <div className="bg-green-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-600">89%</div>
                <p className="text-gray-600">Reduction in textile waste</p>
              </div>
              <div>
                <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-600">2.3M</div>
                <p className="text-gray-600">Liters of water saved</p>
              </div>
              <div>
                <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-600">15K</div>
                <p className="text-gray-600">Happy community members</p>
              </div>
            </div>
          </div>
        </div>
        </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Sustainable Journey?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of fashion-conscious individuals making a positive impact on the planet
          </p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
            <Link href="/signup">
              Join ReWear Today <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
        </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">ReWear</span>
              </Link>
              <p className="text-gray-400">Reviving fashion, reducing waste, one swap at a time.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/browse" className="hover:text-white">
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link href="/add-item" className="hover:text-white">
                    List an Item
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/community" className="hover:text-white">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-white">
                    Local Events
                  </Link>
                </li>
                <li>
                  <Link href="/impact" className="hover:text-white">
                    Impact Report
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ReWear. All rights reserved. Made with 💚 for the planet.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
