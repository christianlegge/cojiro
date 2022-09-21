import React from "react";
import { usePlaythrough } from "../utils/trpc";
import ItemIcon from "./ItemIcon";
import MedallionCircle from "./MedallionCircle";
import SongTracker from "./SongTracker";
import Tooltip from "./Tooltip";
import { useAtomValue } from "jotai/utils";
import { idAtom } from "../utils/atoms";

function formatFilename(str: string): string {
	return str.toLowerCase().replaceAll(" ", "-");
}

const QuestTracker = () => {
	const id = useAtomValue(idAtom);
	const { data: playthrough, error, status } = usePlaythrough(id);

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
	const stones = ["Kokiri Emerald", "Goron Ruby", "Zora Sapphire"];
	let itemLocations = Object.keys(playthrough.known_locations).reduce(
		(a, v) => ({
			...a,
			[playthrough.known_locations[v]]: [
				...(a[playthrough.known_locations[v]] ?? []),
				v,
			],
		}),
		{} as { [key: string]: string[] }
	);
	return (
		<div className="grid grid-cols-[1fr_16rem] bg-blue-400">
			<div>
				Skulltulas:{" "}
				{
					playthrough.items.filter(
						(el) => el === "Gold Skulltula Token"
					).length
				}
			</div>
			<div className="row-span-2 pr-12 py-6">
				<MedallionCircle
					items={playthrough.items}
					itemLocations={itemLocations}
				/>
				<div className="flex justify-between gap-1 w-full mt-20">
					{stones.map((stone) => (
						<Tooltip
							key={stone}
							content={
								stone in itemLocations
									? `${stone} (${itemLocations[stone]})`
									: stone
							}
							className="w-12 h-12 relative"
							showInfoIcon={stone in itemLocations}
						>
							<ItemIcon
								src={`/images/${formatFilename(stone)}.png`}
								className="object-contain w-full h-full"
								alt={stone}
								has={playthrough.items.includes(stone)}
							/>
						</Tooltip>
					))}
				</div>
			</div>
			<SongTracker items={playthrough.items} />
		</div>
	);
};

export default QuestTracker;
