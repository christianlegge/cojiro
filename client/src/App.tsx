import React, { useEffect, useState } from "react";
import RegionList from "./components/RegionList";
import LocationList from "./components/LocationList";
import QuitForm from "./components/QuitForm";
import Playthrough from "./contexts/Playthrough";
import ItemTracker from "./components/ItemTracker";
import axios from "axios";
import LandingPage from "./components/LandingPage";

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

	const [age, setAge] = useState<"child" | "adult">(
		() => (localStorage.getItem("age") as "child" | "adult") ?? "child"
	);

	useEffect(() => {
		localStorage.setItem("region", region);
		localStorage.setItem("age", age);
	}, [region, age]);

	useEffect(() => {
		if (!playthroughId) {
			setAge("child");
			setRegion("Kokiri Forest");
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
						<div className="xl:border-r-2 xl:w-64 xl:border-b-0 border-b-2 border-red-400">
							<RegionList
								region={region}
								setRegion={setRegion}
								age={age}
								setAge={setAge}
							/>
						</div>
						<div className="p-4 flex flex-col justify-between pb-24">
							<LocationList
								age={age}
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
				<LandingPage setPlaythroughId={setPlaythroughId} />
			)}
		</Playthrough.Provider>
	);
}

export default App;
