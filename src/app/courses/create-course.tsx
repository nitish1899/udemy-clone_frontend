"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const token = Cookies.get("token");

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`,
        {
          title,
          description,
          price,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add token here
          },
        }
      );
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to create course", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>
      <form onSubmit={handleCreateCourse} className="space-y-4">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}
