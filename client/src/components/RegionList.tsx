import React from "react";
import regions from "../utils/regions";
import Tag from "./Tag";
import { formatFilename } from "../utils/filename";
import { useParams } from "react-router-dom";
import { usePlaythrough } from "../utils/trpc";

const RegionList = ({
	region,
	setRegion,
	age,
	setAge,
}: {
	region: string;
	setRegion: (r: string) => void;
	age: "child" | "adult";
	setAge: React.Dispatch<React.SetStateAction<"child" | "adult">>;
}) => {
	const { id } = useParams() as { id: string };
	const { data: playthrough, error, status } = usePlaythrough(id);

	if (!playthrough) {
		if (status === "loading") {
			return <div>Loading...</div>;
		} else {
			return (
				<div>
					Error in ItemTracker:{" "}
					{error ? error.message : "Unknown error"}
				</div>
			);
		}
	}

	const pathRegions = Object.keys(playthrough.known_paths);

	const bosses = {
		"Deku Tree": "Queen Gohma",
		"Dodongo's Cavern": "King Dodongo",
		"Jabu Jabu's Belly": "Barinade",
		"Forest Temple": "Phantom Ganon",
		"Fire Temple": "Volvagia",
		"Water Temple": "Morpha",
		"Shadow Temple": "Bongo Bongo",
		"Spirit Temple": "Twinrova",
	} as { [key: string]: string };
	const regionsWithMedallions = [
		"Deku Tree",
		"Dodongo's Cavern",
		"Jabu Jabu's Belly",
		"Forest Temple",
		"Fire Temple",
		"Water Temple",
		"Shadow Temple",
		"Spirit Temple",
	];
	const regionsWithBossKeys = [
		"Forest Temple",
		"Fire Temple",
		"Water Temple",
		"Shadow Temple",
		"Spirit Temple",
		"Ganon's Castle",
	];
	const regionsWithKeys = regionsWithBossKeys.concat([
		"Gerudo Training Ground",
		"Bottom of the Well",
		"Thieves' Hideout",
	]);
	return (
		<>
			<button
				onClick={() =>
					setAge((prev) => (prev === "adult" ? "child" : "adult"))
				}
			>
				Go to {age === "adult" ? "child" : "adult"}
			</button>
			<div className="flex flex-wrap lg:block">
				{Object.keys(regions)
					.filter((el) => regions[el][age])
					.map((el) => (
						<div
							key={el}
							className={`flex items-center gap-2 px-4 py-2 border-y-2 text-white lg:justify-end lg:w-full border-2 lg:h-auto transition ${
								el === region
									? "font-semibold bg-zinc-500 scale-110 z-20 lg:translate-x-4"
									: "hover:bg-zinc-600 active:bg-zinc-800 bg-zinc-700 cursor-pointer hover:z-10 hover:scale-105 hover:lg:scale-100 hover:lg:translate-x-2"
							} lg:scale-100`}
							onClick={() => setRegion(el)}
						>
							{pathRegions.includes(el) && (
								<Tag text="PATH" color="midnightblue" />
							)}
							{playthrough.known_woth.includes(el) && (
								<Tag text="WOTH" color="darkgreen" />
							)}
							{playthrough.known_barren.includes(el) && (
								<Tag text="FOOL" color="firebrick" />
							)}
							<span>{el}</span>
							{regionsWithKeys.includes(el) && (
								<span>
									<img
										className="h-6 inline-block"
										src="/images/small-key.png"
									/>
									{
										playthrough.items.filter(
											(item) =>
												item === `Small Key (${el})`
										).length
									}
								</span>
							)}
							{regionsWithBossKeys.includes(el) && (
								<img
									className={`h-6 inline-block ${
										playthrough.items.includes(
											`Boss Key (${el})`
										)
											? "opacity-100"
											: "opacity-30"
									}`}
									src="/images/boss-key.png"
								/>
							)}

							{regionsWithMedallions.includes(el) && (
								<img
									className="h-6"
									src={`/images/${
										bosses[el] in
										playthrough.known_locations
											? formatFilename(
													playthrough.known_locations[
														bosses[el]
													]
											  )
											: "unknown-small"
									}.png`}
									alt=""
								/>
							)}
						</div>
					))}
			</div>
		</>
	);
};

export default RegionList;
