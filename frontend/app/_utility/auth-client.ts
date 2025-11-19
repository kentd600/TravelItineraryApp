import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: 'https://wanderer-backend-kwtd.onrender.com'
})