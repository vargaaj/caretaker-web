"use client";

import clsx from "clsx";
import { signOut } from "next-auth/react";
import NextLink from "next/link";
import { link as linkStyles } from "@nextui-org/theme";

export default function Logout() {
  return (
    <NextLink
      onClick={() => {
        signOut();
      }}
      className={clsx(
        linkStyles({ color: "foreground" }),
        "data-[active=true]:text-primary data-[active=true]:font-medium"
      )}
      color="foreground"
      href="/">
      Logout
    </NextLink>
  );
}
