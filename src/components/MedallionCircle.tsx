import React from "react";
import { formatFilename } from "../utils/filename";
import ItemIcon from "./ItemIcon";
import Tooltip from "./Tooltip";

const MedallionCircle = ({
	items,
	itemLocations,
}: {
	items: string[];
	itemLocations: { [key: string]: string[] };
}) => {
	const medallions = [
		"Light",
		"Forest",
		"Fire",
		"Water",
		"Spirit",
		"Shadow",
	].map((el) => `${el} Medallion`);

	return (
		<div className="px-4 mb-12">
			<div className="relative w-full aspect-square -translate-x-1/4">
				{medallions.map((medallion, idx) => {
					const angle = (2 * Math.PI * idx) / medallions.length;
					const [x, y] = [Math.sin(angle), Math.cos(angle)];
					const [top, left] = [
						`${(-y / 2 + 0.5) * 100}%`,
						`${(x / 2 + 0.5) * 100}%`,
					];
					return (
						<Tooltip
							key={medallion}
							className="absolute w-20 h-20"
							style={{
								top,
								left,
							}}
							content={
								medallion in itemLocations
									? `${medallion} (${itemLocations[medallion]})`
									: medallion
							}
							showInfoIcon={medallion in itemLocations}
						>
							<ItemIcon
								className="w-full h-full object-contain"
								src={`/images/${formatFilename(medallion)}.png`}
								alt={medallion}
								has={items.includes(medallion)}
							/>
						</Tooltip>
					);
				})}
			</div>
		</div>
	);
};

export default MedallionCircle;
