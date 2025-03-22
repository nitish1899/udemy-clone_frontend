"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditCourse({
  params,
}: {
  params: { courseId: string };
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [approved, setApproved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCourseData() {
      try {
        const session = await getSession();
        if (!session || !session.user?.id) {
          throw new Error("User not authenticated.");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${params.courseId}`
        );

        const course = response.data;
        setTitle(course.title);
        setDescription(course.description);
        setApproved(course.approved);
      } catch (err) {
        console.log("Error", err);
        setError("Failed to load course data.");
      } finally {
        setLoading(false);
      }
    }

    fetchCourseData();
  }, [params.courseId]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${params.courseId}`,
        {
          title,
          description,
          approved,
        }
      );

      router.push("/dashboard"); // Redirect after successful update
    } catch (err) {
      console.log("Error", err);
      setError("Failed to update course.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>

      <Label>Title</Label>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
      />

      <Label className="mt-4">Description</Label>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
      />

      <Label className="mt-4 flex items-center">
        <input
          type="checkbox"
          checked={approved}
          onChange={(e) => setApproved(e.target.checked)}
          className="mr-2"
        />
        Approved
      </Label>

      <Button onClick={handleUpdate} className="mt-4">
        Save Changes
      </Button>
    </div>
  );
}
