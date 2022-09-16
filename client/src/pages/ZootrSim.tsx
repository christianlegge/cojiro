import React, { useEffect, useState } from "react";
import RegionList from "../components/RegionList";
import LocationList from "../components/LocationList";
import QuitForm from "../components/QuitForm";
import ItemTracker from "../components/ItemTracker";
import { trpc } from "../utils/trpc";
import LandingPage from "./LandingPage";
import QuestTracker from "../components/QuestTracker";
import { useParams, useNavigate } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { stringify } from "querystring";
import HintTracker from "../components/HintTracker";

const ZootrSim = () => {
	const { id } = useParams() as { id: string };
	const navigate = useNavigate();

	const [region, setRegion] = useState<string>(
		() => localStorage.getItem("region") ?? "Kokiri Forest"
	);

	const [locations, setLocations] = useState<string[]>([]);

	const [items, setItems] = useState<string[]>([]);
	const [checked, setChecked] = useState<string[]>([]);
	const [hints, setHints] = useState<string[]>([]);
	const [lastCheck, setLastCheck] = useState("");

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
			onSuccess: ({ checked, items, locations, known_hints }) => {
				setLocations(locations);
				setItems(items);
				setChecked(checked);
				setHints(known_hints);
				if (!checked.includes("Links Pocket")) {
					checkLocation.mutate({ id, location: "Links Pocket" });
				}
			},
		}
	);

	useEffect(() => {
		localStorage.setItem("region", region);
		localStorage.setItem("age", age);
	}, [region, age]);

	const checkLocation = trpc.useMutation("playthrough.checkLocation", {
		onSuccess: ({ checked, item }) => {
			setItems((items) => [...items, item]);
			setChecked((prev) => [...prev, checked]);
			setLastCheck(`${checked}: ${item}`);
		},
		onError: (err) => console.log(err),
	});

	const checkLocationWrapper = (input: { id: string; location: string }) => {
		checkLocation.mutate({ ...input });
	};

	const checkStone = trpc.useMutation("playthrough.checkStone", {
		onSuccess: ({ checked, hint }) => {
			setChecked((prev) => [...prev, checked]);
			setLastCheck(`${checked}: ${hint}`);
		},
		onError: (err) => console.log(err),
	});

	const checkStoneWrapper = (input: { id: string; stone: string }) => {
		checkStone.mutate({ ...input });
	};

	return (
		<>
			<div
				className="flex flex-col lg:flex-row"
				style={{ imageRendering: "crisp-edges" }}
			>
				<div className="w-full flex-shrink-0 lg:w-80 lg:border-r-2 lg:border-b-0 border-b-2 z-10">
					<RegionList
						region={region}
						setRegion={setRegion}
						age={age}
						setAge={setAge}
					/>
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
							checkLocation={checkLocationWrapper}
							checkStone={checkStoneWrapper}
							headerText={lastCheck}
						/>
					</div>
					<ItemTracker items={items} />
					<div className="bg-blue-400">
						<QuestTracker items={items} />
					</div>
					<HintTracker hints={hints} />
				</div>
			</div>

			<a
				className="absolute flex items-center gap-1 right-4 -top-14 px-2 py-0 bg-red-200 border-2 border-red-600 rounded-md text-lg hover:bg-red-100 active:bg-red-300 z-50"
				href={`//github.com/scatter-dev/zootr-sim/issues/new?body=**Describe issue here**%0APlease be as specific as possible!%0A%0A---- DO NOT EDIT BELOW THIS LINE ----%0APlaythrough id: ${id}`}
				target="_blank"
				rel="noreferrer"
			>
				<span>Give feedback/report issue</span>
				<FiExternalLink style={{ display: "inline" }} />
			</a>
		</>
	);
};

export default ZootrSim;
