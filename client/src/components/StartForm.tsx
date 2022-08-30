import axios from "axios";
import React from "react";

const StartForm = ({
	setPlaythroughId,
	setLocations,
}: {
	setPlaythroughId: (id: string | null) => void;
	setLocations: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
	async function startPlaythrough() {
		let res = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/startPlaythrough`
		);
		localStorage.setItem("playthroughId", res.data.id);
		setPlaythroughId(res.data.id);
		setLocations(res.data.locations);
	}

	return (
		<div>
			<button
				className="p-4 rounded-md bg-blue-200"
				onClick={startPlaythrough}
			>
				Start Playthrough
			</button>
		</div>
	);
};

export default StartForm;
