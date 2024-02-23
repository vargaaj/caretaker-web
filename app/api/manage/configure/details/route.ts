import { NextResponse } from "next/server";
import { db } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { formBody } = await request.json();
    const client = await db.connect();

    try {
      for (const list of formBody) {
        const id = list[0];
        const name = list[1];
        const ageRange = list[2];
        const size = list[3];
        await client.sql`
      INSERT INTO classroomdetails (User_id, Name, Age_range, Size)
      VALUES (${id}, ${name}, ${ageRange}, ${size})
    `;
        // Use these values for your database insertion or other operations
      }
    } catch (e) {}
  } catch (e) {}

  return NextResponse.json({ message: "success" });
}
