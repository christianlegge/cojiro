import React from "react";
import { formatFilename } from "../utils/filename";
import ItemIcon from "./ItemIcon";
import Tooltip from "./Tooltip";

const MedallionCircle = ({ items }: { items: string[] }) => {
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
			<div className="relative w-full aspect-square -translate-x-6">
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
							className="absolute w-12 h-12"
							style={{
								top,
								left,
							}}
							content={medallion}
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
