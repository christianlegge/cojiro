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
		<div>
			<span className="block text-center text-xl">{region}</span>
			{Object.keys(regions).map((el) => (
				<button
					key={el}
					className="block"
					onClick={() => setRegion(el)}
				>
					{el}
				</button>
			))}
		</div>
	);
};

export default RegionList;
