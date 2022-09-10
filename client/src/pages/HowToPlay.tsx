import React from "react";
import { trpc } from "../utils/trpc";

const HowToPlay = () => {
	const query = trpc.useQuery(["getSampleSeed"]);

	return <div>{query.data ? JSON.stringify(query.data) : "Loading..."}</div>;
};

export default HowToPlay;
