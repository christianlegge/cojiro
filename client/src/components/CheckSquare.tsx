import React from "react";

const CheckSquare = ({
	check,
	coords,
	displayName,
	checked,
	onClick,
}: {
	check: string;
	coords: { top: number; left: number };
	displayName: string;
	checked: boolean;
	onClick: () => void;
}) => {
	return (
		<div
			className={`absolute w-8 h-8 ${
				checked
					? "cursor-default bg-zinc-500"
					: "cursor-pointer bg-lime-500"
			}`}
			style={{ ...coords }}
			onClick={() => {
				if (!checked) onClick();
			}}
		>
			{displayName}
		</div>
	);
};

export default CheckSquare;
