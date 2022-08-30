import React from "react";

const itemGrid = [
	"Slingshot",
	"Bombs",
	"Bow",
	"Fire Arrows",
	"Din's Fire",
	"Zelda's Lullaby",
	"Minuet of Forest",
	"Wallet",
	"Boomerang",
	"Hookshot",
	"Light Arrows",
	"Farores Wind",
	"Epona's Song",
	"Bolero of Fire",
	"Bottle",
	"Lens of Truth",
	"Megaton Hammer",
	"Magic",
	"Nayru's Love",
	"Saria's Song",
	"Serenade of Water",
	"Sword",
	"Ocarina",
	"Iron Boots",
	"Strength",
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
		.replaceAll("'", "")}.png`;
}

const ItemTracker = ({ items }: { items: string[] }) => {
	return (
		<div
			className="bg-gray-700 p-2 grid grid-cols-7 gap-2 mx-auto"
			style={{ imageRendering: "crisp-edges" }}
		>
			{itemGrid.map((item) => (
				<div
					key={itemToImageFilename(item)}
					className="w-16 h-16 relative group"
				>
					<div className="top-10 absolute scale-0 group-hover:scale-100 text-white bg-gray-900 p-2 rounded-md order-last transition duration-100 z-10">
						{item}
					</div>
					<img
						className={`object-contain w-full h-full z-0 ${
							items.includes(item) ? "opacity-100" : "opacity-30"
						}`}
						src={itemToImageFilename(item)}
						alt={item}
						title={item}
					/>
				</div>
			))}
		</div>
	);
};

export default ItemTracker;
