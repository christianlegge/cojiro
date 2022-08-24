import React, { useEffect, useState } from "react";
import { getRegions } from "../helpers/regions";

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
			{getRegions().map((el) => (
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
