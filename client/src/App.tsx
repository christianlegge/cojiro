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
			.get(
				`${process.env.REACT_APP_SERVER_URL}/playthrough/getPlaythrough`,
				{
					params: { id: playthroughId },
				}
			)
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
				<div className="flex flex-col lg:flex-row">
					<div className="w-full flex-shrink-0 lg:w-80 lg:border-r-2 lg:border-b-0 border-b-2 border-red-400">
						<RegionList
							region={region}
							setRegion={setRegion}
							age={age}
							setAge={setAge}
						/>
					</div>
					<div className="grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min">
						<div className="xl:col-span-3 p-4 flex flex-col justify-between pb-24">
							<QuitForm playthroughSetter={setPlaythroughId} />
							<LocationList
								age={age}
								region={region}
								checked={checked}
								setChecked={setChecked}
								setItems={setItems}
								allLocations={locations}
							/>
						</div>
						<div className="bg-red-300">
							<ItemTracker items={items} />
						</div>
						<div className="bg-blue-400">Medallions</div>
						<div className="bg-green-300">Hints</div>
					</div>
				</div>
			) : (
				<LandingPage setPlaythroughId={setPlaythroughId} />
			)}
		</Playthrough.Provider>
	);
}

export default App;
