import React, { useContext, useState } from "react";
import regions from "../utils/regions";
import Playthrough from "../contexts/Playthrough";
import { trpc } from "../utils/trpc";
import CheckSquare from "./CheckSquare";

function locationDisplayName(name: string, region: string): string {
	if (name.startsWith(region)) {
		return name.slice(region.length);
	}
	if (/^[A-Z]+ /.test(name) || name.startsWith("Kak ")) {
		return name.slice(name.indexOf(" ") + 1);
	} else {
		return name;
	}
}

const LocationList = ({
	age,
	region,
	checked,
	setChecked,
	setItems,
	allLocations,
}: {
	age: "child" | "adult";
	region: string;
	checked: string[];
	setChecked: React.Dispatch<React.SetStateAction<string[]>>;
	setItems: React.Dispatch<React.SetStateAction<string[]>>;
	allLocations: string[];
}) => {
	const playthroughId = useContext(Playthrough);
	const [lastItem, setLastItem] = useState("");
	const checkLocation = trpc.useMutation("playthrough.checkLocation", {
		onSuccess: ({ checked, item }) => {
			setItems((items) => [...items, item]);
			setChecked((prev) => [...prev, checked]);
			setLastItem(item);
		},
		onError: (err) => console.log(err),
	});
	return (
		<>
			<span className="text-2xl mx-auto">{lastItem}</span>
			<div className="flex justify-center w-full h-auto">
				<div className="relative inline-block min-h-0 min-w-0">
					<img
						src={`images/maps/${region}.jpg`}
						alt=""
						className="object-contain h-full w-auto mx-auto"
					/>
					{Object.keys(regions[region].locations)
						.filter((el) => allLocations.includes(el))
						.map((el, idx) => (
							<CheckSquare
								check={el}
								coords={{ top: 0, left: idx * 40 }}
								displayName={locationDisplayName(el, region)}
								checked={checked.includes(el)}
								onClick={() => {
									checkLocation.mutate({
										id: playthroughId,
										location: el,
									});
								}}
							/>
						))}
				</div>
			</div>
			<div className="flex flex-wrap gap-2">
				{Object.keys(regions[region].locations)
					.filter((el) => allLocations.includes(el))
					.map((el) => (
						<button
							className={`block rounded-md p-2 ${
								checked.includes(el)
									? "line-through cursor-default bg-gray-100 text-gray-500"
									: "shadow-md cursor-pointer bg-green-300 hover:bg-green-200 active:bg-green-400"
							}`}
							key={el}
							onClick={async () => {
								if (checked.includes(el)) {
									return;
								}
								checkLocation.mutate({
									id: playthroughId,
									location: el,
								});
							}}
						>
							{locationDisplayName(el, region)}
						</button>
					))}
			</div>
		</>
	);
};

export default LocationList;
