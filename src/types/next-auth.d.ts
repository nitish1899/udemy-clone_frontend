/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
/* eslint-enable @typescript-eslint/no-unused-vars */

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
