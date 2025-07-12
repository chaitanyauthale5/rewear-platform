"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Filter, Star, Heart, ArrowUpDown, Leaf, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Item = {
  id: number;
  title: string;
  category: string;
  condition: string;
  points: number;
  image: string;
  user: string;
  rating: number;
  badges: string[];
  size: string;
  location?: string;
};
const items = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    condition: "Excellent",
    points: 25,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTkclKpw619MQ5VH-wIUGETkmTxJPQrVpt-AhOXWtsGjALlN3pmFgULgScRFxSmY6OD_73DdqOa7KsyRYUktTly8j3LK7Np7p7bHdFWI-Hk",
    user: "Sarah M.",
    rating: 4.8,
    badges: ["Trending", "Eco-Friendly", "Vintage"],
    size: "L"
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
    badges: ["Casual", "Youth Pick"],
    size: "XS"
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
    badges: ["Sustainable", "Unisex"],
    size: "XL"
  },
  {
    id: 4,
    title: "Floral Maxi Dress",
    category: "Dresses",
    condition: "Excellent",
    points: 22,
    image: "https://i.etsystatic.com/5324897/r/il/b89780/1231423960/il_570xN.1231423960_gffw.jpg",
    user: "Anjali T.",
    rating: 4.9,
    badges: ["Boho", "Flowy"],
    size: "S"
  },
  {
    id: 5,
    title: "Canvas Tote Bag",
    category: "Accessories",
    condition: "Good",
    points: 8,
    image: "https://5.imimg.com/data5/SELLER/Default/2024/2/392791212/PK/ZT/VC/76397703/cotton-canvas-tote-bag-500x500.png",
    user: "Manav V.",
    rating: 4.3,
    badges: ["Reusable", "Handmade"],
    size: "M"
  },
  {
    id: 6,
    title: "Corduroy Pants",
    category: "Bottoms",
    condition: "Excellent",
    points: 20,
    image: "https://m.media-amazon.com/images/I/61BFBQcfjiL._UY1100_.jpg",
    user: "Sneha R.",
    rating: 4.6,
    badges: ["Vintage", "Warm"],
    size: "XL"
  },
  {
    id: 7,
    title: "Faux Fur Jacket",
    category: "Outerwear",
    condition: "Excellent",
    points: 28,
    image: "https://i.ebayimg.com/images/g/sVUAAOSweh9ilWXe/s-l1200.jpg",
    user: "Arjun K.",
    rating: 4.9,
    badges: ["Luxury", "Vegan"],
    size: "S"
  },
  {
    id: 8,
    title: "Polka Dot Top",
    category: "Tops",
    condition: "Good",
    points: 12,
    image: "https://fabnest.co.in/cdn/shop/products/4_902d51e0-3105-46bd-bd2a-3f35f06365a2_2400x.jpg?v=1694066302",
    user: "Riya S.",
    rating: 4.4,
    badges: ["Retro", "Chic"],
    size: "XXL"
  },
  {
    id: 9,
    title: "Winter Beanie",
    category: "Accessories",
    condition: "Fair",
    points: 5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiNc7VX_z2Ev3dCRDzCJFxwdzn30nSDPLOXg&s",
    user: "Aman N.",
    rating: 4.0,
    badges: ["Warm", "Handknit"],
    size: "L"
  },
  {
    id: 10,
    title: "Linen Culottes",
    category: "Bottoms",
    condition: "Excellent",
    points: 19,
    image: "https://sutionline.in/cdn/shop/files/81071712040323.jpg?v=1719577716&width=1200",
    user: "Deepika A.",
    rating: 4.7,
    badges: ["Breathable", "Eco-Friendly"],
    size: "XS"
  },
  {
    id: 11,
    title: "Ankle Boots",
    category: "Footwear",
    condition: "Good",
    points: 17,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4H1PF34k7Bfzuzo43xAMSn-NY3X0dspe8uhJ_lr8xzQIimBUHga3LAzd_vlgFJ9w2OAQ&usqp=CAU",
    user: "Farhan I.",
    rating: 4.2,
    badges: ["Retro", "All-Season"],
    size: "XL"
  },
  {
    id: 12,
    title: "Hooded Raincoat",
    category: "Outerwear",
    condition: "Excellent",
    points: 24,
    image: "https://m.media-amazon.com/images/I/51oTd10RpPL._UF350,350_QL80_.jpg",
    user: "Meera V.",
    rating: 4.8,
    badges: ["Weather-Proof", "Packable"],
    size: "M"
  },
  {
    id: 13,
    title: "Plaid Shirt",
    category: "Tops",
    condition: "Good",
    points: 13,
    image: "https://imagescdn.thecollective.in/img/app/product/9/971427-12752086.jpg?asp=true&crop=500&auto=format",
    user: "Nikhil B.",
    rating: 4.3,
    badges: ["Unisex", "Classic"],
    size: "L"
  },
  {
    id: 14,
    title: "Beaded Necklace",
    category: "Accessories",
    condition: "Fair",
    points: 6,
    image: "https://www.onlinepng.com/cdn/shop/files/NEL1002200-4.jpg?v=1719402476&width=1780",
    user: "Tina D.",
    rating: 4.1,
    badges: ["Handmade", "Minimal"],
    size: "XXL"
  },
  {
    id: 15,
    title: "Lace Midi Dress",
    category: "Dresses",
    condition: "Excellent",
    points: 26,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFuIWmnqXAQ2YTa6fPcXJgfVTrqsBcfNNZPA&s",
    user: "Sonia P.",
    rating: 4.9,
    badges: ["Party", "Elegant"],
    size: "XL"
  },
  {
    id: 16,
    title: "Wool Scarf",
    category: "Accessories",
    condition: "Excellent",
    points: 9,
    image: "https://www.kashmirbox.com/cdn/shop/products/KB9411.jpg?v=1598295586",
    user: "Zara J.",
    rating: 4.6,
    badges: ["Winter", "Soft"],
    size: "S"
  },
  {
    id: 17,
    title: "Retro Track Pants",
    category: "Bottoms",
    condition: "Fair",
    points: 14,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT60UnSE5i1oYQqibh745NssM-nz9ckz3K1MQ&s",
    user: "Chris L.",
    rating: 4.2,
    badges: ["Sporty", "Comfort"],
    size: "XS"
  },
  {
    id: 18,
    title: "Velvet Blazer",
    category: "Outerwear",
    condition: "Good",
    points: 23,
    image: "https://m.media-amazon.com/images/I/61N0D9gzRIL.UY1100.jpg",
    user: "Ishaan V.",
    rating: 4.5,
    badges: ["Vintage", "Classy"],
    size: "XXL"
  },
  {
    id: 19,
    title: "Strappy Sandals",
    category: "Footwear",
    condition: "Fair",
    points: 11,
    image: "https://m.media-amazon.com/images/I/51orNEsdbBL.UY1000.jpg",
    user: "Ritika M.",
    rating: 4.0,
    badges: ["Minimal", "Lightweight"],
    size: "S"
  },
  {
    id: 20,
    title: "Crochet Shrug",
    category: "Tops",
    condition: "Excellent",
    points: 16,
    image: "https://cdn.shopify.com/s/files/1/0774/5811/2825/files/Easy_Crochet_Cocoon_Shrug_Pattern_Cocoon_Cardigan_Pattern_Pumpkin_Pie_Shrug_by_lets_all_crochet_2_medium2.jpg?v=1733888051",
    user: "Aarushi Y.",
    rating: 4.8,
    badges: ["Boho", "Handcrafted"],
    size: "M"
  },
  {
    id: 21,
    title: "Silk Kurti",
    category: "Dresses",
    condition: "Good",
    points: 21,
    image: "https://www.jiomart.com/images/product/original/rv86ci30pd/halfsaree-studio-pink-banarasi-silk-straight-kurta-top-product-images-rv86ci30pd-0-202308130422.jpg?im=Resize=(500,630)",
    user: "Faizan R.",
    rating: 4.4,
    badges: ["Traditional", "Eco-Friendly"],
    size: "XXL"
  },
  {
    id: 22,
    title: "Sports Cap",
    category: "Accessories",
    condition: "Good",
    points: 7,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9P1dPpKs-sNbz7vKVyPv-oT-HqyAHObpvjw&s",
    user: "Dev S.",
    rating: 4.3,
    badges: ["Outdoor", "Cool"],
    size: "L"
  },
  {
    id: 23,
    title: "Ethnic Dupatta",
    category: "Accessories",
    condition: "Excellent",
    points: 8,
    image: "https://5.imimg.com/data5/FP/QH/MY-33082539/ethnic-block-printed-dupatta-500x500.jpg",
    user: "Neha A.",
    rating: 4.7,
    badges: ["Handwoven", "Festive"],
    size: "M"
  },
  {
    id: 24,
    title: "Recycled Yoga Pants",
    category: "Bottoms",
    condition: "Excellent",
    points: 18,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_15puad1tNPcbWXL3FzzxNf1EmUHzbU8Cww&s",
    user: "Mitali T.",
    rating: 4.6,
    badges: ["Fitness", "Stretchable"],
    size: "M"
  },
  {
    id: 25,
    title: "Suede Loafers",
    category: "Footwear",
    condition: "Good",
    points: 20,
    image: "https://m.media-amazon.com/images/I/71DU7wnsYVL.UY1000.jpg",
    user: "Rohit N.",
    rating: 4.5,
    badges: ["Office Wear", "Comfort"],
    size: "XS"
  }
]


