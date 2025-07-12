"use server"

import { revalidatePath } from "next/cache"

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = {
    id: Date.now().toString(),
    name,
    email,
    points: 10, // Welcome bonus
    itemsListed: 0,
    swapsCompleted: 0,
    co2Saved: 0,
    level: "Newcomer",
    followers: [],
    following: [],
    wishlist: [],
  }

  return { success: true, user }
}

export async function createItem(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const condition = formData.get("condition") as string
  const size = formData.get("size") as string
  const tags = formData.get("tags") as string

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Calculate points based on category and condition
  const categoryPoints = {
    outerwear: 25,
    dresses: 30,
    tops: 15,
    bottoms: 20,
    footwear: 25,
    accessories: 10,
  }

  const conditionMultiplier = {
    "like-new": 1.2,
    excellent: 1.0,
    "very-good": 0.8,
    good: 0.6,
    fair: 0.4,
  }

  const basePoints = categoryPoints[category as keyof typeof categoryPoints] || 15
  const multiplier = conditionMultiplier[condition as keyof typeof conditionMultiplier] || 1.0
  const points = Math.round(basePoints * multiplier)

  const item = {
    id: Date.now().toString(),
    title,
    description,
    category,
    condition,
    size,
    points,
    tags: tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    status: "pending" as const,
    views: 0,
    likes: 0,
    badges: ["New", "Eco-Friendly"],
    createdAt: new Date(),
  }

  revalidatePath("/dashboard")
  return { success: true, item }
}

export async function createSwapRequest(formData: FormData) {
  const toUserId = formData.get("toUserId") as string
  const fromItemId = formData.get("fromItemId") as string
  const toItemId = formData.get("toItemId") as string
  const message = formData.get("message") as string

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))

  const swapRequest = {
    id: Date.now().toString(),
    toUserId,
    fromItemId,
    toItemId,
    message,
    status: "pending" as const,
    createdAt: new Date(),
  }

  return { success: true, swapRequest }
}

export async function updateSwapStatus(requestId: string, status: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  revalidatePath("/dashboard")
  return { success: true, requestId, status }
}
