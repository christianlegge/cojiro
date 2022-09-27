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

const QuestTracker: React.FC<{
	items: string[];
	itemLocations: Record<string, string[]>;
}> = ({ items, itemLocations }) => {
	const stones = ["Kokiri Emerald", "Goron Ruby", "Zora Sapphire"];

	return (
		<div className="w-52">
			<MedallionCircle items={items} itemLocations={itemLocations} />
			<div className="flex justify-between gap-1 w-full mt-20">
				{stones.map((stone) => (
					<Tooltip
						key={stone}
						content={
							stone in itemLocations
								? `${stone} (${itemLocations[stone]})`
								: stone
						}
						className="w-20 h-20 relative"
						showInfoIcon={stone in itemLocations}
					>
						<ItemIcon
							src={`/images/${formatFilename(stone)}.png`}
							className="object-contain w-full h-full"
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
