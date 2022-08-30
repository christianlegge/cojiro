import axios from "axios";
import React from "react";
import TextInput from "./TextInput";

const StartForm = ({
	setPlaythroughId,
}: {
	setPlaythroughId: (id: string | null) => void;
}) => {
	async function startPlaythrough() {
		let res = await axios.get(
			`${process.env.REACT_APP_SERVER_URL}/startPlaythrough`
		);
		localStorage.setItem("playthroughId", res.data.id);
		setPlaythroughId(res.data.id);
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				startPlaythrough();
			}}
			className=""
		>
			<TextInput name="Seed" placeholder="leave blank for random" />
			<TextInput name="Settings" required />
			<input
				type="submit"
				className="p-4 rounded-md bg-blue-200"
				value="Generate"
			/>
		</form>
	);
};

export default StartForm;
