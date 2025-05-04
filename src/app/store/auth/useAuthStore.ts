"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { onAuthStateChanged, getAuth, getIdToken } from "firebase/auth";
import { User } from "@/app/models/user";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      checkAuth: () => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            const idToken = await getIdToken(firebaseUser);
            set({
              user: {
                id: firebaseUser.uid,
                email: firebaseUser.email || "",
                displayName: firebaseUser.displayName || "",
                photoURL: firebaseUser.photoURL || "",
                role: "user", // Modify this logic as needed
                status: "active", // Default status
              },
            });
          } else {
            set({ user: null });
          }
        });
      },
    }),
    {
      name: "auth-storage", // Unique name for your storage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);
