import axios from "axios";
import React from "react";

const StartForm = ({
	playthroughSetter,
}: {
	playthroughSetter: (id: string | null) => void;
}) => {
	async function startPlaythrough() {
		let res = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/startPlaythrough`
		);
		localStorage.setItem("playthroughId", res.data.id);
		playthroughSetter(res.data.id);
		console.log(res.data.locations);
	}

	return (
		<div>
			<button onClick={startPlaythrough}>Start Playthrough</button>
		</div>
	);
};

export default StartForm;
