import React, { useContext, useState } from "react";
import regions from "../helpers/regions";
import Playthrough from "../contexts/Playthrough";
import axios from "axios";

const LocationList = ({
	region,
	checked,
	setChecked,
	setItems,
}: {
	region: string;
	checked: string[];
	setChecked: React.Dispatch<React.SetStateAction<string[]>>;
	setItems: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
	const playthroughId = useContext(Playthrough);
	return (
		<div className="flex flex-wrap max-w-xl gap-2">
			{Object.keys(regions[region].locations).map((el) => (
				<button
					className={`block rounded-md p-2 ${
						checked.includes(el)
							? "line-through cursor-default bg-gray-100 text-gray-500"
							: "shadow-md cursor-pointer bg-green-200"
					}`}
					key={el}
					onClick={async () => {
						let res = await axios.get(
							`${process.env.REACT_APP_SERVER_URL}/checkLocation`,
							{ params: { id: playthroughId, location: el } }
						);
						if (res.status === 200) {
							setItems((items) => [...items, res.data]);
							setChecked([...checked, el]);
							console.log(checked);
						}
						console.log(res);
					}}
				>
					{el}
				</button>
			))}
		</div>
	);
};

export default LocationList;
