import React from "react";

const QuitForm = ({
	playthroughSetter,
}: {
	playthroughSetter: (id: string) => void;
}) => {
	return (
		<div>
			<button
				className="p-2 bg-red-200 rounded-md m-2"
				onClick={() => {
					localStorage.removeItem("playthroughId");
					playthroughSetter("");
				}}
			>
				Quit
			</button>
		</div>
	);
};

export default QuitForm;
