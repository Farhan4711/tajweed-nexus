"use client";

import { useSession } from "next-auth/react";
import { UserRole } from "@qlms/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth() {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user,
    role: session?.user?.role as UserRole | undefined,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}

export function useRequireRole(allowedRoles: UserRole[], redirectTo = "/dashboard") {
  const { role, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (role && !allowedRoles.includes(role)) {
        router.push(redirectTo);
      }
    }
  }, [role, isAuthenticated, isLoading, allowedRoles, redirectTo, router]);

  return { role, isAuthenticated, isLoading };
}
