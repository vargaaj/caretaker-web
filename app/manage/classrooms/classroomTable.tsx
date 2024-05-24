"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
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

interface ClassroomTableProps {
  classroomDetailsData: Object;
  uploadData: Object;
}

export default function ClassroomTable({
  classroomDetailsData,
  uploadData,
}: ClassroomTableProps): JSX.Element {
  return (
    <section className="flex items-center justify-center mt-10 gap-4 py-8 md:py-10">
      <Card className="w-full">
        <CardHeader>
          <p className="text-lg">Select classroom with button below</p>
        </CardHeader>
        <Divider></Divider>
        <CardBody>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Classroom 1</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="1">Classroom 1</DropdownItem>
              <DropdownItem key="2">Classroom 2</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardBody>
      </Card>
      <Table aria-label="example table">
        <TableHeader>
          <TableColumn>Monday</TableColumn>
          <TableColumn>Tuesday</TableColumn>
          <TableColumn>Wednesday</TableColumn>
          <TableColumn>Thursday</TableColumn>
          <TableColumn>Friday</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell key="monday">Jessica</TableCell>
            <TableCell key="tuesday">Michelle</TableCell>
            <TableCell key="wednesday">Jake</TableCell>
            <TableCell key="thursday">AJ</TableCell>
            <TableCell key="friday">Caroline</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
