import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
	NavbarItem,
} from "@nextui-org/navbar";


import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
	// uncomment below to add search input feature
	// also make sure to import SearchIcon
	// const searchInput = (
	// 	<Input
	// 		aria-label="Search"
	// 		classNames={{
	// 			inputWrapper: "bg-default-100",
	// 			input: "text-sm",
	// 		}}
	// 		endContent={
	// 			<Kbd className="hidden lg:inline-block" keys={["command"]}>
	// 				K
	// 			</Kbd>
	// 		}
	// 		labelPlacement="outside"
	// 		placeholder="Search..."
	// 		startContent={
	// 			<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
	// 		}
	// 		type="search"
	// 	/>
	// );

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						
					</NextLink>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<ThemeSwitch />
				</NavbarItem>
			</NavbarContent>
		</NextUINavbar>
	);
};
