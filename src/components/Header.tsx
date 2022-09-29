import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
	const { data: session, status } = useSession();

	const activeClass = "text-red-500";

	return (
		<header className="z-[999] flex h-20 w-full items-center justify-between bg-zinc-700 px-4 text-gray-50">
			<div>logo</div>
			<div className="flex h-full items-center justify-center gap-12">
				<Link href="/play">Play</Link>
				<Link href="/how-to-play">How to Play</Link>
			</div>
			<div className="flex items-center gap-2">
				{status === "unauthenticated" && (
					<Link href="/login">Log in</Link>
				)}
				{status === "authenticated" && (
					<>
						{session.user?.name}{" "}
						<img
							src={session.user?.image as string}
							className="h-10 rounded-full"
						/>
						<button onClick={() => signOut()}>Log out</button>
					</>
				)}
				{status === "loading" && <div></div>}
			</div>
		</header>
	);
};

export default Header;
