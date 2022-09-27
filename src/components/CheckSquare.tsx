import React from "react";
import Tooltip from "./Tooltip";
import { useBeatGanon, useCheckLocation, useCheckStone } from "../utils/trpc";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { idAtom, ageAtom, regionAtom } from "../utils/atoms";
import { ImEnter } from "react-icons/im";

const checkImages = {
	"Take Master Sword": "tot-pedestal-sword.png",
	"Place Master Sword": "tot-pedestal.png",
	Ganon: "ganon.png",
	gossip_stone: "gossip-stone.png",
	skulltula: "skulltula.png",
	piece_of_heart: "heartpiecemodel.png",
	small_key: "small-key.png",
	default: "chest.png",
};

const bigChecks = ["Take Master Sword", "Place Master Sword", "Ganon"];

const CheckSquare = ({
	type,
	check,
	coords,
	displayName,
	checked,
	item,
}: {
	type: "locations" | "gossip_stones" | "entrances";
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
	const setRegion = useUpdateAtom(regionAtom);
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
			className={`absolute ${
				bigChecks.includes(check)
					? "w-20 h-20"
					: "w-8 h-8 lg:w-12 lg:h-12"
			} -translate-x-1/2 -translate-y-1/2`}
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
					} else if (type === "entrances") {
						setRegion(check);
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
				{type === "entrances" ? (
					<ImEnter
						className="w-full h-full text-black"
						style={
							checked
								? { opacity: 0.7 }
								: {
										filter: "drop-shadow(0px 0px 8px white) drop-shadow(0px 0px 8px white)",
								  }
						}
					/>
				) : (
					<img
						className="object-contain w-full h-full"
						src={`/images/${
							check in checkImages
								? checkImages[check as keyof typeof checkImages]
								: type === "gossip_stones"
								? checkImages.gossip_stone
								: check.includes("GS")
								? checkImages.skulltula
								: check.includes("Freestanding PoH")
								? checkImages.piece_of_heart
								: check.includes("Freestanding Key")
								? checkImages.small_key
								: checkImages.default
						}`}
						alt=""
						style={
							checked
								? { opacity: 0.7 }
								: {
										filter: "drop-shadow(0px 0px 8px white) drop-shadow(0px 0px 8px white)",
								  }
						}
					/>
				)}
			</div>
		</Tooltip>
	);
};

export default CheckSquare;
