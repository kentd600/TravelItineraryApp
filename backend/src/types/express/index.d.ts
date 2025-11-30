export {}

declare global {
  namespace Express {
    export interface Request {
      sessionToken?: string
      userId?: string
    }
  }
}