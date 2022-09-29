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
			<div className="pointer-events-none absolute bottom-full right-0 z-[1000] order-last w-max max-w-[20rem] scale-0 rounded-md bg-zinc-900 p-2 font-semibold text-white transition duration-100 group-hover:scale-100">
				{content}
			</div>
			{children}
			{showInfoIcon && (
				<FcInfo className="pointer-events-none absolute bottom-0 right-0 h-6 w-6" />
			)}
		</div>
	);
};

export default Tooltip;
