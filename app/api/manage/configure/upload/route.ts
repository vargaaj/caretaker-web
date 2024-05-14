import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { formBody } = await request.json();
    const { userID, uploadData } = formBody;
    await sql`UPDATE users SET upload_data = ${uploadData} WHERE id = ${userID}`;
  } catch (e) {}

  return NextResponse.json({ message: "success" });
}
