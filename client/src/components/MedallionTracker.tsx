import React from "react";
import MedallionCircle from "./MedallionCircle";

const MedallionTracker = ({ items }: { items: string[] }) => {
	const medallions = ["Light", "Forest", "Fire", "Water", "Spirit", "Shadow"];
	return <MedallionCircle />;
};

export default MedallionTracker;
