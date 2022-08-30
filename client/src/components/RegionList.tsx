import React from "react";
import regions from "../helpers/regions";

const RegionList = ({
	region,
	setRegion,
}: {
	region: string;
	setRegion: (r: string) => void;
}) => {
	return (
		<>
			<span className="block text-center text-xl xl:text-right xl:pr-2">
				{region}
			</span>
			<div className="flex flex-wrap xl:block">
				{Object.keys(regions).map((el) => (
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
