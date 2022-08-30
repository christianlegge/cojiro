import React, { useEffect, useState } from "react";
import RegionList from "./components/RegionList";
import LocationList from "./components/LocationList";
import StartForm from "./components/StartForm";
import QuitForm from "./components/QuitForm";
import Playthrough from "./contexts/Playthrough";
import ItemTracker from "./components/ItemTracker";
import axios from "axios";

function App() {
	const [region, setRegion] = useState<string>(
		() => localStorage.getItem("region") ?? "Kokiri Forest"
	);

	const [playthroughId, setPlaythroughId] = useState<string | null>(() =>
		localStorage.getItem("playthroughId")
	);

	const [locations, setLocations] = useState<string[]>([]);

	const [items, setItems] = useState<string[]>([]);
	const [checked, setChecked] = useState<string[]>([]);

	useEffect(() => {
		localStorage.setItem("region", region);
	}, [region]);

	useEffect(() => {
		if (!playthroughId) {
			return;
		}
		axios
			.get(`${process.env.REACT_APP_SERVER_URL}/getPlaythrough`, {
				params: { id: playthroughId },
			})
			.then((res) => {
				setItems(res.data.items);
				setChecked(res.data.checked);
				setLocations(res.data.locations);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [playthroughId]);

	return (
		<Playthrough.Provider value={playthroughId}>
			{playthroughId ? (
				<>
					<div className="xl:flex min-h-screen">
						<div className="xl:border-r-2 xl:w-64 xl:border-b-0 border-b-2 border-red-400 p-4">
							<RegionList region={region} setRegion={setRegion} />
						</div>
						<div className="p-4 flex flex-col justify-between pb-24 container">
							<LocationList
								region={region}
								checked={checked}
								setChecked={setChecked}
								setItems={setItems}
								allLocations={locations}
							/>
							<ItemTracker items={items} />
						</div>
						<div className=""></div>
					</div>
					<QuitForm playthroughSetter={setPlaythroughId} />
				</>
			) : (
				<StartForm
					setPlaythroughId={setPlaythroughId}
					setLocations={setLocations}
				/>
			)}
		</Playthrough.Provider>
	);
}

export default App;
