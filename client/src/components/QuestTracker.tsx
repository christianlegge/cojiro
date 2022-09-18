import React from "react";
import ItemIcon from "./ItemIcon";
import MedallionCircle from "./MedallionCircle";
import SongTracker from "./SongTracker";
import Tooltip from "./Tooltip";

function formatFilename(str: string): string {
	return str.toLowerCase().replaceAll(" ", "-");
}

const QuestTracker = ({
	items,
	knownLocations,
}: {
	items: string[];
	knownLocations: { [key: string]: string };
}) => {
	const stones = ["Kokiri Emerald", "Goron Ruby", "Zora Sapphire"];
	let itemLocations = Object.keys(knownLocations).reduce(
		(a, v) => ({
			...a,
			[knownLocations[v]]: [...(a[knownLocations[v]] ?? []), v],
		}),
		{} as { [key: string]: string[] }
	);
	return (
		<div className="grid grid-cols-[1fr_16rem]">
			<div>
				Skulltulas:{" "}
				{items.filter((el) => el === "Gold Skulltula Token").length}
			</div>
			<div className="row-span-2 pr-12 py-6">
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
							className="w-12 h-12 relative"
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
			<SongTracker items={items} />
		</div>
	);
};

export default QuestTracker;
