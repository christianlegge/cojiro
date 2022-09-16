import React, { useState } from "react";
import CheckSquare from "./CheckSquare";
import { useParams } from "react-router-dom";

const regions: {
	[key: string]: {
		[key: string]: {
			top: number;
			left: number;
			child: boolean;
			adult: boolean;
		};
	};
} = await import("../data/regions.json").then((x) => x.default);

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
	checkLocation,
}: {
	age: "child" | "adult";
	region: string;
	checked: string[];
	setChecked: React.Dispatch<React.SetStateAction<string[]>>;
	setItems: React.Dispatch<React.SetStateAction<string[]>>;
	allLocations: string[];
	checkLocation: (input: { id: string; location: string }) => void;
}) => {
	if (!(region in regions)) {
		return <div>Error! region not set correctly</div>;
	}
	const { id } = useParams() as { id: string };
	const [lastItem, setLastItem] = useState("");

	return (
		<>
			<span className="text-2xl mx-auto">{lastItem}</span>
			<div className="flex justify-center w-full h-auto">
				<div className="relative inline-block min-h-0 min-w-0">
					<img
						src={`/images/maps/${region}.jpg`}
						alt=""
						className="object-contain h-full w-auto mx-auto"
					/>
					{Object.keys(regions[region])
						.filter(
							(el) =>
								allLocations.includes(el) || el.includes("GS")
						)
						.map((el, idx) => (
							<CheckSquare
								key={idx}
								check={el}
								coords={{
									top: `${regions[region][el].top}%`,
									left: `${regions[region][el].left}%`,
								}}
								displayName={locationDisplayName(el, region)}
								checked={checked.includes(el)}
								onClick={() => {
									checkLocation({
										id,
										location: el,
									});
								}}
							/>
						))}
				</div>
			</div>
			<div className="flex flex-wrap gap-2">
				{Object.keys(regions[region])
					.filter(
						(el) => allLocations.includes(el) || el.includes("GS")
					)
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
								checkLocation({
									id,
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
