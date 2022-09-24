import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
	const { data: session, status } = useSession();

	console.log("data?", session);
	console.log("status?", status);

	const activeClass = "text-red-500";

	return (
		<header className="w-full h-20 px-4 bg-zinc-700 text-gray-50 flex justify-between items-center">
			<div>logo</div>
			<div className="flex h-full justify-center items-center gap-12">
				<Link href="/play">Play</Link>
				<Link href="/how-to-play">How to Play</Link>
			</div>
			<div className="flex gap-2 items-center">
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
