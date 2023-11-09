import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { FiExternalLink } from "react-icons/fi";

const Header = () => {
	const { data: session, status } = useSession();

	const activeClass = "text-red-500";

	return (
		<header className="z-[999] flex h-28 w-full items-center justify-between px-8 font-heading text-2xl font-bold tracking-wider text-black shadow-2xl">
			<div className="h-full">
				<Link href="/">
					<img
						src="/images/logo/cojiro-black.png"
						alt="Cojiro"
						className="h-full cursor-pointer object-contain py-8"
					/>
				</Link>
			</div>
			<div className="flex h-full items-center justify-center gap-12">
				<Link href="/play">Play</Link>
				{/* <Link href="/how-to-play">How to Play</Link> */}
				<a
					href="https://github.com/christianlegge/cojiro"
					className="flex items-center gap-2"
					target="_blank"
					rel="noreferrer"
				>
					Source on GitHub
					<FiExternalLink />
				</a>
			</div>
			<div className="flex items-center gap-2 normal-case tracking-normal">
				{status === "unauthenticated" && (
					<Link href="/login">Log in</Link>
				)}
				{status === "authenticated" && (
					<>
						{session.user?.name}{" "}
						<img
							src={session.user?.image!}
							className="h-10 rounded-full"
						/>
						<button onClick={() => signOut()} className="uppercase">
							Log out
						</button>
					</>
				)}
				{status === "loading" && <div></div>}
			</div>
		</header>
	);
};

export default Header;
