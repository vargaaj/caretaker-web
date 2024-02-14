import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  const server = await getServerSession();
  console.log(server?.user?.email);
  try {
    const { timeframe, classrooms } = await request.json();
    console.log({ timeframe, classrooms });
    const num_classrooms: number = parseInt(classrooms);
    const response = await sql`
        UPDATE users
        SET Timeframe = ${timeframe}, Total_classrooms = ${num_classrooms}
        WHERE Email = ${server?.user?.email}
    `;
  } catch (e) {}

  return NextResponse.json({ message: "success" });
}
