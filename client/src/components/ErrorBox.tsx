import React from "react";
import { MdErrorOutline } from "react-icons/md";

const ErrorBox = ({
	error,
	className,
}: {
	error: string | null;
	className?: string;
}) => {
	return (
		<div
			className={`flex items-center gap-1 text-black p-1 rounded-md border-2 border-red-700 bg-red-300 ${
				error ? "" : "hidden"
			} ${className}`}
		>
			<MdErrorOutline className="w-8 h-full" />
			{error || undefined}
		</div>
	);
};

export default ErrorBox;
