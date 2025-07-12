"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: "user" | "admin"
  createdAt: Date
}

interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  setUser: (user: AuthUser | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
)

// Google Auth Integration
export const signInWithGoogle = async () => {
  try {
    // Simulate Google OAuth flow
    const mockGoogleUser = {
      id: Date.now().toString(),
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatar: "https://lh3.googleusercontent.com/a/default-user=s96-c",
      role: "user" as const,
      createdAt: new Date(),
    }

    useAuth.getState().setUser(mockGoogleUser)
    return { success: true, user: mockGoogleUser }
  } catch (error) {
    return { success: false, error: "Failed to sign in with Google" }
  }
}
