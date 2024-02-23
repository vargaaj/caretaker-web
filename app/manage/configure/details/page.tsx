import { getServerSession } from "next-auth";
import DetailsForm from "./detailsForm";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";

export default async function DetailsPage() {
  const session = await getServerSession();
  const userEmail = session?.user?.email;
  if (!session) {
    redirect("/");
  }
  try {
    const response = await sql`
      SELECT Total_classrooms, Id
      FROM users
      WHERE email = ${userEmail};
    `;
    const totalClassrooms = response.rows[0].total_classrooms;
    const id = response.rows[0].id;
    return <DetailsForm totalClassrooms={totalClassrooms} id={id} />;
  } catch (e) {
    ("User not found");
  }
}
