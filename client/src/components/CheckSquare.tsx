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
			className={`absolute group w-8 h-8 ${
				checked
					? "cursor-default bg-zinc-500"
					: "cursor-pointer bg-lime-500"
			}`}
			style={{ ...coords }}
			onClick={() => {
				if (!checked) onClick();
			}}
		>
			<div
				className={`absolute bottom-full rounded-md bg-zinc-800 p-2 w-max h-auto scale-0 group-hover:scale-100 transition z-50 ${
					checked
						? "text-zinc-400 line-through"
						: "text-white font-semibold"
				}`}
			>
				{check}
			</div>
		</div>
	);
};

export default CheckSquare;
