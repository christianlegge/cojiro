import React, { useState } from "react";

const LeftRightSwitch = ({
	left,
	right,
	leftCallback,
	rightCallback,
}: // selected,
{
	left: string;
	right: string;
	leftCallback: () => void;
	rightCallback: () => void;
}) => {
	const [selected, setSelected] = useState<"left" | "right">("left");
	const sharedClasses = "px-4 py-1 border w-max shadow-md transition";
	const unselectedClasses = "cursor-pointer border-zinc-400";
	const selectedClasses =
		"cursor-default shadow-none translate-y-0.5 border-zinc-700 bg-blue-500 text-white";
	return (
		<div className="grid h-fit w-max grid-cols-2">
			<button
				onClick={() => {
					setSelected("left");
					leftCallback();
				}}
				className={`${sharedClasses} ${
					selected === "left" ? selectedClasses : unselectedClasses
				}  rounded-l-lg`}
			>
				{left}
			</button>
			<button
				onClick={() => {
					setSelected("right");
					rightCallback();
				}}
				className={`${sharedClasses} ${
					selected === "right" ? selectedClasses : unselectedClasses
				} rounded-r-lg`}
			>
				{right}
			</button>
		</div>
	);
};

export default LeftRightSwitch;
