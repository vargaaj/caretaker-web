"use client";
import { FormEvent, useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { title, subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";


export default function DetailsForm({
  totalClassrooms,
  id,
}: {
  totalClassrooms: number;
  id: number;
}) {
  
  const router = useRouter();
  const [names, setNames] = useState(Array(totalClassrooms).fill("")); // Initialize with 11 empty strings
  const [ageRanges, setAgeRanges] = useState(Array(totalClassrooms).fill("")); // Initialize with 11 empty strings
  const [sizes, setSizes] = useState(Array(totalClassrooms).fill("")); // Initialize with 11 empty strings

  const ageRangeRegex = /^(\d+)-(\d+)$/
  const sizeRegex = /^(?:[1-9]|[1-3][0-9]|40)$/;

  const isValidAgeRange = (ageRange: string) => {
    const match = ageRange.match(ageRangeRegex);
    if (match) {
      const firstNumber = parseInt(match[1], 10);
      const secondNumber = parseInt(match[2], 10);
      return secondNumber > firstNumber;
    } else {
      return false;
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior;
    let dataList: (string | number)[][] = new Array(); // Initialize an empty array

    for (let i = 0; i < totalClassrooms; i++) {
      let name = names[i];
      let age = ageRanges[i];
      let size = sizes[i];
      dataList.push([id, name, age, size]);
    }
    try {
      const response = await fetch(`/api/manage/configure/details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formBody: dataList }), // Send the entire formData here
      });

      router.push("/manage/configure/details/upload");
      router.refresh();
    } catch {}
  };

  const handleNameChange = (rowIndex: number, newValue: string) => {
    setNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[rowIndex] = newValue;
      return updatedNames;
    });
  };

  const handleAgeRangeChange = (rowIndex: number, newValue: string) => {
    setAgeRanges((prevAgeRanges) => {
      const updatedAgeRanges = [...prevAgeRanges];
      updatedAgeRanges[rowIndex] = newValue;
      return updatedAgeRanges;
    });
  };

  const handleSizeChange = (rowIndex: number, newValue: string) => {
    setSizes((prevSizes) => {
      const updatedSizes = [...prevSizes];
      updatedSizes[rowIndex] = newValue;
      return updatedSizes;
    });
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-1">
      <div className="inline-block  text-center justify-center pb-5">
        <h1 className={title()}>Enter Individual Class Information</h1>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col">
            <div className="grid gap-6 grid-cols-3 items-center justify-center">
              <h1 className={subtitle()}>Enter Classroom Name</h1>
              <h1 className={subtitle()}>Enter Classroom Age Range</h1>
              <h1 className={subtitle()}>Enter Classroom Size</h1>
            </div>

            {[...Array(totalClassrooms)].map((_, rowIndex) => (
              <div key={rowIndex} className="grid gap-6 grid-cols-3 py-2">
                {rowIndex === 0 ? (
                  <Input
                    isRequired
                    name={`name${rowIndex}`}
                    label="Ex: Infant 1"
                    value={names[rowIndex]}
                    onChange={(e) => handleNameChange(rowIndex, e.target.value)}
                  />
                ) : (
                  <Input
                    isRequired
                    name={`name${rowIndex}`}
                    value={names[rowIndex]}
                    onChange={(e) => handleNameChange(rowIndex, e.target.value)}
                  />
                )}
                {rowIndex === 0 ? (
                  <Input
                    isRequired
                    name={`age${rowIndex}`}
                    label="Ex: 12-20"
                    value={ageRanges[rowIndex]}
                    errorMessage={!isValidAgeRange(ageRanges[rowIndex]) && "Please enter a valid age range"}
                    onChange={(e) =>
                      handleAgeRangeChange(rowIndex, e.target.value)
                    }
                  />
                ) : (
                  <Input
                    isRequired
                    name={`age${rowIndex}`}
                    value={ageRanges[rowIndex]}
                    errorMessage={!isValidAgeRange(ageRanges[rowIndex]) && "Please enter a valid age range"}
                    onChange={(e) =>
                      handleAgeRangeChange(rowIndex, e.target.value)
                    }
                  />
                )}

                {rowIndex === 0 ? (
                  <Input
                    isRequired
                    name={`size${rowIndex}`}
                    label="Ex: 7"
                    value={sizes[rowIndex]}
                    errorMessage={!sizeRegex.test(sizes[rowIndex]) && "Please enter a valid size"}
                    onChange={(e) => handleSizeChange(rowIndex, e.target.value)}
                  />
                ) : (
                  <Input
                    isRequired
                    name={`size${rowIndex}`}
                    value={sizes[rowIndex]}
                    errorMessage={!sizeRegex.test(sizes[rowIndex]) && "Please enter a valid size"}
                    onChange={(e) => handleSizeChange(rowIndex, e.target.value)}
                  />
                )}
              </div>
            ))}
            <Button type="submit" color="primary" fullWidth={true}>
              Save
            </Button>
          </CardBody>
        </form>
      </Card>
    </section>
  );
}
