"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      
      {error && <p className="text-red-500">{error}</p>}

      {/* Google Sign-In Button */}
      <button
        onClick={handleGoogleLogin}
        className="bg-red-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Sign in with Google
      </button>

      {/* Manual Login Form */}
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input type="email" name="email" placeholder="Email" required className="border p-2" />
        <input type="password" name="password" placeholder="Password" required className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
      </form>
    </div>
  );
}
