import React from "react";
import Tooltip from "./Tooltip";

const CheckSquare = ({
	type,
	check,
	coords,
	displayName,
	checked,
	onClick,
}: {
	type: "locations" | "gossip_stones";
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
			className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2"
			style={{ ...coords }}
		>
			<div
				className={`w-full h-full bg-contain bg-center bg-no-repeat ${
					checked
						? "cursor-default" // bg-zinc-500"
						: "cursor-pointer" // bg-lime-500"
				}`}
				onClick={() => {
					if (!checked) onClick();
				}}
				// style={{
				// 	backgroundImage: `url(${
				// 		check.includes("GS")
				// 			? "/images/skulltula.png"
				// 			: check.includes("Freestanding PoH")
				// 			? "/images/heartpiecemodel.png"
				// 			: "/images/chest.png"
				// 	})`,
				// }}
			>
				<img
					className="object-contain w-full h-full"
					src={
						type === "gossip_stones"
							? "/images/gossip-stone.png"
							: check.includes("GS")
							? "/images/skulltula.png"
							: check.includes("Freestanding PoH")
							? "/images/heartpiecemodel.png"
							: "/images/chest.png"
					}
					alt=""
					style={
						checked
							? { opacity: 0.7 }
							: { filter: "drop-shadow(0px 0px 8px white)" }
					}
				/>
			</div>
		</Tooltip>
	);
};

export default CheckSquare;
