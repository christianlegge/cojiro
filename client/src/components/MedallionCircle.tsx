import React from "react";

const MedallionCircle = () => {
	const medallions = ["Light", "Forest", "Fire", "Water", "Spirit", "Shadow"];

	return (
		<div className="relative bg-black h-32 w-32 m-8 rounded-full">
			{medallions.map((medallion, idx) => {
				const angle = (2 * Math.PI * idx) / medallions.length;
				const [x, y] = [Math.sin(angle), Math.cos(angle)];
				const [top, left] = [
					`${(-y / 2 + 0.5) * 100}%`,
					`${(x / 2 + 0.5) * 100}%`,
				];
				console.log({ medallion, angle, x, y });
				return (
					<div
						key={medallion}
						className="absolute w-4 h-4 bg-green-400"
						style={{
							top,
							left,
						}}
					>
						{medallion}
					</div>
				);
			})}
		</div>
	);
};

export default MedallionCircle;
