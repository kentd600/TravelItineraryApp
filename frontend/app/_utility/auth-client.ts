import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_WANDERER_API,
  fetchOptions: {
    credentials: 'include'
  }
})

export type Session = typeof authClient.$Infer.Session;
export type ReturnedSession = ReturnType<typeof authClient.useSession>