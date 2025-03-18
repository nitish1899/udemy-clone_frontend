import { cookies } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const courseId = params.id;

  // Get the token from cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  try {
    const response = await fetch(`http://localhost:4500/courses/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

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
