import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_WEB_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_WEB_CLIENT_SECRET!,
    }),
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
export { authOptions }