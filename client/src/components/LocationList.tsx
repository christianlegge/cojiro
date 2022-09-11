import React, { useContext, useState } from "react";
import regions from "../utils/regions";
import Playthrough from "../contexts/Playthrough";
import axios from "axios";

function locationDisplayName(name: string, region: string): string {
	if (name.startsWith(region)) {
		return name.slice(region.length);
	}
	if (/^[A-Z]+ /.test(name) || name.startsWith("Kak ")) {
		return name.slice(name.indexOf(" ") + 1);
	} else {
		return name;
	}
}

const LocationList = ({
	age,
	region,
	checked,
	setChecked,
	setItems,
	allLocations,
}: {
	age: "child" | "adult";
	region: string;
	checked: string[];
	setChecked: React.Dispatch<React.SetStateAction<string[]>>;
	setItems: React.Dispatch<React.SetStateAction<string[]>>;
	allLocations: string[];
}) => {
	const playthroughId = useContext(Playthrough);
	const [lastItem, setLastItem] = useState("");
	return (
		<>
			<span className="text-2xl mx-auto">{lastItem}</span>
			{/* <input
				type="text"
				name="item"
				id="item"
				className="border-2"
				ref={itemToAdd}
				onKeyDown={(e) => {
					if (e.key !== "Enter") return;
					setItems((prev) => [
						...prev,
						itemToAdd.current?.value as string,
					]);
				}}
			/>
			<button
				className="p-2 rounded bg-blue-300"
				onClick={async () => {
					let res = await axios.get(
						`${process.env.REACT_APP_SERVER_URL}/playthrough/getAllItems`,
						{
							params: {
								id: playthroughId,
							},
						}
					);
					if (res.status === 200) {
						setItems(res.data);
					}
				}}
			>
				Get all items
			</button> */}
			{/* <div
				style={{
					backgroundImage: `url('images/maps/${region}.jpg')`,
					backgroundSize: "contain",
					backgroundRepeat: "no-repeat",
				}}
				className="w-full h-full"
			></div> */}
			<img
				src={`images/maps/${region}.jpg`}
				alt=""
				className="object-contain mx-auto"
			/>
			<div className="w-8 h-8 bg-lime-500 absolute top-[51%] left-[50.5%]"></div>
			<div className="flex flex-wrap gap-2">
				{Object.keys(regions[region].locations)
					.filter(
						(el) => allLocations.includes(el) || el.includes("")
					)
					.map((el) => (
						<button
							className={`block rounded-md p-2 ${
								checked.includes(el)
									? "line-through cursor-default bg-gray-100 text-gray-500"
									: "shadow-md cursor-pointer bg-green-300 hover:bg-green-200 active:bg-green-400"
							}`}
							key={el}
							onClick={async () => {
								if (checked.includes(el)) {
									return;
								}
								let res = await axios.get(
									`${process.env.REACT_APP_SERVER_URL}/playthrough/checkLocation`,
									{
										params: {
											id: playthroughId,
											location: el,
										},
									}
								);
								if (res.status === 200) {
									setItems((items) => [...items, res.data]);
									setChecked([...checked, el]);
									setLastItem(res.data);
								}
							}}
						>
							{locationDisplayName(el, region)}
						</button>
					))}
			</div>
		</>
	);
};

export default LocationList;
