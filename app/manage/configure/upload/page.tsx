import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import MyDropzone from "./uploadZone";
import { QueryResultRow, sql } from "@vercel/postgres";
import { authOptions } from "@/app/api/auth/authOptions";

export default async function UploadPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  let data: QueryResultRow | null = null;
  const userID = session.user?.id;
  console.log(userID);
  try {
    const response = await sql`
    SELECT classroom_details, upload_data
    FROM users
    WHERE id = ${userID}
  `;
    data = response.rows[0];
    console.log(data);
  } catch (e) {}

  const classroomDetailsArray = Object.keys(data?.classroom_details || {})
    .filter((key) => key !== "totalClasses")
    .map((key) => data?.classroom_details[key]);

  return <MyDropzone classroomDetailsData={classroomDetailsArray} />;
}
