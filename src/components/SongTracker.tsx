import React from "react";
import { formatFilename } from "../utils/filename";
import Tooltip from "./Tooltip";
import ItemIcon from "./ItemIcon";
import { useUpdateAtom } from "jotai/utils";
import { regionAtom } from "../utils/atoms";

const warpSongs = {
	"Minuet of Forest": "Sacred Forest Meadow",
	"Bolero of Fire": "Death Mountain Crater",
	"Serenade of Water": "Lake Hylia",
	"Requiem of Spirit": "Desert Colossus",
	"Nocturne of Shadow": "Graveyard",
	"Prelude of Light": "Temple of Time",
};

const songs = [
	"Zeldas Lullaby",
	"Eponas Song",
	"Sarias Song",
	"Suns Song",
	"Song of Time",
	"Song of Storms",
].concat(Object.keys(warpSongs));

const SongTracker = ({
	items,
	itemLocations,
	className,
}: {
	items: string[];
	itemLocations: Record<string, string[]>;
	className: string;
}) => {
	const setRegion = useUpdateAtom(regionAtom);
	return (
		<div className={className}>
			{songs.map((song) => (
				<Tooltip
					key={song}
					content={
						song in itemLocations
							? `${song} (${itemLocations[song]})`
							: song
					}
					className="relative h-16 w-16"
					showInfoIcon={song in itemLocations}
				>
					<ItemIcon
						src={`/images/${formatFilename(song)}.png`}
						className={`h-full w-full ${
							items.includes(song) && song in warpSongs
								? "cursor-pointer"
								: "cursor-default"
						}`}
						has={items.includes(song)}
						alt={song}
						onClick={() => {
							if (items.includes(song) && song in warpSongs) {
								setRegion(
									warpSongs[song as keyof typeof warpSongs]
								);
							}
						}}
					/>
				</Tooltip>
			))}
		</div>
	);
};

export default SongTracker;
