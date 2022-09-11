import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import HowToPlay from "./pages/HowToPlay";
import ZootrSim from "./pages/ZootrSim";
import { trpc } from "./utils/trpc";

const App = () => {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			url: `${import.meta.env.VITE_SERVER_URL ?? ""}/trpc`,
		})
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="/" element={<ZootrSim />} />
					<Route path="/how-to-play" element={<HowToPlay />} />
				</Routes>
			</QueryClientProvider>
		</trpc.Provider>
	);
};

export default App;
