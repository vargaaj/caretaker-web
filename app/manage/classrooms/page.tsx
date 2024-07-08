import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClassroomTable from "./classroomTable";
import { QueryResultRow, sql } from "@vercel/postgres";
import { authOptions } from "@/app/api/auth/authOptions";
import { classCreation } from "./classCreation";

export default async function Classrooms() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  let data: QueryResultRow | null = null;
  const userID = session.user?.id;

  try {
    const response = await sql`
    SELECT classroom_details, upload_data
    FROM users
    WHERE id = ${userID}
  `;
    data = response.rows[0];
  } catch (e) {}

  const classroomDetailsArray = Object.keys(data?.classroom_details || {})
    .filter((key) => key !== "totalClasses")
    .map((key) => data?.classroom_details[key]);

  const uploadDataArray = Object.keys(data?.upload_data || {}).map(
    (key) => data?.upload_data[key]
  );

  const classes = classCreation(uploadDataArray, classroomDetailsArray);
  return (
    <ClassroomTable
      classroomDetailsData={classroomDetailsArray}
      classes={classes}></ClassroomTable>
  );
}
