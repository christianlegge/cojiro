import React from "react";

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
	return `images/${item
		.toLowerCase()
		.replaceAll(" ", "-")
		.replaceAll("(", "")
		.replaceAll(")", "")
		.replaceAll("'", "")}.png`;
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
		<div
			className="bg-gray-700 p-2 grid grid-cols-7 gap-2 mx-auto"
			style={{ imageRendering: "crisp-edges" }}
		>
			{itemGrid.map((item) => {
				const trackerItem = createTrackerItem(item, items);
				return (
					<div
						key={trackerItem.fileName}
						className="w-16 h-16 relative group"
					>
						<div className="top-10 absolute scale-0 group-hover:scale-100 text-white bg-gray-900 p-2 rounded-md order-last transition duration-100 z-10">
							{trackerItem.displayName}
						</div>
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
					</div>
				);
			})}
		</div>
	);
};

export default ItemTracker;
