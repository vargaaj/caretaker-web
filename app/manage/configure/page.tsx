import { getServerSession } from "next-auth";
import BasicInfo from "./basicInfo";
import { redirect } from "next/navigation";

export default async function ConfigurePage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return <BasicInfo />;
}
