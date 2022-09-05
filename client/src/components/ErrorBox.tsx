import React from "react";

const ErrorBox = ({
	error,
	className,
}: {
	error: string | null;
	className?: string;
}) => {
	return (
		<div className={`bg-red-300 ${error ? "" : "hidden"} ${className}`}>
			{error || undefined}
		</div>
	);
};

export default ErrorBox;
