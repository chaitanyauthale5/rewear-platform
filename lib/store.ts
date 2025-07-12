"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  points: number
  itemsListed: number
  swapsCompleted: number
  co2Saved: number
  level: string
  followers: string[]
  following: string[]
  wishlist: string[]
}

interface Item {
  id: string
  title: string
  description: string
  category: string
  condition: string
  size: string
  points: number
  images: string[]
  tags: string[]
  userId: string
  user: string
  userAvatar?: string
  rating: number
  location: string
  status: "active" | "pending" | "swapped"
  views: number
  likes: number
  badges: string[]
  createdAt: Date
}

interface SwapRequest {
  id: string
  fromUserId: string
  toUserId: string
  fromItemId: string
  toItemId?: string
  message: string
  status: "pending" | "accepted" | "rejected" | "completed"
  createdAt: Date
}

interface AppState {
  user: User | null
  items: Item[]
  swapRequests: SwapRequest[]

  // User actions
  setUser: (user: User) => void
  updateUser: (updates: Partial<User>) => void
  followUser: (userId: string) => void
  unfollowUser: (userId: string) => void

  // Item actions
  addItem: (item: Omit<Item, "id" | "createdAt">) => void
  updateItem: (id: string, updates: Partial<Item>) => void
  deleteItem: (id: string) => void
  likeItem: (itemId: string) => void
  addToWishlist: (itemId: string) => void
  removeFromWishlist: (itemId: string) => void

  // Swap actions
  createSwapRequest: (request: Omit<SwapRequest, "id" | "createdAt">) => void
  updateSwapRequest: (id: string, updates: Partial<SwapRequest>) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      items: [],
      swapRequests: [],

      setUser: (user) => set({ user }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      followUser: (userId) =>
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              following: [...state.user.following, userId],
            },
          }
        }),

      unfollowUser: (userId) =>
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              following: state.user.following.filter((id) => id !== userId),
            },
          }
        }),

      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...item,
              id: Date.now().toString(),
              createdAt: new Date(),
            },
          ],
        })),

      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, ...updates } : item)),
        })),

      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      likeItem: (itemId) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === itemId ? { ...item, likes: item.likes + 1 } : item)),
        })),

      addToWishlist: (itemId) =>
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              wishlist: [...state.user.wishlist, itemId],
            },
          }
        }),

      removeFromWishlist: (itemId) =>
        set((state) => {
          if (!state.user) return state
          return {
            user: {
              ...state.user,
              wishlist: state.user.wishlist.filter((id) => id !== itemId),
            },
          }
        }),

      createSwapRequest: (request) =>
        set((state) => ({
          swapRequests: [
            ...state.swapRequests,
            {
              ...request,
              id: Date.now().toString(),
              createdAt: new Date(),
            },
          ],
        })),

      updateSwapRequest: (id, updates) =>
        set((state) => ({
          swapRequests: state.swapRequests.map((request) => (request.id === id ? { ...request, ...updates } : request)),
        })),
    }),
    {
      name: "rewear-store",
    },
  ),
)
