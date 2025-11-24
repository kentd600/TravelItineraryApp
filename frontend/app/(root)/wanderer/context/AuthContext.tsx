'use client';
import { authClient, ReturnedSession } from "@/app/_utility/auth-client";
import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext<undefined | ReturnedSession>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const {
    data,
    isPending,
    error,
    refetch,
    isRefetching
  } = authClient.useSession();
  
  return (
    <AuthContext value={{data, isPending, error, refetch, isRefetching}}>
      {children}
    </AuthContext>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  return ctx;
}