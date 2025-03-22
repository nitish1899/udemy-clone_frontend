import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";
import { NextApiRequest, NextApiResponse } from "next";

export async function authenticateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return null;
  return session.user; // Ensure role exists in session
}

type Handler = (
  req: NextApiRequest,
  res: NextApiResponse,
  user: { name: string; email: string; role: string }
) => Promise<void>;

export function withAuth(handler: Handler, requiredRole: string | null = null) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await authenticateUser(req, res);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (requiredRole && user.role !== requiredRole) {
      return res
        .status(403)
        .json({ error: "Forbidden: Insufficient permissions" });
    }
    return handler(req, res, user);
  };
}
