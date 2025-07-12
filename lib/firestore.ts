import { db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  where,
  DocumentReference,
} from "firebase/firestore";

// USERS
export async function createUser(user: {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL?: string | null;
  points?: number;
}) {
  const userDoc = doc(db, "users", user.uid);
  await setDoc(userDoc, {
    displayName: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
    points: user.points || 0,
    wishlist: [],
    joined: serverTimestamp(),
  }, { merge: true });
}

export async function getUser(uid: string) {
  const userDoc = doc(db, "users", uid);
  const snap = await getDoc(userDoc);
  return snap.exists() ? snap.data() : null;
}

export async function updateUser(uid: string, data: any) {
  const userDoc = doc(db, "users", uid);
  await updateDoc(userDoc, data);
}

// ITEMS
export async function addItem(item: {
  title: string;
  category: string;
  condition: string;
  points: number;
  images: string[];
  ownerId: string;
  status: string;
  badges: string[];
  location: string;
}) {
  const itemsCol = collection(db, "items");
  await addDoc(itemsCol, {
    ...item,
    views: 0,
    likes: 0,
    dateListed: serverTimestamp(),
  });
}

export async function getItems() {
  const itemsCol = collection(db, "items");
  const snap = await getDocs(itemsCol);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// WISHLIST (embedded in user)
export async function addToWishlist(uid: string, itemId: string) {
  const userDoc = doc(db, "users", uid);
  await updateDoc(userDoc, { wishlist: arrayUnion(itemId) });
}

export async function removeFromWishlist(uid: string, itemId: string) {
  const userDoc = doc(db, "users", uid);
  await updateDoc(userDoc, { wishlist: arrayRemove(itemId) });
}

// EVENTS
export async function addEvent(event: {
  title: string;
  description: string;
  category: string;
  datetime: Date;
  location: string;
  organizerId: string;
  attendees?: string[];
  points?: number;
}) {
  const eventsCol = collection(db, "events");
  await addDoc(eventsCol, {
    ...event,
    attendees: event.attendees || [],
    points: event.points || 0,
    created: serverTimestamp(),
  });
}

export async function getEvents() {
  const eventsCol = collection(db, "events");
  const snap = await getDocs(eventsCol);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function joinEvent(eventId: string, userId: string) {
  const eventDoc = doc(db, "events", eventId);
  await updateDoc(eventDoc, { attendees: arrayUnion(userId) });
}
