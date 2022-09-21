import React from "react";
import { useNavigate } from "react-router-dom";

const QuitForm = () => {
	const navigate = useNavigate();
	return (
		<div>
			<button
				className="p-2 bg-red-200 rounded-md m-2"
				onClick={() => {
					localStorage.removeItem("playthroughId");
					navigate("/play");
				}}
			>
				Quit
			</button>
		</div>
	);
};

export default QuitForm;
