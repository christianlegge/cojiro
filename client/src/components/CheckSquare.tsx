import React from "react";
import Tooltip from "./Tooltip";

const CheckSquare = ({
	check,
	coords,
	displayName,
	checked,
	onClick,
}: {
	check: string;
	coords: { top: number | string; left: number | string };
	displayName: string;
	checked: boolean;
	onClick: () => void;
}) => {
	return (
		<Tooltip
			content={
				<span
					className={`${
						checked ? "text-zinc-400 line-through font-normal" : ""
					}`}
				>
					{check}
				</span>
			}
			className="absolute w-8 h-8"
			style={{ ...coords }}
		>
			<div
				className={`w-full h-full ${
					checked
						? "cursor-default bg-zinc-500"
						: "cursor-pointer bg-lime-500"
				}`}
				onClick={() => {
					if (!checked) onClick();
				}}
			></div>
		</Tooltip>
	);
};

export default CheckSquare;
