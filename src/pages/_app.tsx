import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import Head from "next/head";
import "~/styles/globals.css";

import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<>
			<Head>
				<title>Cojiro</title>
				<meta property="og:title" content="Cojiro" />
				<meta
					property="og:description"
					content="Simulate and practice Ocarina of Time Randomizer seeds"
				/>
				<meta property="og:url" content="https://www.cojiro.app" />
				<meta
					property="og:image"
					content="https://www.cojiro.app/images/cojiro.png"
				/>
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="cojiro.app" />
				<meta name="twitter:card" content="summary" />

				<meta name="twitter:title" content="Cojiro" />
				<meta
					name="twitter:description"
					content="Simulate and practice Ocarina of Time Randomizer seeds"
				/>
				<meta
					name="twitter:image"
					content="https://www.cojiro.app/images/cojiro.png"
				/>
				<meta name="twitter:site:id" content="@christian_legge" />
			</Head>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</>
	);
};

export default api.withTRPC(MyApp);
