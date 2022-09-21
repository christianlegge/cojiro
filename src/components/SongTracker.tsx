import React from "react";
import { formatFilename } from "../utils/filename";
import Tooltip from "./Tooltip";
import ItemIcon from "./ItemIcon";

const songs = [
	"Zeldas Lullaby",
	"Eponas Song",
	"Sarias Song",
	"Suns Song",
	"Song of Time",
	"Song of Storms",
	"Minuet of Forest",
	"Bolero of Fire",
	"Serenade of Water",
	"Requiem of Spirit",
	"Nocturne of Shadow",
	"Prelude of Light",
];

const SongTracker = ({ items }: { items: string[] }) => {
	return (
		<div className="grid grid-cols-6">
			{songs.map((song) => (
				<Tooltip
					key={song}
					content={song}
					className="relative w-12 h-12"
				>
					<ItemIcon
						src={`/images/${formatFilename(song)}.png`}
						className="w-full h-full"
						has={items.includes(song)}
						alt={song}
					/>
				</Tooltip>
			))}
		</div>
	);
};

export default SongTracker;
