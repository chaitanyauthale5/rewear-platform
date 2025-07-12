"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FirebaseAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // If on /login and user is authenticated, redirect to /dashboard
      if (firebaseUser && window.location.pathname === "/login") {
        router.replace("/dashboard");
      }
    });
    return () => unsubscribe();
  }, []);

  // Google provider
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    setError("");
    try {
      await signOut(auth);
      setUser(null);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      {user ? (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Welcome, {user.displayName || user.email}</h2>
          <Button onClick={handleSignOut} disabled={loading} className="w-full bg-green-600 hover:bg-green-700 mt-4">
            Sign Out
          </Button>
          <div className="mt-4">
            <Button asChild variant="outline">
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={mode === "signup" ? handleSignUp : handleSignIn} className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4">
            {mode === "signup" ? "Sign Up" : "Sign In"}
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
            {loading ? "Loading..." : mode === "signup" ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 mt-2 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.9 33.1 30.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.1-.3-3z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 17.1 19.4 14 24 14c2.7 0 5.2.9 7.2 2.5l6.4-6.4C34.5 5.1 29.5 3 24 3c-7.2 0-13.4 3.1-17.7 8.1z"/><path fill="#FBBC05" d="M24 44c5.2 0 9.6-1.7 12.8-4.6l-6-4.9C28.7 36.2 26.5 37 24 37c-6.1 0-11.2-4.1-13-9.6l-6.1 4.7C7.7 40.9 15.3 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.9 33.1 30.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.1-.3-3z"/></g></svg>
            {loading ? "Loading..." : "Sign in with Google"}
          </Button>
          <div className="text-center text-sm mt-2">
            {mode === "signup" ? (
              <>
                Already have an account?{' '}
                <button type="button" className="text-green-600 underline" onClick={() => setMode("signin")}>Sign In</button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button type="button" className="text-green-600 underline" onClick={() => setMode("signup")}>Sign Up</button>
              </>
            )}
          </div>
          <div className="mt-4 text-center">
            <Button asChild variant="outline">
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
