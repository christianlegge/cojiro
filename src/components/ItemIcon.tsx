import React from "react";
import Image from "next/image";

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
		<Image
			width={0}
			height={0}
			sizes="100vw"
			className={`${className} ${has ? "opacity-100" : "opacity-40"}`}
			src={src}
			alt={alt}
			onClick={onClick}
		/>
	);
};

export default ItemIcon;
