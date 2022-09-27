import React from "react";

const ItemIcon = ({
	className,
	src,
	has,
	alt,
}: {
	className?: string;
	src: string;
	has: boolean;
	alt: string;
}) => {
	return (
		<img
			className={`${className} ${has ? "opacity-100" : "opacity-40"}`}
			src={src}
			alt={alt}
		/>
	);
};

export default ItemIcon;
