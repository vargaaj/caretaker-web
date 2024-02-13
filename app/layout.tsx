import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { link as linkStyles } from "@nextui-org/theme";
import Logout from "./logout";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <NextUINavbar maxWidth="xl" position="sticky">
              <NavbarContent
                className="basis-1/5 sm:basis-full"
                justify="start">
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                  {siteConfig.navItems.map((item) => (
                    <NavbarItem key={item.href}>
                      <NextLink
                        className={clsx(
                          linkStyles({ color: "foreground" }),
                          "data-[active=true]:text-primary data-[active=true]:font-medium"
                        )}
                        color="foreground"
                        href={item.href}>
                        {item.label}
                      </NextLink>
                    </NavbarItem>
                  ))}
                </ul>
              </NavbarContent>

              <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end">
                <NavbarItem className="hidden sm:flex gap-2">
                  <ThemeSwitch />
                </NavbarItem>
                <NavbarItem>
                  {!!session && <Logout />}
                  {!session && (
                    <NextLink
                      className={clsx(
                        linkStyles({ color: "foreground" }),
                        "data-[active=true]:text-primary data-[active=true]:font-medium"
                      )}
                      color="foreground"
                      href="/login">
                      Login
                    </NextLink>
                  )}
                </NavbarItem>
              </NavbarContent>
            </NextUINavbar>
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
