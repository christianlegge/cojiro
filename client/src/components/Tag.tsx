import React from "react";

const Tag = ({ text, color }: { text: string; color?: string }) => {
	return (
		<div
			style={{ backgroundColor: color }}
			className="inline-block text-xs uppercase tracking-widest p-1 rounded-md"
		>
			{text}
		</div>
	);
};

export default Tag;
