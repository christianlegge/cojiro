import React from "react";
import ItemIcon from "./ItemIcon";
import Tooltip from "./Tooltip";

interface TrackerItem {
	fileName: string; // path to image file in public/images
	displayName: string; // string to display in tooltip/alt/title text
	itemName: string; // string to check items list for
}

const itemGrid = [
	"Slingshot",
	"Bomb Bag",
	"Bow",
	"Fire Arrows",
	"Dins Fire",
	"Wallet",
	"Boomerang",
	"Hookshot",
	"Light Arrows",
	"Farores Wind",
	"Bottle",
	"Lens of Truth",
	"Megaton Hammer",
	"Magic Meter",
	"Nayrus Love",
	"Kokiri Sword",
	"Ocarina",
	"Iron Boots",
	"Strength Upgrade",
	"Stone of Agony",
	"Goron Tunic",
	"Zora Tunic",
	"Hover Boots",
	"Scale",
	"Child Trade",
	"Deku Shield",
	"Hylian Shield",
	"Mirror Shield",
	"Bombchus",
	"Adult Trade",
];

function itemToImageFilename(item: string): string {
	return `/images/${item
		.toLowerCase()
		.replaceAll(" ", "-")
		.replaceAll("(", "")
		.replaceAll(")", "")
		.replaceAll("'", "")}.png`;
}

function childTradeTrackerItem(items: string[]): TrackerItem {
	const tradeItems = [
		"Mask of Truth",
		"Bunny Hood",
		"Spooky Mask",
		"Skull Mask",
		"Keaton Mask",
		"Zeldas Letter",
		"Chicken",
		"Weird Egg",
	];
	for (const tradeItem of tradeItems) {
		if (items.includes(tradeItem)) {
			return {
				fileName: itemToImageFilename(tradeItem),
				displayName: tradeItem,
				itemName: tradeItem,
			};
		}
	}
	return {
		fileName: itemToImageFilename("Weird Egg"),
		itemName: "Weird Egg",
		displayName: "Child Trade",
	};
}

function adultTradeTrackerItem(items: string[]): TrackerItem {
	const tradeItems = [
		"Claim Check",
		"Eye Drops",
		"Eyeball Frog",
		"Prescription",
		"Broken Gorons Sword",
		"Poachers Saw",
		"Odd Potion",
		"Odd Mushroom",
		"Cojiro",
		"Pocket Cucco",
		"Pocket Egg",
	];
	for (const tradeItem of tradeItems) {
		if (items.includes(tradeItem)) {
			return {
				fileName: itemToImageFilename(tradeItem),
				displayName: tradeItem,
				itemName: tradeItem,
			};
		}
	}
	return {
		fileName: itemToImageFilename("Pocket Egg"),
		itemName: "Pocket Egg",
		displayName: "Adult Trade",
	};
}

function bottleTrackerItem(items: string[]): TrackerItem {
	const item = "Bottle";
	const nonRutoBottles = items.filter((el) => el.startsWith(item));
	const hasRuto = items.includes("Rutos Letter");
	if (nonRutoBottles.length === 0) {
		if (hasRuto) {
			return {
				fileName: itemToImageFilename("ruto-bottle"),
				displayName: "Rutos Letter",
				itemName: "Rutos Letter",
			};
		} else {
			return {
				fileName: itemToImageFilename(item),
				displayName: item,
				itemName: item,
			};
		}
	} else if (nonRutoBottles.length === 1) {
		if (hasRuto) {
			return {
				fileName: itemToImageFilename("ruto-bottle2"),
				displayName: "Bottles (2) (Rutos Letter)",
				itemName: nonRutoBottles[0]!,
			};
		} else {
			return {
				fileName: itemToImageFilename(item),
				displayName: item,
				itemName: nonRutoBottles[0]!,
			};
		}
	} else {
		if (hasRuto) {
			return {
				fileName: itemToImageFilename(
					`ruto-bottle${Math.min(nonRutoBottles.length, 3) + 1}`
				),
				displayName: `Bottles (${
					Math.min(nonRutoBottles.length, 3) + 1
				}) (Rutos Letter)`,
				itemName: nonRutoBottles[0]!,
			};
		} else {
			return {
				fileName: itemToImageFilename(
					`bottle${Math.min(nonRutoBottles.length, 3)}`
				),
				displayName: `Bottles (${nonRutoBottles.length})`,
				itemName: nonRutoBottles[0]!,
			};
		}
	}
}

