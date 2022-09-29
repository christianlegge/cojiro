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
			className={`flex items-center gap-1 rounded-md border-2 border-red-700 bg-red-300 p-1 text-black ${
				error ? "" : "hidden"
			} ${className}`}
		>
			<MdErrorOutline className="h-full w-8" />
			{error || undefined}
		</div>
	);
};

export default ErrorBox;
