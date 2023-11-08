import React, { useCallback, useState } from "react";
import regions from "../utils/regions";
import Tag from "./Tag";
import { formatFilename } from "../utils/filename";
import { usePlaythrough } from "../utils/trpc";
import { useAtom, useAtomValue } from "jotai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { idAtom, ageAtom, regionAtom } from "../utils/atoms";

const RegionList = () => {
	const id = useAtomValue(idAtom);
	const { data: playthrough, error, status } = usePlaythrough(id);
	const [age, setAge] = useAtom(ageAtom);
	const [region, setRegion] = useAtom(regionAtom);
	const [collapsed, setCollapsed] = useState(true);
	const smallKeyCount = useCallback(
		(dungeon: string) => {
			if (!playthrough) {
				return 0;
			}
			if (playthrough.items.includes(`Small Key Ring (${dungeon})`)) {
				return {
					"Forest Temple": 5,
					"Fire Temple": 8,
					"Water Temple": 6,
					"Shadow Temple": 5,
					"Spirit Temple": 5,
					"Ganon's Castle": 2,
					"Gerudo Training Ground": 9,
					"Bottom of the Well": 3,
					"Thieves Hideout": 4,
				}[dungeon];
			}
			return playthrough.items.filter(item => item === `Small Key (${dungeon})`)
				.length;
		},
		[playthrough]
	);

	if (!playthrough) {
		if (status === "loading") {
			return <div>Loading...</div>;
		} else {
			return (
				<div>
					Error in ItemTracker: {error ? error.message : "Unknown error"}
				</div>
			);
		}
	}

	const pathRegions = Object.keys(playthrough.known_paths);

	const bosses = {
		"Deku Tree": "Queen Gohma",
		"Dodongos Cavern": "King Dodongo",
		"Jabu Jabus Belly": "Barinade",
		"Forest Temple": "Phantom Ganon",
		"Fire Temple": "Volvagia",
		"Water Temple": "Morpha",
		"Shadow Temple": "Bongo Bongo",
		"Spirit Temple": "Twinrova",
	} as { [key: string]: string };
	const regionsWithMedallions = [
		"Deku Tree",
		"Dodongos Cavern",
		"Jabu Jabus Belly",
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
		"Thieves Hideout",
	]);

	return (
		<>
			<div
				className="flex cursor-pointer items-center justify-center gap-2 bg-black py-1 text-center text-2xl font-bold text-white lg:cursor-default"
				onClick={() => setCollapsed(prev => !prev)}
			>
				<span>{age === "child" ? "Child" : "Adult"} Link</span>
				<button className="lg:hidden">
					{collapsed ? <FiChevronDown /> : <FiChevronUp />}
				</button>
			</div>
			<div
				className={`auto-cols-auto grid-cols-2 bg-black sm:grid-cols-3 lg:grid-cols-1 ${
					collapsed ? "hidden" : "grid"
				} lg:grid`}
			>
				{Object.keys(regions)
					.filter(el => regions[el][age])
					.map(el => (
						<div
							key={el}
							className={`border-2 border-black bg-cover bg-center text-white transition lg:h-auto lg:w-full lg:justify-end ${
								el === region
									? "z-20 scale-110 bg-zinc-500 font-bold lg:translate-x-4"
									: "cursor-pointer bg-zinc-700 font-semibold hover:z-10 hover:scale-105 hover:bg-zinc-600 active:bg-zinc-800 hover:lg:translate-x-2 hover:lg:scale-100"
							} lg:scale-100`}
							onClick={() => setRegion(el)}
							style={{
								backgroundImage: `url('/images/bg/${formatFilename(el)}.png')`,
								textShadow:
									"-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
							}}
						>
							<div
								className={`flex h-full w-full items-center gap-2 px-4 py-1 lg:justify-end ${
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
								<span>{regions[el].name}</span>
								{regionsWithKeys.includes(el) && (
									<span>
										<img
											className="inline-block h-6"
											src="/images/small-key.png"
										/>
										{smallKeyCount(el)}
									</span>
								)}
								{regionsWithBossKeys.includes(el) && (
									<img
										className={`inline-block h-6 ${
											playthrough.items.includes(`Boss Key (${el})`)
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
											bosses[el] in playthrough.known_locations
												? formatFilename(
														playthrough.known_locations[bosses[el]]
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
