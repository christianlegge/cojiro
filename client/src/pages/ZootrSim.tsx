import React, { useEffect, useState } from "react";
import RegionList from "../components/RegionList";
import LocationList from "../components/LocationList";
import QuitForm from "../components/QuitForm";
import ItemTracker from "../components/ItemTracker";
import { trpc } from "../utils/trpc";
import LandingPage from "./LandingPage";
import MedallionTracker from "../components/MedallionTracker";
import { useParams, useNavigate } from "react-router-dom";

const ZootrSim = () => {
	const { id } = useParams() as { id: string };
	const navigate = useNavigate();

	const [region, setRegion] = useState<string>(
		() => localStorage.getItem("region") ?? "Kokiri Forest"
	);

	const [locations, setLocations] = useState<string[]>([]);

	const [items, setItems] = useState<string[]>([]);
	const [checked, setChecked] = useState<string[]>([]);

	const [age, setAge] = useState<"child" | "adult">(
		() => (localStorage.getItem("age") as "child" | "adult") ?? "child"
	);

	const getPlaythroughResult = trpc.useQuery(
		[
			"playthrough.get",
			{
				id,
			},
		],
		{
			enabled: id !== "",
			onSuccess: ({ checked, items, locations }) => {
				setLocations(locations);
				setItems(items);
				setChecked(checked);
			},
		}
	);

	useEffect(() => {
		localStorage.setItem("region", region);
		localStorage.setItem("age", age);
	}, [region, age]);

	useEffect(() => {
		if (id === "") {
			setAge("child");
			setRegion("Kokiri Forest");
			return;
		} else {
			getPlaythroughResult.refetch();
		}
	}, [id, getPlaythroughResult]);

	return (
		<>
			<div className="flex flex-col lg:flex-row">
				<div className="w-full flex-shrink-0 lg:w-80 lg:border-r-2 lg:border-b-0 border-b-2 border-red-400 z-10">
					<RegionList
						region={region}
						setRegion={setRegion}
						age={age}
						setAge={setAge}
					/>
					<QuitForm />
				</div>
				<div className="grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min flex-grow">
					<div className="xl:col-span-3 lg:col-span-2 relative">
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
					<div className="bg-blue-400">
						<MedallionTracker items={items} />
					</div>
					<div className="bg-green-300">Hints</div>
				</div>
			</div>

			<a
				className="absolute right-4 top-4 px-2 py-0 bg-red-200 border-2 border-red-600 rounded-md text-lg hover:bg-red-100 active:bg-red-300 z-50"
				href={`//github.com/scatter-dev/zootr-sim/issues/new?body=Describe issue here%0A%0A---- DO NOT EDIT BELOW THIS LINE ----%0APlaythrough id: ${id}`}
				target="_blank"
				rel="noreferrer"
			>
				⚠ Report issue
			</a>
		</>
	);
};

export default ZootrSim;
