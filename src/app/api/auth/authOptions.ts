import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";

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
      ): Promise<User | null> {
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
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Invalid credentials");

        const user = await res.json();
        return user ?? null; // Ensure `null` is returned when necessary
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
        token.id = user.id || token.sub || ""; // Ensure ID is present
        token.email = user.email;
        token.name = user.name;
      }
      return token; // ✅ No need to store auth_token since cookies are used
    },

    async session({ session, token }) {
      session.user.id = (token.id as string) || "";
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
    },
  },
};
