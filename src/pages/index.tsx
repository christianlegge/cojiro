import React from "react";
import Layout from "../components/Layout";

const LandingPage = () => {
	return (
		<Layout>
			<section className="grid place-items-center bg-[url('/images/playing-hyrule-field.png')] bg-cover bg-center py-24 px-4 text-center lg:grid-cols-2 lg:text-left">
				<div className="grid place-items-center space-y-6 p-4 backdrop-opacity-0 lg:place-items-start">
					<h1 className="text-5xl font-bold xl:text-7xl">
						Route the game.
						<br />
						Flout the tedium.
					</h1>
					<p className="w-[65ch] text-zinc-800 xl:text-xl">
						Cojiro is the fastest way to learn the logic, practice
						routing, and beat seeds faster - all without loading up
						the game.
					</p>
					<button className="rounded-full bg-indigo-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-indigo-700 xl:px-8 xl:text-lg">
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
