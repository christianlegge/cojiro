import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
	const activeClass = "text-red-500";

	return (
		<header className="w-full h-20 bg-gray-700 text-gray-50 text-center">
			<div className="flex h-full justify-center items-center gap-12">
				<NavLink
					className={({ isActive }) =>
						isActive ? activeClass : undefined
					}
					to="/"
				>
					Play
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						isActive ? activeClass : undefined
					}
					to="/how-to-play"
				>
					How to Play
				</NavLink>
			</div>
		</header>
	);
};

export default Header;
