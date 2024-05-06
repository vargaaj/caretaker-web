import Config from "./configuration";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation"; // Import the redirect function from the correct module

export default async function ConfigurePage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/"); // Call the redirect function correctly
  }
  return <Config />;
}
