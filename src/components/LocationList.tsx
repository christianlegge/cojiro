import React from "react";
import CheckSquare from "./CheckSquare";
import { FiExternalLink } from "react-icons/fi";
import ErrorBox from "./ErrorBox";
import { usePlaythrough, trpc } from "../utils/trpc";
import { useAtomValue } from "jotai";
import {
	idAtom,
	ageAtom,
	regionAtom,
	mapHeaderTextAtom,
	errorTextAtom,
} from "../utils/atoms";
import regions from "../utils/regions";
import { fetchingAtom } from "../utils/atoms";
import { formatFilename } from "../utils/filename";

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

	const { data: freestandingItems } = trpc.useQuery([
		"playthrough.getFreestandingItems",
		{
			id: id,
			locations: Object.keys(regions[region].locations).filter((loc) =>
				loc.includes("Freestanding")
			),
		},
	]);

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
		<div className="flex h-full flex-col bg-black text-white">
			<div className="min-h-16 sticky top-0 z-40 flex items-center justify-between gap-8 bg-gradient-to-b from-black to-zinc-700 px-4 py-2">
				<div className="flex h-full flex-col justify-center">
					<span className="w-max flex-shrink-0 text-2xl font-bold">
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
					className="z-50 flex items-center gap-1 rounded-md border-2 border-red-600 bg-red-200 px-2 py-0 text-lg text-black hover:bg-red-100 active:bg-red-300"
					href={`//github.com/christianlegge/cojiro/issues/new?body=**Describe issue here**%0APlease be as specific as possible!%0A%0A---- DO NOT EDIT BELOW THIS LINE ----%0APlaythrough id: ${id}`}
					target="_blank"
					rel="noreferrer"
				>
					<span>Feedback</span>
					<FiExternalLink style={{ display: "inline" }} />
				</a>
			</div>
			<div className="flex h-full w-full items-center justify-center py-8">
				<div className="relative w-full">
					<img
						src={`/images/maps/${formatFilename(region)}.jpg`}
						alt=""
						className="mx-auto h-full w-full object-contain"
					/>
					{(
						["locations", "gossip_stones", "entrances"] as (
							| "locations"
							| "gossip_stones"
							| "entrances"
						)[]
					).flatMap((checkType) =>
						Object.keys(regions[region][checkType])
							.filter(
								(el) =>
									regions[region][checkType][el][age] &&
									(regions[region][checkType][el].always ||
										checkType === "gossip_stones" ||
										checkType === "entrances" ||
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
									displayName={
										checkType === "entrances"
											? `To ${regions[el].name}`
											: locationDisplayName(el, region)
									}
									checked={
										el !== "Ganon" &&
										playthrough.checked.includes(el)
									}
									item={
										checkType === "locations"
											? playthrough.known_locations[el] ??
											  (freestandingItems
													? freestandingItems[el]
													: undefined)
											: undefined
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
