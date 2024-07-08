"use client";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { ClassroomDetails, UploadData } from "./classCreation";

interface ClassroomTableProps {
  classroomDetailsData: ClassroomDetails[];
  classes: { [month: string]: UploadData[] };
}

const getOrderedMonths = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthIndex = new Date().getMonth();
  return [
    ...months.slice(currentMonthIndex),
    ...months.slice(0, currentMonthIndex),
  ];
};

export default function ClassroomTable({
  classroomDetailsData,
  classes,
}: ClassroomTableProps): JSX.Element {
  const [className, setClassName] = useState(
    classroomDetailsData[0].classroomName
  );
  const [size, setSize] = useState(classroomDetailsData[0].size);
  const [range, setRange] = useState(classroomDetailsData[0].ageRange);
  const [filteredData, setFilteredData] = useState<UploadData[]>([]);
  const orderedMonths = getOrderedMonths();
  const [month, setMonth] = useState(orderedMonths[0]);

  const handleSelect = (selectedItem: any) => {
    const selectedClass = classroomDetailsData[selectedItem];
    setClassName(selectedClass.classroomName);
    setSize(selectedClass.size);
    setRange(selectedClass.ageRange);
  };

  const handleMonthSelect = (selectedItem: any) => {
    setMonth(orderedMonths[selectedItem]);
  };

  useEffect(() => {
    console.log("Class Name:", className);
    console.log("Month:", month);
    console.log("Classes for selected month:", classes[month]);
    const data = classes[month].filter(
      (item: UploadData) => item.Room === className
    );
    console.log(data);
    setFilteredData(data);
  }, [className, month, classes]);

  return (
    <section className="flex items-start justify-center gap-4">
      <Card className="w-96 max-h-sm mt-16">
        <CardHeader>
          <p className="text-lg">Select classroom with button below</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">{className}</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" onAction={handleSelect}>
              {classroomDetailsData.map((item, index) => (
                <DropdownItem key={index}>{item.classroomName}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown className="mt-4">
            <DropdownTrigger>
              <Button variant="bordered">{month}</Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Month Selector"
              onAction={handleMonthSelect}>
              {orderedMonths.map((month, index) => (
                <DropdownItem key={index}>{month}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-col">
          <p>{`Class Size: ${size}`}</p>
          <p>{`Class Age Range: ${range} months`}</p>
        </CardFooter>
      </Card>
      <div className="flex flex-col">
        <h1 className={`${title({ color: "blue" })} w-full text-center mb-4`}>
          Schedule&nbsp;
        </h1>
        <Table isStriped className="min-w-[600px]" aria-label="example table">
          <TableHeader>
            <TableColumn>Monday</TableColumn>
            <TableColumn>Tuesday</TableColumn>
            <TableColumn>Wednesday</TableColumn>
            <TableColumn>Thursday</TableColumn>
            <TableColumn>Friday</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredData.map((data) => (
              <TableRow key={nanoid()}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableCell key={index}>
                    <p>{`${data.FirstName} ${data.LastName}`}</p>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
