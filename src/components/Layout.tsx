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
		<main className={`relative flex-grow ${mainClass}`}>{children}</main>
		<Footer />
	</>
);

export default Layout;
