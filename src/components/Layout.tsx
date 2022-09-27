import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({
	children,
	mainClass,
}: {
	children: ReactNode;
	mainClass?: string;
}) => (
	<>
		<Header />
		<main className={`relative flex-grow basis-0 ${mainClass}`}>
			{children}
		</main>
	</>
);

export default Layout;
