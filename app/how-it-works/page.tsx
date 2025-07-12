import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Upload,
  Search,
  ArrowUpDown,
  Star,
  Shield,
  Recycle,
  Heart,
  CheckCircle,
  Users,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

const steps = [
  {
    number: 1,
    title: "Create Your Account",
    description: "Sign up for free and join our sustainable fashion community",
    icon: Users,
    details: [
      "Quick and easy registration",
      "Verify your email address",
      "Set up your profile and preferences",
      "Start with 10 welcome points",
    ],
  },
  {
    number: 2,
    title: "List Your Items",
    description: "Upload photos and details of clothing you no longer wear",
    icon: Upload,
    details: [
      "Take clear, well-lit photos",
      "Write honest descriptions",
      "Select category and condition",
      "Add relevant tags for discovery",
    ],
  },
  {
    number: 3,
    title: "Browse & Discover",
    description: "Explore thousands of items from our community",
    icon: Search,
    details: [
      "Filter by size, category, and condition",
      "Save items to your wishlist",
      "View detailed item information",
      "Check user ratings and reviews",
    ],
  },
  {
    number: 4,
    title: "Swap or Redeem",
    description: "Exchange items directly or use points to get what you want",
    icon: ArrowUpDown,
    details: [
      "Propose direct item swaps",
      "Use points for flexible redemption",
      "Communicate with other users",
      "Arrange safe meetups or shipping",
    ],
  },
  {
    number: 5,
    title: "Rate & Review",
    description: "Build trust in the community through honest feedback",
    icon: Star,
    details: [
      "Rate your swap experience",
      "Leave helpful reviews",
      "Build your reputation score",
      "Help others make informed decisions",
    ],
  },
  {
    number: 6,
    title: "Make Impact",
    description: "Track your positive environmental contribution",
    icon: Leaf,
    details: [
      "See your CO₂ savings",
      "Track water conservation",
      "Monitor waste reduction",
      "Earn sustainability badges",
    ],
  },
]

const benefits = [
  {
    icon: Recycle,
    title: "Reduce Waste",
    description: "Keep clothing out of landfills and give them new life",
  },
  {
    icon: Heart,
    title: "Save Money",
    description: "Refresh your wardrobe without spending on new clothes",
  },
  {
    icon: Leaf,
    title: "Help Environment",
    description: "Reduce carbon footprint and water usage from fashion industry",
  },
  {
    icon: Users,
    title: "Build Community",
    description: "Connect with like-minded people who care about sustainability",
  },
]

const pointsSystem = [
  {
    action: "List an item",
    points: "+5-40",
    description: "Earn points based on item category and condition",
  },
  {
    action: "Complete a swap",
    points: "+10",
    description: "Bonus points for successful exchanges",
  },
  {
    action: "Get 5-star rating",
    points: "+5",
    description: "Reward for excellent service to community",
  },
  {
    action: "Refer a friend",
    points: "+25",
    description: "Help grow our sustainable community",
  },
]

export default function HowItWorksPage() {
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
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100">
            <Leaf className="w-4 h-4 mr-1" />
            Sustainable Fashion Made Simple
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">How ReWear Works</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of conscious consumers in creating a circular fashion economy. Here's how you can start
            making a difference today.
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
            <Link href="/signup">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Steps to Sustainable Fashion</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting started with ReWear is easy. Follow these simple steps to begin your sustainable fashion journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={step.number} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.number}
                    </div>
                    <step.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <CardDescription className="text-base">{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Points System */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Understanding Our Points System</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Earn points by contributing to the community and use them to get items you love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  How to Earn Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pointsSystem.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold">{item.action}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <Badge className="bg-green-600">{item.points}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="w-5 h-5 text-green-600" />
                  Two Ways to Exchange
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Direct Swaps</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Exchange items directly with other users. Perfect for equal value trades.
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">No points required</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Points Redemption</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Use your earned points to get items without direct exchanges.
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Flexible and convenient</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ReWear?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every swap makes a difference. Here's how you benefit while helping the planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <benefit.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Trust */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Safety & Trust</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We prioritize your safety and build trust through transparency and community guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Verified Users</h3>
                <p className="text-gray-600 text-sm">
                  All users go through email verification and can earn verified badges through positive interactions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Star className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Rating System</h3>
                <p className="text-gray-600 text-sm">
                  Rate and review every interaction to help build a trustworthy community for everyone.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Moderated Content</h3>
                <p className="text-gray-600 text-sm">
                  Our team reviews all listings to ensure quality and appropriateness before they go live.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Swapping?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of fashion-conscious individuals making a positive impact on the planet through sustainable
            swapping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
              <Link href="/signup">Create Free Account</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              asChild
            >
              <Link href="/browse">Browse Items</Link>
            </Button>
          </div>
        </div>
      </section>
      <div className="text-center mt-8">
        <Button variant="outline" asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  )
}
