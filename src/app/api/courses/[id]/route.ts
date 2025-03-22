import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest, // ✅ First argument must be `NextRequest`
  { params }: { params: Promise<{ id: string }> }
): Promise<Response> {
  const courseId = (await params).id;

  // Get the token from cookies
  const cookieStore = await cookies(); // ✅ No need for `await`
  const token = cookieStore.get("access_token")?.value;

  try {
    const response = await fetch(
      `https://udemy-clone-q2wf.onrender.com/courses/${courseId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch course: ${response.statusText}`);
      return new Response(JSON.stringify({ error: "Failed to fetch course" }), {
        status: response.status,
      });
    }

    const course = await response.json();
    return new Response(JSON.stringify(course), { status: 200 });
  } catch (error) {
    console.error("Error fetching course:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// import { cookies } from "next/headers";
// // import { NextRequest } from "next/server";

// export async function GET(
//   context: { params: { id: string } }
// ): Promise<Response> {
//   const courseId = context.params.id;

//   // Get the token from cookies
//   const cookieStore = await cookies();
//   const token = cookieStore.get("access_token")?.value;

//   try {
//     const response = await fetch(
//       `https://udemy-clone-q2wf.onrender.com/courses/${courseId}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       }
//     );

//     if (!response.ok) {
//       console.error(`Failed to fetch course: ${response.statusText}`);
//       return new Response(JSON.stringify({ error: "Failed to fetch course" }), {
//         status: response.status,
//       });
//     }

//     const course = await response.json();
//     return new Response(JSON.stringify(course), { status: 200 });
//   } catch (error) {
//     console.error("Error fetching course:", error);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//     });
//   }
// }
