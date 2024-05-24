"use client";
import { FormEvent, useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import ClassroomDetails from "./classroomDetails";

export default function Config(): JSX.Element {
  const router = useRouter();

  const [table, setTable] = useState(false);
  const [totalClassrooms, setTotalClassrooms] = useState("");
  const [totalClassroomsInt, setTotalClassroomsInt] = useState(0);

  const handleClassroomSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const classroom = parseInt(totalClassrooms, 10);
    setTotalClassroomsInt(classroom);
  };

  useEffect(() => {
    if (totalClassroomsInt > 0) {
      setTable(true);
    }
  }, [totalClassroomsInt]);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-1">
      {table === false ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-4">
          <form onSubmit={handleClassroomSave}>
            <Card>
              <CardBody className="flex flex-col">
                <h1 className={subtitle()}>Enter Total Classrooms</h1>
                <Input
                  isRequired
                  name="totalClassrooms"
                  label="Ex: 7"
                  value={totalClassrooms}
                  onValueChange={setTotalClassrooms}
                />
                <Button
                  className="mt-3"
                  color="primary"
                  type="submit"
                  size="lg">
                  Save
                </Button>
              </CardBody>
            </Card>
          </form>
        </div>
      ) : (
        <ClassroomDetails totalClassrooms={totalClassroomsInt} />
      )}
    </section>
  );
}
