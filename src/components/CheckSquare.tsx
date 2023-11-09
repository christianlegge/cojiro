import React from "react";
import Tooltip from "./Tooltip";
import {
	useBeatGanon,
	useLightArrowsHint,
	useCheckLocation,
	useCheckStone,
} from "~/utils/api";
import { useAtomValue, useSetAtom } from "jotai";
import { idAtom, ageAtom, regionAtom, winScreenOpenAtom } from "../utils/atoms";
import { ImEnter } from "react-icons/im";
import songs from "../data/songs.json";
import Image from "next/image";

const checkImages = {
	"Take Master Sword": "tot-pedestal-sword.png",
	"Place Master Sword": "tot-pedestal.png",
	"Light Arrows Hint": "light-arrows.png",
	Ganon: "ganon.png",
	song: "prelude-of-light.png",
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
	const { mutate: checkLocation } = useCheckLocation(id);
	const checkStone = useCheckStone(id);
	const setAge = useSetAtom(ageAtom);
	const setRegion = useSetAtom(regionAtom);
	const checkLightArrowsHint = useLightArrowsHint(id);
	const beatGanon = useBeatGanon(id);
	const openWinScreen = useSetAtom(winScreenOpenAtom);
	return (
		<Tooltip
			content={
				<span
					className={`${
						checked ? "font-normal text-zinc-400 line-through" : ""
					}`}
				>
					{item ? `${displayName} (${item})` : displayName}
				</span>
			}
			className={`absolute ${
				bigChecks.includes(check) ? "h-20 w-20" : "h-8 w-8 lg:h-12 lg:w-12"
			} -translate-x-1/2 -translate-y-1/2`}
			style={{ ...coords }}
			showInfoIcon={item !== undefined}
		>
			<div
				className={`h-full w-full bg-contain bg-center bg-no-repeat ${
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
					} else if (check === "Light Arrows Hint") {
						checkLightArrowsHint();
					} else if (check === "Ganon") {
						openWinScreen(true);
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
						className="h-full w-full text-black"
						style={
							checked
								? { opacity: 0.7 }
								: {
										filter:
											"drop-shadow(0px 0px 8px white) drop-shadow(0px 0px 8px white)",
								  }
						}
					/>
				) : (
					<Image
						width={0}
						height={0}
						sizes="100vw"
						className="h-full w-full object-contain"
						src={`/images/${
							check in checkImages
								? checkImages[check as keyof typeof checkImages]
								: check in songs.songChecks
								? checkImages.song
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
						alt={check}
						style={
							checked
								? { opacity: 0.7 }
								: {
										filter:
											"drop-shadow(0px 0px 8px white) drop-shadow(0px 0px 8px white)",
								  }
						}
					/>
				)}
			</div>
		</Tooltip>
	);
};

export default CheckSquare;
