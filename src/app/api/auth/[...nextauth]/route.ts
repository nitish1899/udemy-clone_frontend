import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
            credentials: "include", // ✅ Ensures cookies are sent
          }
        );

        if (!res.ok) throw new Error("Invalid credentials");

        // No need to return token, since it's stored in cookies
        return await res.json();
      },
    }),
  ],

  pages: {
    signIn: "/login",
    signOut: "/",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google-login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include", // ✅ Ensure cookie is set properly
              body: JSON.stringify({
                name: user.name,
                email: user.email,
                provider: "google",
              }),
            }
          );

          if (!res.ok) {
            console.error("Failed to save user to backend");
            return false; // Prevent sign-in if saving fails
          }
        } catch (error) {
          console.error("Error saving Google user:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token; // ✅ No need to store auth_token since cookies are used
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      return session; // ✅ No need to store accessToken since cookies are used
    },

    async redirect({ url, baseUrl }) {
      console.log("Redirecting to:", url, "Base URL:", baseUrl);
    
      // If URL contains 'callbackUrl' recursion, redirect to dashboard instead
      if (url.includes("callbackUrl")) {
        return `${baseUrl}/dashboard`;
      }
    
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
    }
    
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
