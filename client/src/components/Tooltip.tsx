import React, { CSSProperties, ReactNode } from "react";

const Tooltip = ({
	children,
	content,
	className,
	style,
}: {
	children: ReactNode;
	content: ReactNode;
	className?: string;
	style?: CSSProperties;
}) => {
	return (
		<div className={`${className} group`} style={style}>
			<div className="bottom-full absolute w-max font-semibold scale-0 group-hover:scale-100 text-white bg-zinc-900 p-2 rounded-md order-last transition duration-100 z-10">
				{content}
			</div>
			{children}
		</div>
	);
};

export default Tooltip;
