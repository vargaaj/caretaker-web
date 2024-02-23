import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";

export default async function UploadPage() {
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  if (!session) {
    redirect("/");
  }
  try {
    const response = await sql`
        WITH User_Id_CTE AS (
            SELECT Id
            FROM users
            WHERE email = ${userEmail}
        )
        SELECT *
        FROM classroomdetails
        WHERE User_id IN (SELECT Id FROM User_Id_CTE);
    `;
    let classDetails = new Array();
    const classroomDetails = response.rows[0].classroom_details;
    console.log(classroomDetails);

    return <div>hello</div>;
  } catch (e) {
    ("User not found");
  }
}
