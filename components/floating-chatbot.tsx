"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Send, Bot, Minimize2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function FloatingChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your ReWear AI assistant powered by Gemini. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const geminiResponses = {
    greeting: [
      "Hello! I'm here to help you with ReWear. What would you like to know?",
      "Hi there! I can assist you with swapping, listing items, or any questions about sustainable fashion.",
    ],
    swapping: [
      "Swapping on ReWear is easy! You can either propose direct item exchanges or use points to redeem items you want.",
      "To start a swap, browse items and click 'Request Swap' on any item you're interested in. You can offer your own items or use points!",
    ],
    listing: [
      "To list an item, click 'Add Item' and upload clear photos, write a detailed description, and select the right category and condition.",
      "Great photos and honest descriptions help your items get more attention. Don't forget to add relevant tags!",
    ],
    points: [
      "You earn points by listing items (5-40 points based on category/condition), completing swaps (+10 points), and getting 5-star ratings (+5 points).",
      "Points can be used to redeem items without direct swaps. It's a flexible way to get what you want!",
    ],
    sustainability: [
      "Every swap on ReWear helps reduce textile waste and carbon emissions. You're making a real difference for the planet!",
      "By choosing to swap instead of buying new, you save water, reduce pollution, and keep clothes out of landfills.",
    ],
    admin: [
      "If you're an admin, you can access the admin panel to moderate content, manage users, and view platform analytics.",
      "Admin features include approving/rejecting items, resolving reports, and monitoring community activity.",
    ],
  }

  const getGeminiResponse = async (userMessage: string): Promise<string> => {
    // Simulate Gemini AI processing
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1500))

    const message = userMessage.toLowerCase()

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return geminiResponses.greeting[Math.floor(Math.random() * geminiResponses.greeting.length)]
    }

    if (message.includes("swap") || message.includes("exchange") || message.includes("trade")) {
      return geminiResponses.swapping[Math.floor(Math.random() * geminiResponses.swapping.length)]
    }

    if (message.includes("list") || message.includes("upload") || message.includes("add item")) {
      return geminiResponses.listing[Math.floor(Math.random() * geminiResponses.listing.length)]
    }

    if (message.includes("point") || message.includes("earn") || message.includes("redeem")) {
      return geminiResponses.points[Math.floor(Math.random() * geminiResponses.points.length)]
    }

    if (message.includes("sustain") || message.includes("environment") || message.includes("eco")) {
      return geminiResponses.sustainability[Math.floor(Math.random() * geminiResponses.sustainability.length)]
    }

    if (message.includes("admin") || message.includes("moderate")) {
      return geminiResponses.admin[Math.floor(Math.random() * geminiResponses.admin.length)]
    }

    // Default Gemini-style response
    return (
      "I understand you're asking about " +
      message.split(" ").slice(0, 3).join(" ") +
      ". Could you be more specific? I can help with swapping, listing items, points system, or sustainability questions!"
    )
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await getGeminiResponse(inputValue)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble connecting right now. Please try again later!",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 shadow-2xl transition-all duration-300 ${isMinimized ? "h-16" : "h-96"}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-green-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Bot className="w-4 h-4" />
            ReWear AI Assistant
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-6 w-6 p-0 text-white hover:bg-green-700"
            >
              <Minimize2 className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0 text-white hover:bg-green-700"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-80 p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 text-sm ${
                        message.sender === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.content}
                      <div className={`text-xs mt-1 ${message.sender === "user" ? "text-green-100" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                        <span className="text-sm text-gray-500">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t p-3">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
