import React, { useEffect } from "react";
import CheckSquare from "./CheckSquare";
import { FiExternalLink } from "react-icons/fi";
import ErrorBox from "./ErrorBox";
import { usePlaythrough, useCheckLocation, trpc } from "../utils/trpc";
import { useAtomValue } from "jotai/utils";
import {
	idAtom,
	ageAtom,
	regionAtom,
	mapHeaderTextAtom,
	errorTextAtom,
} from "../utils/atoms";
import regionsJson from "../data/regions.json";
import { fetchingAtom } from "../utils/atoms";

type RegionsType = {
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
};

const regions = regionsJson as RegionsType;

function locationDisplayName(name: string, region: string): string {
	const parensMatch = /\(([^)]+)\)/.exec(name);
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

const LocationList = () => {
	const id = useAtomValue(idAtom);
	const { data: playthrough, error, status } = usePlaythrough(id);

	const age = useAtomValue(ageAtom);
	const region = useAtomValue(regionAtom);

	const fetching = useAtomValue(fetchingAtom);
	const headerText = useAtomValue(mapHeaderTextAtom);
	const errorText = useAtomValue(errorTextAtom);

	const checkLocation = useCheckLocation(id);

	const { data: freestandingItems } = trpc.useQuery([
		"playthrough.getFreestandingItems",
		{
			id: id,
			locations: Object.keys(regions[region].locations).filter((loc) =>
				loc.includes("Freestanding")
			),
		},
	]);

	useEffect(() => {
		if (playthrough && !playthrough.checked.includes("Links Pocket")) {
			checkLocation("Links Pocket");
		}
	}, [id, playthrough]);

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
		<div className="flex flex-col bg-black text-white h-full">
			<div className="flex px-4 py-2 gap-8 min-h-16 bg-gradient-to-b from-black to-zinc-700 justify-between items-center sticky top-0 z-40">
				<div className="flex flex-col h-full justify-center">
					<span className="w-max text-2xl font-bold flex-shrink-0">
						{region}
					</span>
					{pathTo && (
						<span className="w-max max-w-[20rem]">
							{`Path to: ${pathTo
								.filter(
									(el, idx, arr) => arr.indexOf(el) === idx
								)
								.join(", ")}
							`}
						</span>
					)}
					{playthrough.known_woth.includes(region) && (
						<span className="w-max max-w-[20rem]">
							Way of the Hero
						</span>
					)}
					{playthrough.known_barren.includes(region) && (
						<span className="w-max max-w-[20rem]">
							Foolish Choice
						</span>
					)}
				</div>
				{fetching ? (
					<span className="h-full animate-spin">.</span>
				) : errorText ? (
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
			<div className="flex justify-center items-center w-full h-full py-8">
				<div className="relative w-full">
					<img
						src={`/images/maps/${region}.jpg`}
						alt=""
						className="object-contain h-full w-full mx-auto"
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
									item={
										playthrough.known_locations[el] ??
										(freestandingItems
											? freestandingItems[el]
											: undefined)
									}
								/>
							))
					)}
				</div>
			</div>
		</div>
	);
};

export default LocationList;
