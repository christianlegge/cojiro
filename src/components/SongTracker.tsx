import React from "react";
import { formatFilename } from "../utils/filename";
import Tooltip from "./Tooltip";
import ItemIcon from "./ItemIcon";
import { useSetAtom } from "jotai";
import { regionAtom } from "../utils/atoms";
import songData from "../data/songs.json";

const SongTracker = ({
	items,
	itemLocations,
	className,
}: {
	items: string[];
	itemLocations: Record<string, string[]>;
	className: string;
}) => {
	const setRegion = useSetAtom(regionAtom);
	return (
		<div className={className}>
			{songData.songs.map((song) => (
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
							items.includes(song) && song in songData.warpSongs
								? "cursor-pointer"
								: "cursor-default"
						}`}
						has={items.includes(song)}
						alt={song}
						onClick={() => {
							if (
								items.includes(song) &&
								song in songData.warpSongs
							) {
								setRegion(
									songData.warpSongs[
										song as keyof typeof songData.warpSongs
									]
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
