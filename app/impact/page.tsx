import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Leaf, Droplets, Recycle, TrendingUp, Users, Globe, Award, Target } from 'lucide-react'
import Link from "next/link"

const impactStats = [
  {
    title: "Water Saved",
    value: "2.3M",
    unit: "liters",
    description: "Equivalent to 920 bathtubs",
    icon: Droplets,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    progress: 78,
  },
  {
    title: "CO₂ Reduced",
    value: "234",
    unit: "tons",
    description: "Same as 51 cars off road/year",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-100",
    progress: 65,
  },
  {
    title: "Textile Waste Prevented",
    value: "45.7",
    unit: "tons",
    description: "Enough to fill 3 garbage trucks",
    icon: Recycle,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    progress: 82,
  },
  {
    title: "Trees Saved",
    value: "1,247",
    unit: "trees",
    description: "Equivalent to a small forest",
    icon: Globe,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    progress: 71,
  },
]

const monthlyData = [
  { month: "Jan", swaps: 1200, co2: 18, water: 180000 },
  { month: "Feb", swaps: 1450, co2: 22, water: 220000 },
  { month: "Mar", swaps: 1680, co2: 25, water: 250000 },
  { month: "Apr", swaps: 1920, co2: 29, water: 290000 },
  { month: "May", swaps: 2100, co2: 32, water: 315000 },
  { month: "Jun", swaps: 2350, co2: 35, water: 350000 },
]

const goals2024 = [
  {
    title: "Prevent 100 tons of textile waste",
    current: 45.7,
    target: 100,
    unit: "tons",
    progress: 46,
  },
  {
    title: "Save 5 million liters of water",
    current: 2.3,
    target: 5,
    unit: "million liters",
    progress: 46,
  },
  {
    title: "Reduce 500 tons of CO₂",
    current: 234,
    target: 500,
    unit: "tons",
    progress: 47,
  },
  {
    title: "Reach 50,000 active users",
    current: 15247,
    target: 50000,
    unit: "users",
    progress: 30,
  },
]

export default function ImpactPage() {
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
              <Link href="/community">Community</Link>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/signup">Join Us</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
            <TrendingUp className="w-4 h-4 mr-1" />
            Impact Report 2024
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Environmental
            <span className="text-green-600 block">Impact</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Together, we're creating a measurable positive impact on the environment through sustainable fashion practices. 
            Here's how our community is making a difference.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactStats.map((stat, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {stat.progress}% of goal
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                    <span className="text-sm text-gray-600">{stat.unit}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{stat.title}</h3>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                  <Progress value={stat.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Trends */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Monthly Impact Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Swaps Completed</h4>
                <div className="space-y-2">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{data.month}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(data.swaps / 2500) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">{data.swaps}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">CO₂ Saved (tons)</h4>
                <div className="space-y-2">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{data.month}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(data.co2 / 40) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">{data.co2}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Water Saved (L)</h4>
                <div className="space-y-2">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{data.month}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${(data.water / 400000) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">{(data.water / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2024 Goals */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              2024 Sustainability Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals2024.map((goal, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{goal.title}</h4>
                    <Badge variant="outline">{goal.progress}%</Badge>
                  </div>
                  <Progress value={goal.progress} className="h-3" />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{goal.current} {goal.unit}</span>
                    <span>Goal: {goal.target} {goal.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Community Growth
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">15,247</div>
                <p className="text-gray-600">Active Community Members</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gray-900">89,432</div>
                  <p className="text-sm text-gray-600">Items Swapped</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">156</div>
                  <p className="text-sm text-gray-600">Local Events</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-green-600" />
                Recognition & Awards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Sustainable Fashion Award 2024</p>
                  <p className="text-sm text-gray-600">Best Community Platform</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Green Tech Innovation</p>
                  <p className="text-sm text-gray-600">Environmental Impact Category</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Community Choice Award</p>
                  <p className="text-sm text-gray-600">People's Favorite Platform</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Be Part of the Change</h2>
          <p className="text-xl mb-6 opacity-90">
            Every swap you make contributes to these incredible environmental savings. 
            Join our community and help us reach our 2024 goals!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
              <Link href="/signup">Join ReWear Today</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent" asChild>
              <Link href="/browse">Start Swapping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
