"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Trash2,
  Shield,
  TrendingUp,
  Leaf,
} from "lucide-react"
import Image from "next/image"

const stats = [
  { label: "Total Users", value: "3,421", change: "+12%", icon: Users },
  { label: "Active Items", value: "1,847", change: "+8%", icon: Package },
  { label: "Pending Reviews", value: "23", change: "-5%", icon: AlertTriangle },
  { label: "Completed Swaps", value: "12,847", change: "+15%", icon: CheckCircle },
]

const pendingItems = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    user: "Sarah Johnson",
    category: "Outerwear",
    condition: "Excellent",
    submittedDate: "2024-01-15",
    image: "/placeholder.svg?height=100&width=100",
    status: "pending",
  },
  {
    id: 2,
    title: "Designer Handbag",
    user: "Emma Wilson",
    category: "Accessories",
    condition: "Like New",
    submittedDate: "2024-01-14",
    image: "/placeholder.svg?height=100&width=100",
    status: "pending",
  },
  {
    id: 3,
    title: "Summer Dress",
    user: "Lisa Chen",
    category: "Dresses",
    condition: "Very Good",
    submittedDate: "2024-01-13",
    image: "/placeholder.svg?height=100&width=100",
    status: "pending",
  },
]

const reportedItems = [
  {
    id: 1,
    title: "Suspicious Item Listing",
    reportedBy: "Mike Rodriguez",
    itemTitle: "Designer Watch",
    reason: "Counterfeit product",
    date: "2024-01-15",
    status: "open",
  },
  {
    id: 2,
    title: "Inappropriate Content",
    reportedBy: "Anna Taylor",
    itemTitle: "Vintage T-Shirt",
    reason: "Offensive imagery",
    date: "2024-01-14",
    status: "investigating",
  },
]

const recentUsers = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex@email.com",
    joinDate: "2024-01-15",
    itemsListed: 3,
    swapsCompleted: 0,
    status: "active",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@email.com",
    joinDate: "2024-01-14",
    itemsListed: 1,
    swapsCompleted: 2,
    status: "active",
  },
  {
    id: 3,
    name: "David Kim",
    email: "david@email.com",
    joinDate: "2024-01-13",
    itemsListed: 5,
    swapsCompleted: 8,
    status: "verified",
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const approveItem = (itemId) => {
    console.log("Approving item:", itemId)
    // Handle item approval
  }

  const rejectItem = (itemId) => {
    console.log("Rejecting item:", itemId)
    // Handle item rejection
  }

  const resolveReport = (reportId) => {
    console.log("Resolving report:", reportId)
    // Handle report resolution
  }

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
            <Badge className="ml-2 bg-red-100 text-red-800">
              <Shield className="w-3 h-3 mr-1" />
              Admin
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">View Site</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, moderate content, and monitor platform activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <stat.icon className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
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
                    <span className="text-sm">New user registration: Alex Thompson</span>
                    <span className="text-xs text-gray-500 ml-auto">2h ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Item approved: Vintage Leather Jacket</span>
                    <span className="text-xs text-gray-500 ml-auto">4h ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Report received: Suspicious listing</span>
                    <span className="text-xs text-gray-500 ml-auto">6h ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Swap completed: Designer Handbag</span>
                    <span className="text-xs text-gray-500 ml-auto">8h ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Platform Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">New Users (This Week)</span>
                      <span className="font-semibold">47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Items Listed (This Week)</span>
                      <span className="font-semibold">123</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Swaps Completed (This Week)</span>
                      <span className="font-semibold">89</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">User Retention Rate</span>
                      <span className="font-semibold text-green-600">87%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Item Approvals</CardTitle>
                <CardDescription>Review and approve or reject new item listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="w-15 h-15 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-600">by {item.user}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.condition}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-2">Submitted {item.submittedDate}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => console.log("View item", item.id)}>
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => approveItem(item.id)}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => rejectItem(item.id)}>
                            <XCircle className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Monitor and manage platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{user.name}</h4>
                          {user.status === "verified" && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">Joined {user.joinDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{user.itemsListed} items listed</p>
                        <p className="text-sm text-gray-600">{user.swapsCompleted} swaps completed</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Reports</CardTitle>
                <CardDescription>Review and resolve user reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportedItems.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{report.title}</h4>
                          <p className="text-sm text-gray-600">
                            Reported by {report.reportedBy} • {report.date}
                          </p>
                        </div>
                        <Badge variant={report.status === "open" ? "destructive" : "secondary"} className="text-xs">
                          {report.status}
                        </Badge>
                      </div>
                      <div className="bg-gray-50 p-3 rounded mb-3">
                        <p className="text-sm">
                          <strong>Item:</strong> {report.itemTitle}
                        </p>
                        <p className="text-sm">
                          <strong>Reason:</strong> {report.reason}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View Item
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => resolveReport(report.id)}
                        >
                          Resolve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-3 h-3 mr-1" />
                          Remove Item
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
