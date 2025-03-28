"use client";

import { useState } from "react";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import googleIcon from "../assets/images/google_icon.png";
// import Image from "next/image";

export default function SignupPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify({ ...userData, role: "student" }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      router.push("/login"); // Redirect to login after successful signup
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              className="peer w-full px-4 pt-5 pb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
              placeholder=" "
              value={userData.name} // ✅ Fix: Use name state
              onChange={handleChange}
              required
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-3 text-gray-500 text-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-purple-600"
            >
              Name
            </label>
          </div>

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className="peer w-full px-4 pt-5 pb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
              placeholder=" "
              value={userData.email}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-gray-500 text-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-purple-600"
            >
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              className="peer w-full px-4 pt-5 pb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
              placeholder=" "
              value={userData.password}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-gray-500 text-lg transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-purple-600"
            >
              Password
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition"
          >
            Sign up
          </button>
        </form>

        <div className="text-center my-4">or</div>

        {/* Google Signup */}
        {/* <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center border p-3 rounded-lg hover:bg-gray-200"
        >
          <Image
            src={googleIcon}
            alt="Google"
            width={30}
            height={30}
            className="mr-2"
          />
          Sign up with Google
        </button> */}

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
