import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    token: string; // Add token property
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      accessToken: string;
      role: string; // ✅ Add this
    };
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    accessToken: string;
  }
}
