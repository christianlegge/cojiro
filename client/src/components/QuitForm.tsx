import React from "react";

const QuitForm = ({
	playthroughSetter,
}: {
	playthroughSetter: (id: string | null) => void;
}) => {
	return (
		<div>
			<button
				onClick={() => {
					localStorage.removeItem("playthroughId");
					playthroughSetter(null);
				}}
			>
				Quit
			</button>
		</div>
	);
};

export default QuitForm;
