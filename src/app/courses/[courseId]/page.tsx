// Displays course details, lectures list, and enroll button

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ Use `useParams()` instead of `useRouter()`
import { useSession } from "next-auth/react";
import Head from "next/head";
import axios from "axios";

interface Course {
  title: string;
  description: string;
  instructor: { name: string };
  lectures: { id: string; title: string }[];
}

const enroll = async (courseId: string) => {
  try {
    await axios.post("/api/enroll", { courseId });
    alert("Enrollment successful!");
  } catch (error) {
    console.log("Error", error);
    alert("Enrollment failed. Please try again.");
  }
};

export default function CourseDetail() {
  const { courseId } = useParams(); // ✅ Correct way to get dynamic params in App Router
  const { data: session } = useSession();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      if (!courseId || !session?.user?.accessToken) return; // ✅ Wait until both `courseId` and `session` are available

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${courseId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch course");

        const data = await res.json();
        setCourse(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId, session?.user?.accessToken]); // ✅ `accessToken` added as dependency

  if (loading) return <p>Loading...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <>
      <Head>
        <title>{course.title} | Udemy Clone</title>
        <meta name="description" content={course.description} />
      </Head>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>Instructor: {course.instructor.name}</p>
      <button onClick={() => enroll(String(courseId))}>Enroll Now</button>{" "}
      {/* ✅ Ensure `courseId` is a string */}
      <h2>Lectures</h2>
      <ul>
        {course.lectures.map((lecture) => (
          <li key={lecture.id}>
            <a href={`/courses/${courseId}/lectures/${lecture.id}`}>
              {lecture.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}