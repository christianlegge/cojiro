import React from "react";
import regions from "../utils/regions";

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
	return (
		<>
			<span className="block text-center text-xl lg:text-right lg:pr-2">
				{region}
			</span>
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
							className={`px-4 py-2 border-y-2 text-white lg:text-right lg:w-full border-2 lg:h-auto transition ${
								el === region
									? "font-semibold bg-zinc-500 scale-110 z-20 lg:translate-x-4"
									: "hover:bg-zinc-600 active:bg-zinc-800 bg-zinc-700 cursor-pointer hover:z-10 hover:scale-105 hover:lg:scale-100 hover:lg:translate-x-2"
							} lg:scale-100`}
							onClick={() => setRegion(el)}
						>
							{el}
						</div>
					))}
			</div>
		</>
	);
};

export default RegionList;
