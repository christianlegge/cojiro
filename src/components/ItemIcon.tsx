import React from "react";

const ItemIcon = ({
	className,
	src,
	has,
	alt,
	onClick,
}: {
	className?: string;
	src: string;
	has: boolean;
	alt: string;
	onClick?: () => void;
}) => {
	return (
		<img
			className={`${className} ${has ? "opacity-100" : "opacity-40"}`}
			src={src}
			alt={alt}
			onClick={onClick}
		/>
	);
};

export default ItemIcon;
