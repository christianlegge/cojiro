import React, { useState } from "react";
import CheckSquare from "./CheckSquare";
import { useParams } from "react-router-dom";

const regions: {
	[key: string]: {
		locations: {
			[key: string]: {
				top: number;
				left: number;
				child: boolean;
				adult: boolean;
			};
		};
		gossip_stones: {
			[key: string]: {
				top: number;
				left: number;
				child: boolean;
				adult: boolean;
			};
		};
	};
} = await import("../data/regions.json").then((x) => x.default);

function locationDisplayName(name: string, region: string): string {
	let parensMatch = /\(([^)]+)\)/.exec(name);
	if (parensMatch) {
		return `${parensMatch[1]} Gossip Stone`;
	}
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
	checkStone,
	headerText,
}: {
	age: "child" | "adult";
	region: string;
	checked: string[];
	setChecked: React.Dispatch<React.SetStateAction<string[]>>;
	setItems: React.Dispatch<React.SetStateAction<string[]>>;
	allLocations: string[];
	checkLocation: (input: { id: string; location: string }) => void;
	checkStone: (input: { id: string; stone: string }) => void;
	headerText?: string;
}) => {
	if (!(region in regions)) {
		return <div>Error! region not set correctly</div>;
	}
	const { id } = useParams() as { id: string };

	return (
		<>
			<div className="flex px-4 py-2 justify-between">
				<span className="text-2xl font-bold">{region}</span>
				<span className="text-lg">{headerText}</span>
			</div>
			<div className="flex justify-center w-full h-auto">
				<div className="relative inline-block min-h-0 min-w-0">
					<img
						src={`/images/maps/${region}.jpg`}
						alt=""
						className="object-contain h-full w-auto mx-auto"
					/>
					{(
						["locations", "gossip_stones"] as (
							| "locations"
							| "gossip_stones"
						)[]
					).flatMap((checkType) =>
						Object.keys(regions[region][checkType])
							.filter(
								(el) =>
									regions[region][checkType][el][age] &&
									(checkType === "gossip_stones" ||
										allLocations.includes(el) ||
										el.includes("GS"))
							)
							.map((el) => (
								<CheckSquare
									type={checkType}
									key={el}
									check={locationDisplayName(el, region)}
									coords={{
										top: `${regions[region][checkType][el].top}%`,
										left: `${regions[region][checkType][el].left}%`,
									}}
									displayName={locationDisplayName(
										el,
										region
									)}
									checked={checked.includes(el)}
									onClick={() => {
										checkType === "locations"
											? checkLocation({
													id,
													location: el,
											  })
											: checkStone({
													id,
													stone: el,
											  });
									}}
								/>
							))
					)}
				</div>
			</div>
			<div className="flex flex-wrap gap-2">
				{Object.keys(regions[region].locations)
					.filter(
						(el) =>
							(allLocations.includes(el) || el.includes("GS")) &&
							regions[region].locations[el][age]
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
