import React from "react";
import Tooltip from "./Tooltip";

type TrackerItem = {
	fileName: string; // path to image file in public/images
	displayName: string; // string to display in tooltip/alt/title text
	itemName: string; // string to check items list for
};

const itemGrid = [
	"Slingshot",
	"Bomb Bag",
	"Bow",
	"Fire Arrows",
	"Dins Fire",
	"Zeldas Lullaby",
	"Minuet of Forest",
	"Wallet",
	"Boomerang",
	"Hookshot",
	"Light Arrows",
	"Farores Wind",
	"Eponas Song",
	"Bolero of Fire",
	"Bottle",
	"Lens of Truth",
	"Megaton Hammer",
	"Magic Meter",
	"Nayrus Love",
	"Sarias Song",
	"Serenade of Water",
	"Kokiri Sword",
	"Ocarina",
	"Iron Boots",
	"Strength Upgrade",
	"Stone of Agony",
	"Suns Song",
	"Requiem of Spirit",
	"Goron Tunic",
	"Zora Tunic",
	"Hover Boots",
	"Scale",
	"Child Trade",
	"Song of Time",
	"Nocturne of Shadow",
	"Deku Shield",
	"Hylian Shield",
	"Mirror Shield",
	"Bombchus",
	"Adult Trade",
	"Song of Storms",
	"Prelude of Light",
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
	for (let i = 0; i < tradeItems.length; i++) {
		if (items.includes(tradeItems[i])) {
			return {
				fileName: itemToImageFilename(tradeItems[i]),
				displayName: tradeItems[i],
				itemName: tradeItems[i],
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
	for (let i = 0; i < tradeItems.length; i++) {
		if (items.includes(tradeItems[i])) {
			return {
				fileName: itemToImageFilename(tradeItems[i]),
				displayName: tradeItems[i],
				itemName: tradeItems[i],
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
	let item = "Bottle";
	let nonRutoBottles = items.filter((el) => el.startsWith(item));
	let numNonRutoBottles = Math.min(3, nonRutoBottles.length);
	let hasRuto = items.includes("Rutos Letter");
	if (numNonRutoBottles === 0) {
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
	} else if (numNonRutoBottles === 1) {
		if (hasRuto) {
			return {
				fileName: itemToImageFilename("ruto-bottle2"),
				displayName: "Bottles (2) (Rutos Letter)",
				itemName: nonRutoBottles[0],
			};
		} else {
			return {
				fileName: itemToImageFilename(item),
				displayName: item,
				itemName: nonRutoBottles[0],
			};
		}
	} else {
		if (hasRuto) {
			return {
				fileName: itemToImageFilename(
					`ruto-bottle${numNonRutoBottles + 1}`
				),
				displayName: `Bottles (${
					numNonRutoBottles + 1
				}) (Rutos Letter)`,
				itemName: nonRutoBottles[0],
			};
		} else {
			return {
				fileName: itemToImageFilename(`bottle${numNonRutoBottles}`),
				displayName: `Bottles (${numNonRutoBottles})`,
				itemName: nonRutoBottles[0],
			};
		}
	}
}

function progressiveTrackerItem(
	item: string,
	items: string[],
	progression: string[]
): TrackerItem {
	let itemName = `Progressive ${item}`;
	let idx = Math.min(
		items.filter((el) => el === itemName).length,
		progression.length - 1
	);
	let displayName = progression[idx];
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
			let magicMeters = items.filter((el) => el === item).length;
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
			let ocarinas = ["Ocarina of Time", "Fairy Ocarina"];
			for (let i = 0; i < ocarinas.length; i++) {
				if (items.includes(ocarinas[i])) {
					return {
						fileName: itemToImageFilename(ocarinas[i]),
						displayName: ocarinas[i],
						itemName: ocarinas[i],
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

const ItemTracker = ({ items }: { items: string[] }) => {
	return (
		<div className="bg-gray-700 p-2 grid grid-cols-7 gap-2 mx-auto">
			{itemGrid.map((item) => {
				const trackerItem = createTrackerItem(item, items);
				return (
					<Tooltip
						key={trackerItem.fileName}
						className="w-16 h-16 relative"
						content={trackerItem.displayName}
					>
						<img
							className={`object-contain w-full h-full z-0 ${
								items.includes(trackerItem.itemName)
									? "opacity-100"
									: "opacity-30"
							}`}
							src={trackerItem.fileName}
							alt={trackerItem.displayName}
							title={trackerItem.displayName}
						/>
					</Tooltip>
				);
			})}
		</div>
	);
};

export default ItemTracker;
