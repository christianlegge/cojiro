import React from "react";

const Tag = ({ text, color }: { text: string; color?: string }) => {
	return (
		<div
			style={{ backgroundColor: color, textShadow: "0 0 0" }}
			className="inline-block rounded-md p-1 text-xs uppercase tracking-widest"
		>
			{text}
		</div>
	);
};

export default Tag;
