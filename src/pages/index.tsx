import React from "react";
import Layout from "../components/Layout";

const LandingPage = () => {
	return (
		<Layout>
			<section className="grid place-items-center py-24 px-4 lg:grid-cols-2 text-center lg:text-left bg-[url('/images/playing-hyrule-field.png')] bg-cover bg-center">
				<div className="grid place-items-center lg:place-items-start backdrop-opacity-0 space-y-6 p-4">
					<h1 className="text-5xl xl:text-7xl font-bold">
						Route the game.
						<br />
						Flout the tedium.
					</h1>
					<p className="w-[65ch] xl:text-xl text-zinc-800">
						ZOoTR Sim is the fastest way to learn the logic,
						practice routing, and beat seeds faster - all without
						loading up the game.
					</p>
					<button className="px-4 py-2 bg-indigo-700 text-white text-xs xl:text-lg xl:px-8 font-semibold uppercase tracking-wider rounded-full shadow-md shadow-indigo-700">
						Play now
					</button>
				</div>
				<div></div>
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
		</Layout>
	);
};

export default LandingPage;
