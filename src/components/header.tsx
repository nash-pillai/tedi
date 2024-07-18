"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CldImage } from "next-cloudinary";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
	// { name: "Home", href: "/" },
	{ name: "About", href: "/about" },
	// { name: "Our Work", href: "/our-work" },
	{ name: "Blog", href: "/blog" },
	{ name: "Petitions", href: "/petitions" },
	// { name: "Join Us", href: "/join" },
];

export default function Header() {
	const { data: session } = useSession();

	console.log(session);

	const path = usePathname();

	return (
		<header className="fixed z-30 w-full bg-white shadow-md dark:bg-stone-950">
			<div className="container mx-auto flex items-center justify-between px-4 py-4">
				<Link href={"/"} className="flex items-center space-x-2">
					<CldImage width="40" height="40" src="logo" alt="Logo" className="h-10 w-10" />
					<h1 className="hidden text-xl font-bold text-green-700 sm:block dark:text-blue-400">
						The Environmental Defense Initiative
					</h1>
				</Link>
				<nav className="flex items-center space-x-8 text-lg">
					{links.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className={
								link.href === path ? "text-green-700 dark:text-green-300" : "text-blue-700 dark:text-blue-400"
							}>
							{link.name}
						</Link>
					))}
					{session?.user ? (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<div className="border-gray-700 pb-3 pt-4">
									<div className="flex items-center px-5">
										<div className="mr-3 flex-shrink-0">
											<Image
												className="h-10 w-10 rounded-full"
												src={session.user.image ?? "https://res.cloudinary.com/mozzarella-tedi/image/upload/utter.png"}
												width={40}
												height={40}
												alt=""
											/>
										</div>
										<div className="hidden lg:block">
											<div className="text-base font-medium text-gray-800 dark:text-white">{session.user.name}</div>
											<div className="text-sm font-medium text-gray-600 dark:text-gray-300">{session.user.email}</div>
										</div>
									</div>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem>
									<button onClick={() => signOut()}>Sign Out</button>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Link className="btn-sm group w-full bg-blue-700 shadow-sm md:w-max" href={`/signin?redirect=${path}`}>
							{/* <ShimmerButton className="shadow-2xl" background="#4F46E5"> */}
							<span className="whitespace-pre-wrap from-white to-slate-900/10 px-2 py-1 text-center text-lg font-medium leading-none tracking-tight text-white">
								Sign In{" "}
								<span className="ml-1 tracking-normal text-sky-300 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5">
									-&gt;
								</span>
							</span>
						</Link>
					)}
				</nav>
			</div>
		</header>
	);
}
