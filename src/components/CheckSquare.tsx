import React from "react";
import Tooltip from "./Tooltip";
import { useBeatGanon, useCheckLocation, useCheckStone } from "../utils/trpc";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { idAtom, ageAtom } from "../utils/atoms";

const CheckSquare = ({
	type,
	check,
	coords,
	displayName,
	checked,
	item,
}: {
	type: "locations" | "gossip_stones";
	check: string;
	coords: { top: number | string; left: number | string };
	displayName: string;
	checked: boolean;
	item?: string;
}) => {
	const id = useAtomValue(idAtom);
	const checkLocation = useCheckLocation(id);
	const checkStone = useCheckStone(id);
	const setAge = useUpdateAtom(ageAtom);
	const beatGanon = useBeatGanon(id);
	return (
		<Tooltip
			content={
				<span
					className={`${
						checked ? "text-zinc-400 line-through font-normal" : ""
					}`}
				>
					{item ? `${displayName} (${item})` : displayName}
				</span>
			}
			className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2"
			style={{ ...coords }}
			showInfoIcon={item !== undefined}
		>
			<div
				className={`w-full h-full bg-contain bg-center bg-no-repeat ${
					checked
						? "cursor-default" // bg-zinc-500"
						: "cursor-pointer" // bg-lime-500"
				}`}
				onClick={() => {
					if (checked) {
						return;
					} else if (check === "Take Master Sword") {
						setAge("adult");
					} else if (check === "Place Master Sword") {
						setAge("child");
					} else if (check === "Ganon") {
						beatGanon();
					} else if (!checked) {
						if (type === "locations") {
							checkLocation(check);
						} else if (type === "gossip_stones") {
							checkStone(check);
						}
					}
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
							: {
									filter: "drop-shadow(0px 0px 8px white) drop-shadow(0px 0px 8px white)",
							  }
					}
				/>
			</div>
		</Tooltip>
	);
};

export default CheckSquare;
