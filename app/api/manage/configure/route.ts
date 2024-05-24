import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { formBody } = await request.json();
    const { userID, classroomDetails } = formBody;
    await sql`UPDATE users SET classroom_details = ${classroomDetails} WHERE id = ${userID}`;
  } catch (e) {}

  return NextResponse.json({ message: "success" });
}