function progressiveTrackerItem(
	item: string,
	items: string[],
	progression: string[]
): TrackerItem {
	const itemName = `Progressive ${item}`;
	const idx = Math.min(
		items.filter((el) => el === itemName).length,
		progression.length - 1
	);
	const displayName = progression[idx]!;
	return {
		fileName: itemToImageFilename(displayName),
		itemName,
		displayName,
	};
}

function createTrackerItem(item: string, items: string[]): TrackerItem {
	switch (item) {
		case "Child Trade":
			return childTradeTrackerItem(items);
		case "Adult Trade":
			return adultTradeTrackerItem(items);
		case "Wallet":
			return progressiveTrackerItem(item, items, [
				"Wallet",
				"Wallet (200)",
				"Wallet (500)",
				"Wallet (999)",
			]);
		case "Hookshot":
			return progressiveTrackerItem(item, items, [
				"Hookshot",
				"Hookshot",
				"Longshot",
			]);
		case "Strength Upgrade":
			return progressiveTrackerItem(item, items, [
				"Goron Bracelet",
				"Goron Bracelet",
				"Silver Gauntlets",
				"Golden Gauntlets",
			]);
		case "Scale":
			return progressiveTrackerItem(item, items, [
				"Silver Scale",
				"Silver Scale",
				"Golden Scale",
			]);
		case "Magic Meter":
			const magicMeters = items.filter((el) => el === item).length;
			let fileName = itemToImageFilename("magic");
			let displayName = "Magic";
			if (magicMeters >= 2) {
				fileName = itemToImageFilename("magic2");
				displayName = "Double Magic";
			}
			return {
				fileName,
				displayName,
				itemName: item,
			};
		case "Bottle":
			return bottleTrackerItem(items);
		case "Ocarina":
			const ocarinas = ["Ocarina of Time", "Fairy Ocarina"];
			for (const ocarina of ocarinas) {
				if (items.includes(ocarina)) {
					return {
						fileName: itemToImageFilename(ocarina),
						displayName: ocarina,
						itemName: ocarina,
					};
				}
			}
			return {
				fileName: itemToImageFilename("Fairy Ocarina"),
				displayName: "Ocarina",
				itemName: "Ocarina",
			};

		default:
			return {
				fileName: itemToImageFilename(item),
				displayName: item,
				itemName: item,
			};
	}
}

function getBottleTooltip(itemLocations: Record<string, string[]>): string {
	let tooltip = "Bottle";
	const knownBottles = Object.keys(itemLocations).filter(
		(item) => item.includes("Bottle") || item === "Rutos Letter"
	);
	if (knownBottles.length > 0) {
		const bottleLocations = knownBottles
			.map((item) => `${item}: ${itemLocations[item]!.toString()}`)
			.join(", ");
		tooltip = `${tooltip} (${bottleLocations})`;
	}
	return tooltip;
}

const ItemTracker: React.FC<{
	items: string[];
	itemLocations: Record<string, string[]>;
}> = ({ items, itemLocations }) => {
	return (
		<div className="grid grid-cols-5 gap-2">
			{itemGrid.map((item) => {
				const trackerItem = createTrackerItem(item, items);
				let tooltip = trackerItem.displayName;
				if (item === "Bottle") {
					tooltip = getBottleTooltip(itemLocations);
				} else if (trackerItem.itemName in itemLocations) {
					tooltip = `${tooltip} (${itemLocations[trackerItem.itemName]!.join(
						", "
					)})`;
				}
				const showInfoIcon =
					trackerItem.itemName in itemLocations ||
					(item === "Bottle" &&
						Object.keys(itemLocations).filter(
							(item) => item.includes("Bottle") || item === "Rutos Letter"
						).length > 0);
				return (
					<Tooltip
						key={trackerItem.fileName}
						className="relative h-16 w-16"
						content={tooltip}
						showInfoIcon={showInfoIcon}
					>
						<ItemIcon
							className="z-0 h-full w-full object-contain"
							src={trackerItem.fileName}
							alt={trackerItem.displayName}
							has={items.includes(trackerItem.itemName)}
						/>
					</Tooltip>
				);
			})}
		</div>
	);
};

export default ItemTracker;
