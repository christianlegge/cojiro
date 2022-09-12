import React from "react";
import Tooltip from "./Tooltip";

const MedallionCircle = () => {
	const medallions = ["Light", "Forest", "Fire", "Water", "Spirit", "Shadow"];

	return (
		<div className="relative h-32 w-32 m-8">
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
						content={`${medallion} Medallion`}
					>
						<img
							className="w-full h-full object-contain"
							src={`/images/${medallion.toLowerCase()}-medallion.png`}
							alt=""
						/>
					</Tooltip>
				);
			})}
		</div>
	);
};

export default MedallionCircle;
