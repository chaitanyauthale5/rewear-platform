import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Leaf, Search, MessageCircle, Book, Video, Mail, Phone, Clock } from 'lucide-react'
import Link from "next/link"

const faqCategories = [
  {
    title: "Getting Started",
    icon: Book,
    faqs: [
      {
        question: "How do I create an account on ReWear?",
        answer: "You can sign up using your email address or Google account. Click 'Sign Up' in the top right corner and follow the simple registration process. You'll receive 10 welcome points to get started!"
      },
      {
        question: "How does the point system work?",
        answer: "You earn points by listing items (5-40 points based on category and condition), completing swaps (+10 points), getting 5-star ratings (+5 points), and referring friends (+25 points). Use points to redeem items without direct swaps."
      },
      {
        question: "Is ReWear free to use?",
        answer: "Yes! ReWear is completely free to use. There are no listing fees, membership costs, or transaction fees. We believe sustainable fashion should be accessible to everyone."
      }
    ]
  },
  {
    title: "Listing Items",
    icon: Video,
    faqs: [
      {
        question: "What items can I list on ReWear?",
        answer: "You can list clothing, shoes, accessories, and fashion items in good condition. Items should be clean, functional, and something you'd be happy to receive yourself. We don't accept undergarments, swimwear, or heavily damaged items."
      },
      {
        question: "How do I take good photos of my items?",
        answer: "Use natural lighting, take photos from multiple angles, show any wear or flaws honestly, and ensure the item is clean and wrinkle-free. Good photos get 3x more interest than poor quality ones!"
      },
      {
        question: "How long does it take for my item to be approved?",
        answer: "Most items are reviewed and approved within 24-48 hours. Our team checks each listing to ensure quality and appropriateness. You'll receive an email notification once your item is live."
      }
    ]
  },
  {
    title: "Swapping",
    icon: MessageCircle,
    faqs: [
      {
        question: "How do I request a swap?",
        answer: "Browse items and click 'Request Swap' on anything you're interested in. You can propose a direct item exchange or offer to use points. Include a friendly message explaining why you're interested!"
      },
      {
        question: "What happens after I request a swap?",
        answer: "The item owner will receive a notification and can accept, decline, or counter your offer. If accepted, you'll coordinate the exchange details through our messaging system."
      },
      {
        question: "How do I arrange pickup and delivery?",
        answer: "Use our built-in map feature to set pickup and destination points. You can arrange to meet in person at safe public locations or use our recommended shipping partners for distant swaps."
      }
    ]
  },
  {
    title: "Safety & Trust",
    icon: MessageCircle,
    faqs: [
      {
        question: "How do I stay safe when meeting for swaps?",
        answer: "Always meet in well-lit public places like coffee shops or malls. Bring a friend if possible, trust your instincts, and use our in-app messaging to coordinate. Never share personal information like your home address."
      },
      {
        question: "What if I'm not happy with a swap?",
        answer: "Contact our support team within 48 hours of the swap. We'll help mediate the situation and may facilitate a return swap if both parties agree. Honest communication usually resolves most issues."
      },
      {
        question: "How does the rating system work?",
        answer: "After each swap, both parties can rate their experience from 1-5 stars and leave optional reviews. High ratings build trust in the community and help others make informed decisions."
      }
    ]
  }
]

const supportOptions = [
  {
    title: "Live Chat",
    description: "Get instant help from our support team",
    icon: MessageCircle,
    availability: "Mon-Fri, 9AM-6PM EST",
    action: "Start Chat"
  },
  {
    title: "Email Support",
    description: "Send us a detailed message",
    icon: Mail,
    availability: "Response within 24 hours",
    action: "Send Email"
  },
  {
    title: "Phone Support",
    description: "Speak directly with our team",
    icon: Phone,
    availability: "Mon-Fri, 10AM-5PM EST",
    action: "Call Now"
  }
]

export default function HelpPage() {
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
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How can we
            <span className="text-green-600 block">help you?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions, learn how to use ReWear effectively, or get in touch with our support team.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Search for help articles, guides, or FAQs..." 
              className="pl-12 h-14 text-lg"
            />
            <Button className="absolute right-2 top-2 bg-green-600 hover:bg-green-700">
              Search
            </Button>
          </div>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Getting Started Guide</h3>
              <p className="text-gray-600 text-sm mb-4">
                New to ReWear? Learn the basics of sustainable swapping in 5 minutes.
              </p>
              <Button variant="outline" className="bg-transparent">Read Guide</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm mb-4">
                Watch step-by-step videos on listing items, swapping, and more.
              </p>
              <Button variant="outline" className="bg-transparent">Watch Videos</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community Forum</h3>
              <p className="text-gray-600 text-sm mb-4">
                Connect with other users and get tips from experienced swappers.
              </p>
              <Button variant="outline" className="bg-transparent">Join Forum</Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-green-600" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Still Need Help?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{option.description}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-4">
                    <Clock className="w-3 h-3" />
                    {option.availability}
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Help Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Link href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">How to write effective item descriptions</span>
                    <Badge variant="outline">Popular</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Tips for creating descriptions that attract swappers</p>
                </Link>
                
                <Link href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Understanding item conditions</span>
                    <Badge variant="outline">Guide</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Learn how to accurately assess and describe item condition</p>
                </Link>
                
                <Link href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Safe meeting practices</span>
                    <Badge variant="outline">Safety</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Best practices for safe in-person exchanges</p>
                </Link>
              </div>
              
              <div className="space-y-3">
                <Link href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Maximizing your points earnings</span>
                    <Badge variant="outline">Tips</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Strategies to earn more points and get better items</p>
                </Link>
                
                <Link href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Building your reputation</span>
                    <Badge variant="outline">Community</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">How to become a trusted member of the ReWear community</p>
                </Link>
                
                <Link href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Troubleshooting common issues</span>
                    <Badge variant="outline">Support</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Solutions to frequently encountered problems</p>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
