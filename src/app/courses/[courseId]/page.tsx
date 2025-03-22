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
          `https://udemy-clone-q2wf.onrender.com/courses/${courseId}`,
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

/*
// 1️⃣ NextAuth.js Configuration: /pages/api/auth/[...nextauth].ts
// Sets up authentication with credentials and role-based access

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyUserCredentials, getUserByEmail } from '@/services/authService';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const user = await verifyUserCredentials(credentials.email, credentials.password);
                if (user) return user;
                throw new Error('Invalid email or password');
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin',
    }
});

// 2️⃣ Role-based Middleware: /middleware/authMiddleware.ts
// Protects routes based on user roles

import { getSession } from 'next-auth/react';

export async function authenticateUser(req, res) {
    const session = await getSession({ req });
    if (!session) return null;
    return session.user;
}

export async function checkEnrollment(userId, lectureId) {
    return await checkUserEnrollment(userId, lectureId);
}

export function withAuth(handler, requiredRole = null) {
    return async (req, res) => {
        const user = await authenticateUser(req, res);
        if (!user) return res.status(401).json({ error: 'Unauthorized' });
        if (requiredRole && user.role !== requiredRole) {
            return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }
        return handler(req, res, user);
    };
}

// 3️⃣ Protecting API Routes
// Example usage of `withAuth` in /api/instructor/dashboard.ts

import { getInstructorDashboard } from '@/services/instructorService';
import { withAuth } from '@/middleware/authMiddleware';

export default withAuth(async (req, res, user) => {
    const dashboardData = await getInstructorDashboard(user.id);
    res.status(200).json(dashboardData);
}, 'instructor');

// 4️⃣ Protecting Pages: /pages/courses/[courseId]/page.tsx
// Redirects unauthorized users to login

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: false
            }
        };
    }
    return { props: { session } };
}




// 1️⃣ NextAuth.js Configuration: /pages/api/auth/[...nextauth].ts
// Sets up authentication with credentials and role-based access

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyUserCredentials, getUserByEmail } from '@/services/authService';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const user = await verifyUserCredentials(credentials.email, credentials.password);
                if (user) return user;
                throw new Error('Invalid email or password');
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.role = token.role;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin',
    }
});

// 2️⃣ Role-based Middleware: /middleware/authMiddleware.ts
// Protects routes based on user roles

import { getSession } from 'next-auth/react';

export async function authenticateUser(req, res) {
    const session = await getSession({ req });
    if (!session) return null;
    return session.user;
}

export async function checkEnrollment(userId, lectureId) {
    return await checkUserEnrollment(userId, lectureId);
}

export function withAuth(handler, requiredRole = null) {
    return async (req, res) => {
        const user = await authenticateUser(req, res);
        if (!user) return res.status(401).json({ error: 'Unauthorized' });
        if (requiredRole && user.role !== requiredRole) {
            return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
        }
        return handler(req, res, user);
    };
}

// 3️⃣ Protecting API Routes
// Example usage of `withAuth` in /api/instructor/dashboard.ts

import { getInstructorDashboard } from '@/services/instructorService';
import { withAuth } from '@/middleware/authMiddleware';

export default withAuth(async (req, res, user) => {
    const dashboardData = await getInstructorDashboard(user.id);
    res.status(200).json(dashboardData);
}, 'instructor');

// 4️⃣ Protecting Pages: /pages/courses/[courseId]/page.tsx
// Redirects unauthorized users to login

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: false
            }
        };
    }
    return { props: { session } };
}



*/
