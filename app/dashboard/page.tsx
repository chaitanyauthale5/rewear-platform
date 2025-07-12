"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Leaf, Star, Package, ArrowUpDown, CheckCircle, Clock, Plus, Award, Users, Heart, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAppStore } from "@/lib/store"
import { AdvancedMap } from "@/components/advanced-map"
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

const userStats = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  points: 127,
  itemsListed: 12,
  swapsCompleted: 8,
  co2Saved: 23.4,
  level: "Eco Warrior",
  nextLevel: "Planet Guardian",
  progressToNext: 73,
  followers: 45,
  following: 32,
}

const myItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    condition: "Excellent",
    points: 25,
    status: "active",
    views: 47,
    likes: 12,
    image: "/placeholder.svg?height=200&width=200",
    badges: ["Trending", "Vintage", "Popular"],
  },
  {
    id: 2,
    title: "Summer Floral Dress",
    category: "Dresses",
    condition: "Like New",
    points: 30,
    status: "pending",
    views: 23,
    likes: 8,
    image: "/placeholder.svg?height=200&width=200",
    badges: ["New", "Summer"],
  },
  {
    id: 3,
    title: "Leather Boots",
    category: "Footwear",
    condition: "Good",
    points: 35,
    status: "swapped",
    views: 89,
    likes: 24,
    image: "/placeholder.svg?height=200&width=200",
    badges: ["Premium", "Leather"],
  },
]

const wishlistItems = [
  {
    id: 4,
    title: "Designer Handbag",
    category: "Accessories",
    condition: "Excellent",
    points: 45,
    image: "/placeholder.svg?height=200&width=200",
    user: "Emma K.",
    location: "Los Angeles",
    badges: ["Designer", "Premium"],
  },
  {
    id: 5,
    title: "Wool Sweater",
    category: "Tops",
    condition: "Like New",
    points: 28,
    image: "/placeholder.svg?height=200&width=200",
    user: "Mike R.",
    location: "Chicago",
    badges: ["Cozy", "Winter"],
  },
]

