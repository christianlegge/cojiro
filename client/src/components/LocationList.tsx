import React from "react";
import CheckSquare from "./CheckSquare";
import { useParams } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import ErrorBox from "./ErrorBox";
import { usePlaythrough } from "../utils/trpc";
import { useAtomValue } from "jotai/utils";
import { mapHeaderTextAtom, errorTextAtom } from "../utils/atoms";

const regions: {
	[key: string]: {
		locations: {
			[key: string]: {
				top: number;
				left: number;
				child: boolean;
				adult: boolean;
				always?: boolean;
			};
		};
		gossip_stones: {
			[key: string]: {
				top: number;
				left: number;
				child: boolean;
				adult: boolean;
				always?: boolean;
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
}: {
	age: "child" | "adult";
	region: string;
}) => {
	const { id } = useParams() as { id: string };
	const { data: playthrough, error, status } = usePlaythrough(id);

	const headerText = useAtomValue(mapHeaderTextAtom);
	const errorText = useAtomValue(errorTextAtom);

	if (!playthrough) {
		if (status === "loading") {
			return <div>Loading...</div>;
		} else {
			return (
				<div>
					Error in ItemTracker:{" "}
					{error ? error.message : "Unknown error"}
				</div>
			);
		}
	}
	const pathTo = playthrough.known_paths[region];

	if (!(region in regions)) {
		return <div>Error! region not set correctly</div>;
	}
	return (
		<div className="flex flex-col bg-black text-white">
			<div className="flex px-4 py-2 gap-8 min-h-16 bg-gradient-to-b from-black to-zinc-700 justify-between items-center sticky top-0 z-40">
				<div className="flex flex-col h-full justify-center">
					<span className="w-max text-2xl font-bold flex-shrink-0">
						{region}
					</span>
					<span className="w-max max-w-[20rem]">
						{pathTo &&
							`Path to: ${pathTo
								.filter(
									(el, idx, arr) => arr.indexOf(el) === idx
								)
								.join(", ")}`}
					</span>
				</div>
				{errorText ? (
					<ErrorBox error={errorText} />
				) : (
					<span className="text-lg">{headerText}</span>
				)}
				<a
					className="flex items-center gap-1 px-2 py-0 text-black bg-red-200 border-2 border-red-600 rounded-md text-lg hover:bg-red-100 active:bg-red-300 z-50"
					href={`//github.com/scatter-dev/zootr-sim/issues/new?body=**Describe issue here**%0APlease be as specific as possible!%0A%0A---- DO NOT EDIT BELOW THIS LINE ----%0APlaythrough id: ${id}`}
					target="_blank"
					rel="noreferrer"
				>
					<span>Feedback</span>
					<FiExternalLink style={{ display: "inline" }} />
				</a>
			</div>
			<div className="flex justify-center w-full h-auto py-8">
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
									(regions[region][checkType][el].always ||
										checkType === "gossip_stones" ||
										playthrough.locations.includes(el) ||
										el.includes("GS"))
							)
							.map((el) => (
								<CheckSquare
									type={checkType}
									key={el}
									check={el}
									coords={{
										top: `${regions[region][checkType][el].top}%`,
										left: `${regions[region][checkType][el].left}%`,
									}}
									displayName={locationDisplayName(
										el,
										region
									)}
									checked={playthrough.checked.includes(el)}
									item={playthrough.known_locations[el]}
								/>
							))
					)}
				</div>
			</div>
		</div>
	);
};

export default LocationList;
