"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import React, { FormEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const requiredFields = [
  "First Name",
  "Last Name",
  "Room",
  "Dob",
  "Time Schedule",
];

interface ClassroomDetails {
  size: number;
  ageRange: string;
  classroomName: string;
}

interface ClassroomDetailsProp {
  classroomDetailsData: ClassroomDetails[];
}

export default function MyDropzone({
  classroomDetailsData,
}: ClassroomDetailsProp): JSX.Element {
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedData, setUploadedData] = useState<unknown | undefined>();

  const router = useRouter();
  const { data: session } = useSession();

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach((file: Blob) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const binaryStr = reader.result;

          // Convert binary string to workbook
          const workbook = XLSX.read(binaryStr, { type: "binary" });

          // Get the first sheet
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Convert sheet data to JSON
          const data = XLSX.utils.sheet_to_json(worksheet);

          console.log(data);

          // Check if every data point has the required fields
          const isValid = data.every((dataPoint: any) => {
            return requiredFields.every((field) => field in dataPoint);
          });

          if (isValid) {
            console.log("All data points have the required fields.");

            // Check if every room matches one of the classroom names
            const validRooms = classroomDetailsData.map(
              (item) => item.classroomName
            );
            const roomsMatch = data.every((dataPoint: any) =>
              validRooms.includes(dataPoint.Room)
            );

            if (roomsMatch) {
              console.log("All rooms match the classroom names.");

              // Transform data to desired format
              const transformedData = data.reduce(
                (acc: any, item: any, index) => {
                  acc[index] = {
                    FirstName: item["First Name"],
                    LastName: item["Last Name"],
                    Room: item.Room,
                    Dob: item.Dob,
                    TimeSchedule: item["Time Schedule"],
                  };
                  return acc;
                },
                {} as {
                  [key: number]: {
                    FirstName: string;
                    LastName: string;
                    Room: string;
                    Dob: number;
                    TimeSchedule: string;
                  };
                }
              );

              // Update uploadData with transformed data
              setUploadedData(transformedData);
              setUploadStatus("success");
            } else {
              console.log("Some rooms do not match the classroom names.");
              alert(
                "Some rooms in the uploaded file do not match the classroom names. Please ensure that all rooms correspond to the available classroom names."
              );
            }
          } else {
            console.log("Some data points are missing required fields.");
            alert(
              "The uploaded file is missing required fields. Please ensure the excel file includes columns: First Name, Last Name, Room, Dob, and Time Schedule. Also, ensure each child has an input for each column. For example: \n First Name: Clara \n Last Name: Herbert \n Room: Infant 1 \n Dob: 08/24/2023 \n Time Schedule: M, T, W, Th, F"
            );
          }
        };
        reader.readAsBinaryString(file);
      });
    },
    [classroomDetailsData]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      excel: [".xls", ".xlsx"],
    },
    multiple: false,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      userID: session?.user.id,
      uploadData: uploadedData,
    };

    console.log(formData);
    try {
      const response = await fetch(`/api/manage/configure/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formBody: formData }), // Send the entire formData here
      });

      router.push("/manage/classrooms");
      router.refresh();
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center mt-10 gap-4 py-8 md:py-10">
      <Card className="p-20">
        <form onSubmit={handleSubmit}>
          <CardBody className="border border-dashed">
            <div {...getRootProps()} className="flex flex-col p-6">
              <input {...getInputProps()} />
              {uploadStatus === "success" ? (
                <>
                  <p className="text-center text-xl">
                    File successfully uploaded!
                  </p>
                  <p className="text-center pt-6">
                    (Drag n drop a different file here, or click here to choose
                    a different file)
                  </p>
                </>
              ) : (
                <>
                  <p className="text-center text-xl">
                    Drag n drop a file here, or click here to select a file
                  </p>
                  <p className="text-center pt-6">
                    (Only a single .xls or .xlsx file will be accepted)
                  </p>
                </>
              )}
            </div>
          </CardBody>
          {uploadStatus === "success" ? (
            <Button type="submit" color="primary" className="mt-6 w-full">
              Save
            </Button>
          ) : null}
        </form>
      </Card>
    </section>
  );
}
