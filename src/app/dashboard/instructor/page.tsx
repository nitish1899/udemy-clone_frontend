"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Use Router for navigation
import axios from "axios";

interface DashboardData {
  totalCourses: number;
  studentsEnrolled: number;
  totalEarnings: number;
  courses: { id: string; title: string; approved: boolean }[];
}

export default function InstructorDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // ✅ Router instance

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await axios.get("http://localhost:4500/instructor/dashboard"); // ✅ Use correct backend API URL
        setDashboardData(response.data);
      } catch (err) {
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

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Instructor Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          <p className="text-lg font-semibold">{dashboardData.totalCourses}</p>
          <p className="text-sm">Total Courses</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <p className="text-lg font-semibold">{dashboardData.studentsEnrolled}</p>
          <p className="text-sm">Students Enrolled</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <p className="text-lg font-semibold">${dashboardData.totalEarnings}</p>
          <p className="text-sm">Total Earnings</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">Your Courses</h2>
      <ul className="space-y-3">
        {dashboardData.courses.map((course) => (
          <li key={course.id} className="p-3 bg-white shadow rounded-lg flex justify-between items-center">
            <span>{course.title} - {course.approved ? "✅ Approved" : "⏳ Pending"}</span>
            <button
              onClick={() => router.push(`/dashboard/instructor/edit/${course.id}`)} // ✅ Better navigation
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
