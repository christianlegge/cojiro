import React from "react";

const ItemTracker = ({ items }: { items: string[] }) => {
	return (
		<div className="text-2xl border-2 w-64 h-64">
			<ul>
				{items.map((item, idx) => (
					<li key={idx}>{item}</li>
				))}
			</ul>
		</div>
	);
};

export default ItemTracker;
