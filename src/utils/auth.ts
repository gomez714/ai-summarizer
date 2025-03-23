import { adminAuth } from "@/lib/firebaseAdmin";

export async function validateAuth(req: Request) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.replace("Bearer ", "").trim();

  const decodedToken = await adminAuth.verifyIdToken(token);

  return decodedToken.uid; // ✅ This is your userId
}