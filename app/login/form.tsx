"use client"
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Input} from "@nextui-org/input";
import { FormEvent } from "react";
import { signIn } from 'next-auth/react';

export default function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    console.log({ response })
  };

	return (
		<section className="flex flex-col items-center justify-center mt-10 gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center pb-5">
        <h1 className={title()}>
            Sign in to&nbsp;
          </h1>
          <h1 className={`${title({ color: "blue" })} border-b-4 border-blue-500`}>
					Caretaker&nbsp;
				</h1>
      </div>
      <Card className="w-1/2">
        <CardBody className="p-5 flex flex-col">
          <form onSubmit={handleSubmit}>
            <h4 className="pb-2 pl-1">Email Address</h4>

            <Input name='email' type="email" placeholder="Enter your email" variant="bordered" className="pb-5"/>

            <h4 className="pb-2 pl-1">Password</h4>

            <Input name='password' type="password" placeholder="Enter your password" variant="bordered" className="pb-5"/>

            <Button type='submit' color='primary' fullWidth={true}>
              Sign In
            </Button>
          </form>
          
          
        </CardBody>
      </Card>

		</section>
	);
}