import React from "react";

const HintTracker = ({ hints }: { hints: string[] }) => {
	return (
		<div>
			<ul>
				{hints.map((el) => (
					<li key={el}>{el}</li>
				))}
			</ul>
		</div>
	);
};

export default HintTracker;
