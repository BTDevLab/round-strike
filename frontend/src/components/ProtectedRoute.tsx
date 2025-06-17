'use client';

import { useEffect } from "react";
import { useUserStore } from "@/stores/user";
import { jwtDecode } from "jwt-decode";
import type { User } from "@/types/user";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode<User & { exp: number }>(token);
        
        const isExpired = decodedUser.exp * 1000 < Date.now();

        if(isExpired){
            localStorage.removeItem("token");
            return;
        }
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, [setUser]);

  return <>{children}</>;
}
