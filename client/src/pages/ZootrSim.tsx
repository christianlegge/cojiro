import React, { useEffect, useState } from "react";
import RegionList from "../components/RegionList";
import LocationList from "../components/LocationList";
import ItemTracker from "../components/ItemTracker";
import QuestTracker from "../components/QuestTracker";
import HintTracker from "../components/HintTracker";

const ZootrSim = () => {
	const [region, setRegion] = useState<string>(
		() => localStorage.getItem("region") ?? "Kokiri Forest"
	);

	const [age, setAge] = useState<"child" | "adult">(
		() => (localStorage.getItem("age") as "child" | "adult") ?? "child"
	);

	useEffect(() => {
		localStorage.setItem("region", region);
		localStorage.setItem("age", age);
	}, [region, age]);

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
						<LocationList age={age} region={region} />
					</div>
					<ItemTracker />
					<QuestTracker />
					{/* <HintTracker /> */}
				</div>
			</div>
		</>
	);
};

export default ZootrSim;
