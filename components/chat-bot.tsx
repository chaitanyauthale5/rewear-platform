"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, Bot, User, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatBotProps {
  onClose: () => void
}

const predefinedResponses = {
  greeting: [
    "Hello! I'm your ReWear assistant. How can I help you today?",
    "Hi there! I'm here to help you with anything related to ReWear. What would you like to know?",
    "Welcome to ReWear! I can help you with listing items, finding swaps, or answering any questions.",
  ],
  listing: [
    "To list an item, make sure you have clear photos, a detailed description, and select the right category and condition. This helps other users find your item!",
    "Great photos are key to successful swaps! Take pictures in good lighting and show any wear or details. Don't forget to add relevant tags!",
    "The estimated points are calculated based on your item's category and condition. Higher quality items in popular categories earn more points.",
  ],
  swapping: [
    "You can swap items directly with other users or use points to redeem items. Direct swaps are great for equal value exchanges!",
    "When requesting a swap, be polite and explain why you're interested in their item. Good communication leads to successful swaps!",
    "Points are earned when your items are swapped. You can use these points to get items without direct exchanges.",
  ],
  sustainability: [
    "Every swap on ReWear helps reduce textile waste! You're contributing to a more sustainable fashion industry.",
    "By choosing to swap instead of buying new, you're saving water, reducing carbon emissions, and keeping clothes out of landfills.",
    "ReWear promotes circular fashion - giving clothes a second life instead of letting them go to waste.",
  ],
  default: [
    "I'm not sure about that specific question, but I'm here to help with ReWear-related topics like listing items, swapping, and sustainability!",
    "That's an interesting question! For specific issues, you might want to contact our support team. Is there anything else about ReWear I can help with?",
    "I'd love to help! Could you rephrase your question or ask about something specific to ReWear like how to list items or find swaps?",
  ],
}

export function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your ReWear assistant powered by AI. I can help you with listing items, finding swaps, understanding our point system, and more. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return predefinedResponses.greeting[Math.floor(Math.random() * predefinedResponses.greeting.length)]
    }

    if (
      message.includes("list") ||
      message.includes("upload") ||
      message.includes("photo") ||
      message.includes("item")
    ) {
      return predefinedResponses.listing[Math.floor(Math.random() * predefinedResponses.listing.length)]
    }

    if (
      message.includes("swap") ||
      message.includes("exchange") ||
      message.includes("trade") ||
      message.includes("point")
    ) {
      return predefinedResponses.swapping[Math.floor(Math.random() * predefinedResponses.swapping.length)]
    }

    if (
      message.includes("sustain") ||
      message.includes("environment") ||
      message.includes("eco") ||
      message.includes("green")
    ) {
      return predefinedResponses.sustainability[Math.floor(Math.random() * predefinedResponses.sustainability.length)]
    }

    return predefinedResponses.default[Math.floor(Math.random() * predefinedResponses.default.length)]
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

    // Simulate AI response delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getResponse(inputValue),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsLoading(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-green-600" />
            ReWear Assistant
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === "bot" && <Bot className="w-4 h-4 mt-0.5 text-green-600" />}
                      {message.sender === "user" && <User className="w-4 h-4 mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.sender === "user" ? "text-green-100" : "text-gray-500"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-green-600" />
                      <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                      <span className="text-sm text-gray-500">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about ReWear..."
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isLoading}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
