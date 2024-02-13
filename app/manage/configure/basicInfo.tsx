"use client";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BasicInfo() {
  const router = useRouter();

  const [timeframeValue, setTimeframeValue] = useState<string>();
  const [classroomNumber, setClassroomNumber] = useState<string>();

  const [isTimeframeInvalid, setIsTimeframeInvalid] = useState(false); // Track timeframe validation state
  const [isClassroomNumberInvalid, setIsClassroomNumberInvalid] =
    useState(false); // Track classroom number validation state

  const validateTimeframe = (value: string) => {
    if (value === undefined) {
      return false;
    }

    //Any timeframe like Aug-November or August-Novemeber or August-Nov will work
    const matchesRegex = value.match(
      /^((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)+)(-| )((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)+)$/
    ); // Your existing regex
    return matchesRegex; // Return true only if both conditions are met
  };

  const validateClassroomNumber = (value: string) => {
    if (value === " ") {
      return false;
    }
    const parsed = parseInt(value);
    return !isNaN(parsed) && parsed >= 0 && parsed < 30;
  };

  const handleSave = () => {
    // Check if timeframeValue and classroomNumber are empty
    const isTimeframeEmpty = !timeframeValue || timeframeValue.trim() === "";
    const isClassroomNumberEmpty =
      !classroomNumber || classroomNumber.trim() === "";

    setIsTimeframeInvalid(
      isTimeframeEmpty || !validateTimeframe(timeframeValue)
    );
    setIsClassroomNumberInvalid(
      isClassroomNumberEmpty || !validateClassroomNumber(classroomNumber)
    );

    if (
      !isTimeframeEmpty &&
      !isClassroomNumberEmpty &&
      !isTimeframeInvalid &&
      !isClassroomNumberInvalid
    ) {
      // Both inputs are valid, proceed with saving

      // Add your actual save logic here

      // need to add some route logic here
      router.push(
        `/manage/configure/details?timeframe=${timeframeValue}&classroomNumber=${classroomNumber}`
      );
    }
  };

  return (
    <section className="flex flex-col items-center justify-center mt-10 gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center pb-5">
        <h1 className={title()}>Basic class information</h1>
      </div>
      <Card className="w-1/2">
        <CardBody className="p-5 flex flex-col">
          <h4 className="pb-2 pl-1">Latest Timeframe</h4>

          <Input
            value={timeframeValue}
            placeholder="August-November"
            variant="bordered"
            errorMessage={
              isTimeframeInvalid && "Please enter a valid timeframe"
            }
            onValueChange={setTimeframeValue}
            isRequired={true}
          />

          <h4 className="pb-2 pl-1">Total Number of Classrooms</h4>

          <Input
            value={classroomNumber}
            placeholder="7"
            variant="bordered"
            // Remove isInvalid and color props
            errorMessage={
              isClassroomNumberInvalid && "Please enter a number (0-29)"
            }
            onValueChange={setClassroomNumber}
            isRequired={true}
          />

          <div className="flex">
            <Button className="m-1" color="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
