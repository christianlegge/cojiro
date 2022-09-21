import React from "react";
import Link from "next/link";

const Header = () => {
	const activeClass = "text-red-500";

	return (
		<header className="w-full h-20 bg-gray-700 text-gray-50 text-center">
			<div className="flex h-full justify-center items-center gap-12">
				<Link href="/play">Play</Link>
				<Link href="/how-to-play">How to Play</Link>
				<Link href="/login">Log in/Register</Link>
			</div>
		</header>
	);
};

export default Header;
