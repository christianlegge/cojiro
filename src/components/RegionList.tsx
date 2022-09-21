import React from "react";
import regions from "../utils/regions";
import Tag from "./Tag";
import { formatFilename } from "../utils/filename";
import { usePlaythrough } from "../utils/trpc";
import { useAtom, useAtomValue } from "jotai";

import { idAtom, ageAtom, regionAtom } from "../utils/atoms";

const RegionList = () => {
	const id = useAtomValue(idAtom);
	const { data: playthrough, error, status } = usePlaythrough(id);
	const [age, setAge] = useAtom(ageAtom);
	const [region, setRegion] = useAtom(regionAtom);

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
			<div className="text-white bg-black text-center font-bold text-2xl py-1">
				{age === "child" ? "Child" : "Adult"} Link
			</div>
			<div className="grid auto-cols-auto grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 bg-black">
				{Object.keys(regions)
					.filter((el) => regions[el][age])
					.map((el) => (
						<div
							key={el}
							className={`border-black border-2 bg-cover bg-center text-white lg:justify-end lg:w-full lg:h-auto transition ${
								el === region
									? "font-bold bg-zinc-500 scale-110 z-20 lg:translate-x-4"
									: "font-semibold hover:bg-zinc-600 active:bg-zinc-800 bg-zinc-700 cursor-pointer hover:z-10 hover:scale-105 hover:lg:scale-100 hover:lg:translate-x-2"
							} lg:scale-100`}
							onClick={() => setRegion(el)}
							style={{
								backgroundImage: `url('/images/bg/${formatFilename(
									el
								)}.png')`,
								textShadow:
									"-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
							}}
						>
							<div
								className={`w-full h-full px-4 py-2 flex items-center gap-2 lg:justify-end ${
									el === region
										? "bg-zinc-400 bg-opacity-70"
										: "bg-zinc-800 bg-opacity-60"
								}`}
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
														playthrough
															.known_locations[
															bosses[el]
														]
												  )
												: "unknown-small"
										}.png`}
										alt=""
									/>
								)}
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default RegionList;
