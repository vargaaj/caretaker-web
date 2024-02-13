"use client";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { FormEvent } from "react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (email.trim() === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isPasswordEmpty = password.trim() === "";

    const isEmailEmpty = email.trim() === "";

    if (isPasswordEmpty || isEmailEmpty) {
      alert("Please enter a username and password");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    router.push("/login");
    router.refresh();
  };

  return (
    <section className="flex flex-col items-center justify-center mt-10 gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center pb-5">
        <h1 className={title()}>Register with&nbsp;</h1>
        <h1
          className={`${title({ color: "blue" })} border-b-4 border-blue-500`}>
          Caretaker&nbsp;
        </h1>
      </div>
      <Card className="w-1/2">
        <CardBody className="p-5 flex flex-col">
          <form onSubmit={handleSubmit}>
            <h4 className="pb-2 pl-1">Email Address</h4>

            <Input
              value={email}
              name="email"
              type="email"
              placeholder="glen@gmail.com"
              variant="bordered"
              className="pb-5"
              isInvalid={isInvalid}
              color={isInvalid ? "danger" : "success"}
              errorMessage={isInvalid && "Please enter a valid email"}
              onValueChange={setEmail}
            />

            <h4 className="pb-2 pl-1">Password</h4>

            <Input
              name="password"
              type="password"
              placeholder="Enter a password"
              variant="bordered"
              className="pb-5"
            />

            <Button type="submit" color="primary" fullWidth={true}>
              Register
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}
