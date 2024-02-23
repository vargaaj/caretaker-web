import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";

export default async function UploadPage() {
  // ADD BELOW CODE TO VIEW CLASSROOMS PAGE
  // JUST WANTED TO TEST SQL QUERY HERE
  // const session = await getServerSession();
  // const userEmail = session?.user?.email;
  // if (!session) {
  //   redirect("/");
  // }
  // try {
  //   const response = await sql`
  //     SELECT * FROM classroomdetails
  //     WHERE User_id = (SELECT Id FROM users WHERE Email = ${userEmail});
  // `;
  //   console.log(response.rows);

  //   return <div>hello</div>;
  // } catch (e) {
  //   ("User not found");
  // }
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return <div>hello</div>;
}
