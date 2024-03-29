import React from "react";
import ItemIcon from "./ItemIcon";
import MedallionCircle from "./MedallionCircle";
import Tooltip from "./Tooltip";

function formatFilename(str: string): string {
	return str.toLowerCase().replaceAll(" ", "-");
}

const QuestTracker: React.FC<{
	items: string[];
	itemLocations: Record<string, string[]>;
}> = ({ items, itemLocations }) => {
	const stones = ["Kokiri Emerald", "Goron Ruby", "Zora Sapphire"];

	return (
		<div className="flex items-center gap-4">
			<div className="w-52">
				<MedallionCircle items={items} itemLocations={itemLocations} />
				<div className="mt-20 flex w-full justify-between gap-1">
					{stones.map((stone) => (
						<Tooltip
							key={stone}
							content={
								stone in itemLocations
									? `${stone} (${itemLocations[stone]!.toString()})`
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
			<div>
				<Tooltip content="Gold Skulltula Token" className="relative h-20 w-20">
					<ItemIcon
						src="/images/skulltula.png"
						alt="Gold Skulltula Token"
						has={items.includes("Gold Skulltula Token")}
						className="h-full w-full object-contain"
					/>
				</Tooltip>
				<p className="text-center text-3xl font-semibold text-white">
					{items.filter((item) => item === "Gold Skulltula Token").length}
				</p>
			</div>
		</div>
	);
};

export default QuestTracker;
