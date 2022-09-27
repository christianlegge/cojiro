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

const SongTracker = ({
	items,
	itemLocations,
}: {
	items: string[];
	itemLocations: Record<string, string[]>;
}) => {
	return (
		<div className="grid grid-rows-6 grid-flow-col 2xl:grid-cols-6 2xl:grid-flow-row 2xl:grid-rows-1">
			{songs.map((song) => (
				<Tooltip
					key={song}
					content={
						song in itemLocations
							? `${song} (${itemLocations[song]})`
							: song
					}
					className="relative w-16 h-16"
					showInfoIcon={song in itemLocations}
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
