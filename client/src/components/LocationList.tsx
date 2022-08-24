import React from "react";
import regions from "../helpers/regions";

const LocationList = ({ region }: { region: string }) => {
	return (
		<div>
			{Object.keys(regions[region].locations).map((el) => (
				<span className="block">{el}</span>
			))}
		</div>
	);
};

export default LocationList;
