import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import MyDropzone from "./uploadZone";

export default async function UploadPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return <MyDropzone />;
}
