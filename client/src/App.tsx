import React, { useEffect, useState } from "react";
import RegionList from "./components/RegionList";
import LocationList from "./components/LocationList";

function App() {
	const [region, setRegion] = useState(
		() => localStorage.getItem("region") ?? "Kokiri Forest"
	);
	useEffect(() => {
		localStorage.setItem("region", region);
	}, [region]);
	return (
		<>
			<div className="xl:flex min-h-screen">
				<div className="xl:border-r-2 xl:w-64 xl:border-b-0 border-b-2 border-red-400 p-4">
					<RegionList region={region} setRegion={setRegion} />
				</div>
				<div className="p-4">
					<LocationList region={region} />
				</div>
			</div>
		</>
	);
}

export default App;