const followers = [
  { id: 1, name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40", swaps: 23 },
  { id: 2, name: "Mike Rodriguez", avatar: "/placeholder.svg?height=40&width=40", swaps: 18 },
  { id: 3, name: "Lisa Chen", avatar: "/placeholder.svg?height=40&width=40", swaps: 31 },
]

const following = [
  { id: 4, name: "Anna Taylor", avatar: "/placeholder.svg?height=40&width=40", swaps: 45 },
  { id: 5, name: "David Kim", avatar: "/placeholder.svg?height=40&width=40", swaps: 27 },
]

function FirebaseUserInfo() {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      // If not logged in, redirect to /login
      if (!user) {
        window.location.replace("/login");
      }
    });
    return () => unsubscribe();
  }, []);
  if (!firebaseUser) {
    return (
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-center">
        You are not logged in. Please <a href="/login" className="underline text-yellow-900">log in</a> to see your dashboard.
      </div>
    );
  }
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showMap, setShowMap] = useState(false)
  const { user, addToWishlist, removeFromWishlist } = useAppStore()

  const handleLocationSelect = (pickup: any, destination: any) => {
    console.log("Pickup:", pickup)
    console.log("Destination:", destination)
    // Handle the selected locations for delivery
  }

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
            <Button variant="outline" onClick={() => setShowMap(true)}>
              <MapPin className="w-4 h-4 mr-2" />
              Arrange Pickup
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/add-item">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Firebase Auth User Info */}
        <FirebaseUserInfo />
        {/* Profile Header */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{userStats.name}</h1>
              <p className="text-gray-600">{userStats.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge className="bg-green-100 text-green-800">
                  <Award className="w-3 h-3 mr-1" />
                  {userStats.level}
                </Badge>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Progress to {userStats.nextLevel}:</span>
                  <Progress value={userStats.progressToNext} className="w-24" />
                  <span className="text-sm text-gray-600">{userStats.progressToNext}%</span>
                </div>
              </div>
              {/* Social Stats */}
              <div className="flex items-center gap-6 mt-3">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{userStats.followers} followers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{userStats.following} following</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{userStats.points}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{userStats.swapsCompleted}</div>
                <div className="text-sm text-gray-600">Swaps</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{userStats.itemsListed}</div>
              <div className="text-sm text-gray-600">Items Listed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <ArrowUpDown className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{userStats.swapsCompleted}</div>
              <div className="text-sm text-gray-600">Swaps Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{userStats.co2Saved}</div>
              <div className="text-sm text-gray-600">kg CO₂ Saved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{wishlistItems.length}</div>
              <div className="text-sm text-gray-600">Wishlist Items</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="my-items">My Items</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="swaps">Swaps</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">New swap request for Vintage Denim Jacket</span>
                    <span className="text-xs text-gray-500 ml-auto">2h ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Item "Summer Dress" approved by admin</span>
                    <span className="text-xs text-gray-500 ml-auto">1d ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Earned 25 points from completed swap</span>
                    <span className="text-xs text-gray-500 ml-auto">3d ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>Your contribution to sustainability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Water Saved</span>
                      <span className="font-semibold">1,247 L</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Textile Waste Prevented</span>
                      <span className="font-semibold">12.3 kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Carbon Footprint Reduced</span>
                      <span className="font-semibold">{userStats.co2Saved} kg CO₂</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="my-items" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Items</h2>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/add-item">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Item
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge
                        className={`absolute top-2 right-2 ${
                          item.status === "active"
                            ? "bg-green-600"
                            : item.status === "pending"
                              ? "bg-yellow-600"
                              : "bg-gray-600"
                        }`}
                      >
                        {item.status === "active" ? "Active" : item.status === "pending" ? "Pending" : "Swapped"}
                      </Badge>
                      {/* Product Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {item.badges.slice(0, 2).map((badge, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className={`text-xs ${
                              badge === "Premium"
                                ? "bg-purple-100 text-purple-800"
                                : badge === "Trending"
                                  ? "bg-orange-100 text-orange-800"
                                  : badge === "Popular"
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
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {item.condition}
                        </Badge>
                        <span className="text-sm font-semibold text-green-600">{item.points} pts</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{item.views} views</span>
                        <span>{item.likes} likes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Wishlist</h2>
              <Button variant="outline" asChild>
                <Link href="/browse">Browse More Items</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        onClick={() => removeFromWishlist(item.id.toString())}
                      >
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </Button>
                      {/* Product Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {item.badges.slice(0, 2).map((badge, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className={`text-xs ${
                              badge === "Premium"
                                ? "bg-purple-100 text-purple-800"
                                : badge === "Designer"
                                  ? "bg-orange-100 text-orange-800"
                                  : badge === "Cozy"
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
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {item.condition}
                        </Badge>
                        <span className="text-sm font-semibold text-green-600">{item.points} pts</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>by {item.user}</span>
                        <span>{item.location}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                          <ArrowUpDown className="w-3 h-3 mr-1" />
                          Swap
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {wishlistItems.length === 0 && (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-600 mb-4">Start browsing items to add them to your wishlist</p>
                <Button asChild>
                  <Link href="/browse">Browse Items</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Followers ({followers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {followers.map((follower) => (
                    <div key={follower.id} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={follower.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {follower.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{follower.name}</p>
                        <p className="text-sm text-gray-600">{follower.swaps} swaps completed</p>
                      </div>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        View Profile
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Following ({following.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {following.map((user) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.swaps} swaps completed</p>
                      </div>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Unfollow
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="swaps" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Ongoing Swaps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">Vintage Denim Jacket ↔ Designer Handbag</p>
                        <p className="text-sm text-gray-600">with Emma Wilson</p>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                    <p className="text-xs text-gray-500">Started 2024-01-15</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Decline
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setShowMap(true)} className="bg-transparent">
                        <MapPin className="w-3 h-3 mr-1" />
                        Arrange Pickup
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Completed Swaps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">Winter Coat ↔ Cashmere Sweater</p>
                        <p className="text-sm text-gray-600">with Mike Rodriguez</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Completed 2024-01-08</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Advanced Map Modal */}
      {showMap && <AdvancedMap onClose={() => setShowMap(false)} onLocationSelect={handleLocationSelect} />}
      <div className="text-center mt-8">
        <Button variant="outline" asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  )
}
