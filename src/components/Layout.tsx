import React, { ReactNode } from "react";
import Header from "./Header";

const Layout = ({
	children,
	mainClass,
	noHeader,
}: {
	children: ReactNode;
	mainClass?: string;
	noHeader?: boolean;
}) => (
	<>
		{noHeader ?? <Header />}
		<main className={`relative flex-grow basis-0 ${mainClass}`}>
			{children}
		</main>
	</>
);

export default Layout;
