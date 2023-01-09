import React from "react";
import { usePlaythrough } from "../utils/trpc";
import ItemIcon from "./ItemIcon";
import MedallionCircle from "./MedallionCircle";
import SongTracker from "./SongTracker";
import Tooltip from "./Tooltip";
import { useAtomValue } from "jotai";
import { idAtom } from "../utils/atoms";

function formatFilename(str: string): string {
	return str.toLowerCase().replaceAll(" ", "-");
}

const QuestTracker: React.FC<{
	items: string[];
	itemLocations: Record<string, string[]>;
}> = ({ items, itemLocations }) => {
	const stones = ["Kokiri Emerald", "Goron Ruby", "Zora Sapphire"];

	return (
		<div className="w-52">
			<MedallionCircle items={items} itemLocations={itemLocations} />
			<div className="mt-20 flex w-full justify-between gap-1">
				{stones.map((stone) => (
					<Tooltip
						key={stone}
						content={
							stone in itemLocations
								? `${stone} (${itemLocations[stone]})`
								: stone
						}
						className="relative h-20 w-20"
						showInfoIcon={stone in itemLocations}
					>
						<ItemIcon
							src={`/images/${formatFilename(stone)}.png`}
							className="h-full w-full object-contain"
							alt={stone}
							has={items.includes(stone)}
						/>
					</Tooltip>
				))}
			</div>
		</div>
	);
};

export default QuestTracker;
