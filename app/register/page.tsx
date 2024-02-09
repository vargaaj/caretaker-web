import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import {Card, CardBody} from "@nextui-org/card";
import {Input} from "@nextui-org/input";

export default function Register() {
	return (
		<section className="flex flex-col items-center justify-center mt-10 gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center pb-5">
        <h1 className={title()}>
            Register with&nbsp;
          </h1>
          <h1 className={`${title({ color: "blue" })} border-b-4 border-blue-500`}>
					Caretaker&nbsp;
				</h1>
      </div>
      <Card className="w-1/2">
        <CardBody className="p-5 flex flex-col">
          <h4 className="pb-2 pl-1">Email Address</h4>

          <Input type="email" placeholder="Enter an email" variant="bordered" className="pb-5"/>

          <h4 className="pb-2 pl-1">Password</h4>

          <Input type="email" placeholder="Enter a password" variant="bordered" className="pb-5"/>

          <Button color='primary' fullWidth={true}>
            Register
          </Button>
          
        </CardBody>
      </Card>

		</section>
	);
}