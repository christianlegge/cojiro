import React, { CSSProperties, ReactNode } from "react";
import { FcInfo } from "react-icons/fc";

const Tooltip = ({
	children,
	content,
	className,
	style,
	showInfoIcon,
}: {
	children: ReactNode;
	content: ReactNode;
	className?: string;
	style?: CSSProperties;
	showInfoIcon?: boolean;
}) => {
	return (
		<div className={`${className} group hover:z-50`} style={style}>
			<div className="pointer-events-none bottom-full right-0 absolute w-max max-w-[20rem] font-semibold scale-0 group-hover:scale-100 text-white bg-zinc-900 p-2 rounded-md order-last transition duration-100 z-[1000]">
				{content}
			</div>
			{children}
			{showInfoIcon && (
				<FcInfo className="absolute bottom-0 right-0 w-6 h-6" />
			)}
		</div>
	);
};

export default Tooltip;
