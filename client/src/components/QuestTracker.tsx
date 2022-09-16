import React from "react";
import ItemIcon from "./ItemIcon";
import MedallionCircle from "./MedallionCircle";
import SongTracker from "./SongTracker";
import Tooltip from "./Tooltip";

function formatFilename(str: string): string {
	return str.toLowerCase().replaceAll(" ", "-");
}

const QuestTracker = ({ items }: { items: string[] }) => {
	const stones = ["Kokiri Emerald", "Goron Ruby", "Zora Sapphire"];
	return (
		<div className="grid grid-cols-[1fr_16rem]">
			<div>
				Skulltulas:{" "}
				{items.filter((el) => el === "Gold Skulltula Token").length}
			</div>
			<div className="row-span-2 pr-12 py-6">
				<MedallionCircle items={items} />
				<div className="flex justify-between gap-1 w-full mt-20">
					{stones.map((stone) => (
						<Tooltip
							key={stone}
							content={stone}
							className="w-12 h-12 relative"
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
