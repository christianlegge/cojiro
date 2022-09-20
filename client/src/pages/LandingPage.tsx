import React from "react";

const LandingPage = () => {
	return (
		<>
			<section className="grid place-items-center pt-8 px-4">
				<div className="grid place-items-center">
					<h1 className="text-5xl font-bold text-center">
						Route the game.
						<br />
						Flout the tedium.
					</h1>
					<p className="w-[65ch] text-center text-zinc-500">
						ZOoTR Sim is the fastest way to learn the logic,
						practice routing, and beat seeds faster - all without
						loading up the game.
					</p>
					<button className="px-4 py-2 bg-indigo-700 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-md shadow-indigo-700">
						Play now
					</button>
				</div>
				<div>image</div>
			</section>
			<section>
				<h2 className="text-2xl font-semibold">
					Why not just play the game?
				</h2>
				<p>You can, and should! But:</p>
				<ul>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</section>
			<section></section>
		</>
	);
};

export default LandingPage;
