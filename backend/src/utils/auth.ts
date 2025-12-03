import { betterAuth, type BetterAuthOptions, type Auth, type BetterAuthPlugin, type CookieOptions } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.tf0woju.mongodb.net/?appName=Cluster0`, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});
const userDb = client.db("wanderer");

const isDev = process.env.ENV && process.env.ENV === 'DEV';

const defaultCookieAttributes = {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
  partitioned: true,
  domain: process.env.BACK_END_DOMAIN!
} as CookieOptions

export const auth: Auth<BetterAuthOptions> = betterAuth({
  database: mongodbAdapter(userDb, { client }),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }
  },
  trustedOrigins: [process.env.CLIENT_URL!],
  advanced: isDev ? {} : { defaultCookieAttributes }
})