const categories = ["All", "Outerwear", "Dresses", "Tops", "Bottoms", "Footwear", "Accessories"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
const conditions = ["Like New", "Excellent", "Very Good", "Good", "Fair"]


function ItemDetailsModal({ item, open, onClose }: { item: Item | null; open: boolean; onClose: () => void }) {
  if (!item || !open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>&times;</button>
        <div className="flex flex-col items-center">
          <img src={item.image} alt={item.title} className="w-48 h-48 object-cover rounded mb-4" />
          <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            {item.badges && item.badges.map((badge, i) => (
              <span key={i} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">{badge}</span>
            ))}
          </div>
          <div className="mb-2 text-gray-700">
            <strong>Category:</strong> {item.category}
          </div>
          <div className="mb-2 text-gray-700">
            <strong>Size:</strong> {item.size}
          </div>
          <div className="mb-2 text-gray-700">
            <strong>Condition:</strong> {item.condition}
          </div>
          <div className="mb-2 text-gray-700">
            <strong>Points:</strong> {item.points}
          </div>
          <div className="mb-2 text-gray-700">
            <strong>Rating:</strong> {item.rating}
          </div>
          <div className="mb-2 text-gray-700">
            <strong>User:</strong> {item.user}
          </div>
          {item.location && (
            <div className="mb-2 text-gray-700">
              <strong>Location:</strong> {item.location}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [likedItems, setLikedItems] = useState<number[]>([2, 5])

  const [currentPage, setCurrentPage] = useState(1)
  const [allItems, setAllItems] = useState(items)
  const itemsPerPage = 8
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Add more items to simulate loading
  const loadMoreItems = () => {
    const newItems = Array.from({ length: 8 }, (_, i) => ({
      id: allItems.length + i + 1,
      title: `Item ${allItems.length + i + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      size: "M",
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      points: Math.floor(Math.random() * 40) + 10,
      image: "/placeholder.svg?height=300&width=300",
      user: `User ${allItems.length + i + 1}`,
      rating: (Math.random() * 2 + 3).toFixed(1),
      location: ["New York", "Los Angeles", "Chicago", "Boston", "Seattle"][Math.floor(Math.random() * 5)],
      tags: ["casual", "vintage", "designer"][Math.floor(Math.random() * 3)],
      liked: false,
    }))
    setAllItems((prev:any) => [...prev, ...newItems]);

  }

  const toggleLike = (itemId: number) => {
    setLikedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const filteredItems = allItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
      //item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(item.size)
    const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(item.condition)

    return matchesSearch && matchesCategory && matchesSize && matchesCondition
  })

  const paginatedItems = filteredItems.slice(0, currentPage * itemsPerPage);

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
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/add-item">List an Item</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search items, brands, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="points-low">Points: Low to High</SelectItem>
                  <SelectItem value="points-high">Points: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {(showFilters || (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <Label key={size} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedSizes.includes(size)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSizes([...selectedSizes, size])
                            } else {
                              setSelectedSizes(selectedSizes.filter((s) => s !== size))
                            }
                          }}
                        />
                        {size}
                      </Label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Condition</h3>
                  <div className="flex flex-wrap gap-2">
                    {conditions.map((condition) => (
                      <Label key={condition} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedConditions.includes(condition)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedConditions([...selectedConditions, condition])
                            } else {
                              setSelectedConditions(selectedConditions.filter((c) => c !== condition))
                            }
                          }}
                        />
                        {condition}
                      </Label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Browse Items ({filteredItems.length} found)</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2 right-2 flex justify-between">
                    <Badge className="bg-green-600">{item.points} pts</Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleLike(item.id)
                      }}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedItems.includes(item.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="outline" className="bg-white/90">
                      {item.condition}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.category} • Size {item.size}
                  </p>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">by {item.user}</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                      <ArrowUpDown className="w-3 h-3 mr-1" />
                      Swap
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={() => { setSelectedItem(item); setModalOpen(true); }}>
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredItems.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                // If there are more items to display locally, just increment the page
                if ((currentPage * itemsPerPage) < filteredItems.length) {
                  setCurrentPage((prev) => prev + 1);
                } else {
                  // Otherwise, load more items and then increment the page
                  loadMoreItems();
                  setCurrentPage((prev) => prev + 1);
                }
              }}
            >
              Load More Items
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Showing {Math.min(filteredItems.length, currentPage * itemsPerPage)} of {filteredItems.length} items
            </p>
          </div>
        )}

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setSelectedSizes([])
                setSelectedConditions([])
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      <div className="text-center mt-8">
        <Button variant="outline" asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
      <ItemDetailsModal item={selectedItem} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
