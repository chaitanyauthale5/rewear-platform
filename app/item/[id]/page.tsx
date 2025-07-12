"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowUpDown,
  Heart,
  Star,
  MapPin,
  Calendar,
  Package,
  Shield,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const itemData = {
  id: 1,
  title: "Vintage Denim Jacket",
  description:
    "Beautiful vintage denim jacket from the 90s. Perfect condition with minimal wear. Features classic button closure, chest pockets, and a timeless design that never goes out of style. Great for layering or as a statement piece.",
  category: "Outerwear",
  type: "Jacket",
  size: "M",
  condition: "Excellent",
  points: 25,
  tags: ["vintage", "denim", "casual", "90s", "unisex"],
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  user: {
    name: "Sarah Martinez",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    totalSwaps: 23,
    joinDate: "2023-06-15",
    location: "New York, NY",
    verified: true,
  },
  availability: "available",
  listedDate: "2024-01-10",
  views: 127,
  likes: 18,
  isLiked: false,
}

const similarItems = [
  {
    id: 2,
    title: "Classic Leather Jacket",
    points: 35,
    image: "/placeholder.svg?height=200&width=200",
    condition: "Very Good",
  },
  {
    id: 3,
    title: "Casual Bomber Jacket",
    points: 22,
    image: "/placeholder.svg?height=200&width=200",
    condition: "Good",
  },
  {
    id: 4,
    title: "Vintage Blazer",
    points: 28,
    image: "/placeholder.svg?height=200&width=200",
    condition: "Excellent",
  },
]

export default function ItemDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(itemData.isLiked)
  const [swapMessage, setSwapMessage] = useState("")
  const [showSwapForm, setShowSwapForm] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % itemData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + itemData.images.length) % itemData.images.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/browse">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Browse
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-green-800">ReWear</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={itemData.images[currentImageIndex] || "/placeholder.svg"}
                alt={itemData.title}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              {itemData.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-white/80 hover:bg-white"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                </Button>
                <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {itemData.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {itemData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-green-600" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${itemData.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{itemData.title}</h1>
                <Badge className={`${itemData.availability === "available" ? "bg-green-600" : "bg-gray-600"}`}>
                  {itemData.availability === "available" ? "Available" : "Not Available"}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>{itemData.category}</span>
                <span>•</span>
                <span>Size {itemData.size}</span>
                <span>•</span>
                <span>{itemData.views} views</span>
                <span>•</span>
                <span>{itemData.likes} likes</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {itemData.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">{itemData.points} Points</span>
                  <Badge className="bg-blue-100 text-blue-800">{itemData.condition}</Badge>
                </div>
                <p className="text-gray-600 mb-6">{itemData.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span>Type: {itemData.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Listed: {new Date(itemData.listedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => setShowSwapForm(!showSwapForm)}
                    disabled={itemData.availability !== "available"}
                  >
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Request Swap
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    disabled={itemData.availability !== "available"}
                  >
                    Redeem with Points
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Swap Request Form */}
            {showSwapForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Send Swap Request</CardTitle>
                  <CardDescription>Propose an item exchange or send a message to the owner</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Hi! I'm interested in swapping this item. I have a [describe your item] that might interest you..."
                    value={swapMessage}
                    onChange={(e) => setSwapMessage(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">Send Request</Button>
                    <Button variant="outline" onClick={() => setShowSwapForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* User Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={itemData.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  {itemData.user.name}
                  {itemData.user.verified && <Shield className="w-4 h-4 text-green-600" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{itemData.user.rating}</span>
                    <span className="text-sm text-gray-600">({itemData.user.totalSwaps} swaps)</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    {itemData.user.location}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Member since {new Date(itemData.user.joinDate).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Items */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600">{item.points} pts</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {item.condition}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
