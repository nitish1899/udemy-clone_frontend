"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import googleIcon from "../assets/images/google_icon.png";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard"); // Redirect after login
    }
  };

  // const handleGoogleSignIn = async () => {
  //   const res = await signIn("google", { redirect: false });

  //   if (res?.ok) {
  //     router.push("/dashboard"); // Redirect manually
  //   } else {
  //     setError("Google login failed");
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Log in</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Manual Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className="peer w-full px-4 pt-5 pb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
              placeholder=" "
              value={credentials.email}
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
              value={credentials.password}
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
            Login
          </button>
        </form>

        <div className="text-center my-4">or</div>

        {/* Google Login */}
        <button
          // onClick={handleGoogleSignIn}
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
          Continue with Google
        </button>

        <p className="text-center mt-4">
          Don&apos;t have an account?&nbsp;
          <a href="/signup" className="text-purple-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
