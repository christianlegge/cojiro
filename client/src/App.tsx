import React from "react";
import { Route, Routes } from "react-router-dom";
import HowToPlay from "./pages/HowToPlay";
import ZootrSim from "./pages/ZootrSim";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<ZootrSim />} />
			<Route path="/how-to-play" element={<HowToPlay />} />
		</Routes>
	);
};

export default App;
