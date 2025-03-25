"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getSession } from "next-auth/react"; // ✅ Import getSession

interface Lecture {
  id: string;
  title: string;
}

interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

interface Course {
  id: string;
  title: string;
  approved: boolean;
  sections: Section[];
}

interface DashboardData {
  totalCourses: number;
  studentsEnrolled: number;
  totalEarnings: number;
  courses: Course[];
}

export default function InstructorDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [expandedCourses, setExpandedCourses] = useState<string[]>([]); // ✅ Track expanded courses
  const router = useRouter();

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const session = await getSession(); // ✅ Get session data
        if (!session || !session.user?.id) {
          throw new Error("User is not authenticated.");
        }

        // const userId = session.user.id; // ✅ Extract userId

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`
        );
        setDashboardData(response.data);
      } catch (err) {
        console.log("Error", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!dashboardData) return <p className="text-center">No data available.</p>;

  // ✅ Toggle Expand/Collapse Courses
  // const toggleCourseExpand = (courseId: string) => {
  //   setExpandedCourses((prev) =>
  //     prev.includes(courseId)
  //       ? prev.filter((id) => id !== courseId)
  //       : [...prev, courseId]
  //   );
  // };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Instructor Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          {/* <p className="text-lg font-semibold">{dashboardData.totalCourses}</p> */}
          <p className="text-sm">Total Courses</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg text-center">
          {/* <p className="text-lg font-semibold">
            {dashboardData.studentsEnrolled}
          </p> */}
          <p className="text-sm">Students Enrolled</p>
        </div>
        {/* <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <p className="text-lg font-semibold">
            ${dashboardData.totalEarnings}
          </p>
          <p className="text-sm">Total Earnings</p>
        </div> */}
      </div>

      {/* Create Course Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => router.push("/courses/create-course")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          + Create Course
        </button>
      </div>

      {/* Courses List */}
      <h2 className="text-xl font-semibold mb-3">Your Courses</h2>
      {/* <ul className="space-y-3">
        {dashboardData.courses.map((course) => (
          <li key={course.id} className="p-3 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center">
              <span
                className="cursor-pointer text-lg font-semibold"
                onClick={() => toggleCourseExpand(course.id)}
              >
                {course.title} -{" "}
                {course.approved ? "✅ Approved" : "⏳ Pending"}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    router.push(`/courses/edit-course/${course.id}`)
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    router.push(`/courses/${course.id}/add-section`)
                  }
                  className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600"
                >
                  + Add Section
                </button>
              </div>
            </div>

            {expandedCourses.includes(course.id) && (
              <ul className="ml-6 mt-2 space-y-2">
                {course.sections.map((section) => (
                  <li key={section.id} className="p-2 bg-gray-100 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{section.title}</span>
                      <button
                        onClick={() =>
                          router.push(
                            `/courses/${course.id}/sections/${section.id}/add-lecture`
                          )
                        }
                        className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600"
                      >
                        + Add Lecture
                      </button>
                    </div>

                    <ul className="ml-6 mt-2 space-y-1">
                      {section.lectures.map((lecture) => (
                        <li key={lecture.id} className="text-sm text-gray-700">
                          🎥 {lecture.title}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
