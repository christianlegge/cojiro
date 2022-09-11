import React from "react";
import StartForm from "./StartForm";

const LandingPage = ({
	setPlaythroughId,
}: {
	setPlaythroughId: React.Dispatch<React.SetStateAction<string>>;
}) => {
	return <StartForm setPlaythroughId={setPlaythroughId} />;
};

export default LandingPage;
