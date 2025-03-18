"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Redirect to the API route, which sets the cookie
      router.replace(`/api/auth/callback?token=${token}`);
    } else {
      router.replace("/login");
    }
  }, [router]);

  return <p>Authenticating...</p>;
}
