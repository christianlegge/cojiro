import React from "react";
import regions from "../utils/regions";
import Tag from "./Tag";

const RegionList = ({
	region,
	setRegion,
	age,
	setAge,
	items,
	woth,
	barren,
}: {
	region: string;
	setRegion: (r: string) => void;
	age: "child" | "adult";
	setAge: React.Dispatch<React.SetStateAction<"child" | "adult">>;
	items: string[];
	woth: string[];
	barren: string[];
}) => {
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
							{woth.includes(el) && (
								<Tag text="WOTH" color="darkgreen" />
							)}
							{barren.includes(el) && (
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
										items.filter(
											(item) =>
												item === `Small Key (${el})`
										).length
									}
								</span>
							)}
							{regionsWithBossKeys.includes(el) && (
								<img
									className={`h-6 inline-block ${
										items.includes(`Boss Key (${el})`)
											? "opacity-100"
											: "opacity-30"
									}`}
									src="/images/boss-key.png"
								/>
							)}

							{regionsWithMedallions.includes(el) && (
								<img
									className="h-6"
									src="/images/unknown-small.png"
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
