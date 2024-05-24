import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ClassroomTable from "./classroomTable";
import { sql } from "@vercel/postgres";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Classrooms() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const userID = session.user?.id;
  try {
    const response = await sql`
    SELECT classroom_details, upload_data
    FROM users
    WHERE id = ${userID}
  `;
  } catch (e) {}
  return (
    <section className="flex flex-col items-center justify-center mt-10 gap-4 py-8 md:py-10">
      <div>hello</div>
      {/* <ClassroomTable classroomDetailsData={} uploadData={}></ClassroomTable> */}
    </section>
  );
}
