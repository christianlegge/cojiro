import React from "react";
import regions from "../helpers/regions";

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
			<span className="block text-center text-xl xl:text-right xl:pr-2">
				{region}
			</span>
			<button
				onClick={() =>
					setAge((prev) => (prev === "adult" ? "child" : "adult"))
				}
			>
				Go to {age === "adult" ? "child" : "adult"}
			</button>
			<div className="flex flex-wrap xl:block">
				{Object.keys(regions)
					.filter((el) => regions[el][age])
					.map((el) => (
						<div
							key={el}
							className={`p-2 border-y-2   text-white xl:text-right xl:w-full w-32 h-32 border-2 xl:h-auto ${
								el === region
									? "bg-gray-400"
									: "hover:bg-gray-600 active:bg-gray-800 bg-gray-700 cursor-pointer"
							}`}
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
