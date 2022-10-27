import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

const LandingPage = () => {
	return (
		<Layout>
			<section className="flex h-[calc(100vh-5rem)] items-center justify-center bg-[url('/images/bg/cojiro.jpg')] bg-cover bg-center px-4 text-center lg:grid-cols-2">
				<div className=" grid place-items-center space-y-6 rounded-lg bg-gray-200 bg-opacity-60 p-4 backdrop-blur-lg">
					<h1 className="font-heading text-5xl font-bold xl:text-7xl">
						Route the game.
						<br />
						Flout the tedium.
					</h1>
					<p className="w-[65ch] text-zinc-800 xl:text-xl">
						Cojiro is the fastest way to learn the logic, practice
						routing, and beat seeds faster - all without loading up
						the game.
					</p>
					<Link href="/play">
						<button className="rounded-full bg-indigo-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-indigo-700 xl:px-8 xl:text-lg">
							Play now
						</button>
					</Link>
				</div>
				<div></div>
			</section>
			<section className="grid place-items-center space-y-2 p-4 text-center">
				<h1 className="font-heading text-3xl font-semibold">
					Why not just play the game?
				</h1>
				<p className="w-[65ch]">
					Cojiro is not and will never be a replacement for Ocarina of
					Time Randomizer. It doesn&apos;t help you with execution,
					but more importantly,{" "}
					<strong className="font-bold">
						it&apos;s just not as fun
					</strong>
					.
				</p>
				<p>
					Cojiro is a{" "}
					<strong className="font-bold">supplement</strong> for those
					who want to learn or improve faster than they otherwise
					might.
				</p>
				<h2 className="text-xl font-semibold">
					Here&apos;s why you might want to give Cojiro a shot:
				</h2>
				<ul className="text-left">
					<li>
						Seeing the checks on the map helps you{" "}
						<strong className="font-bold">learn</strong> the game
					</li>
					<li>
						Routing helps you{" "}
						<strong className="font-bold">get good</strong> at the
						game
					</li>
					<li>
						Using Cojiro to practice{" "}
						<strong className="font-bold">
							gets it done faster
						</strong>
					</li>
				</ul>
			</section>
			<section>
				<h1>Bigger and better</h1>
				<p>
					Cojiro is a green-field rewrite of a now-defunct web app
					called ZOoTR Sim. Cojiro aims for a much nicer user
					experience, using icons on a map rather than lists of names.
				</p>
				<p>On top of that, here are some future plans for Cojiro:</p>
				<ul className="grid grid-flow-col grid-rows-4">
					<li>Enforcing game logic based on your current items</li>
					<li>Detailed history of your playthrough</li>
					<li>Shopsanity and Master Quest support</li>
					<li>High score leaderboard</li>
					<li>Multiplayer challenges and multiworld support</li>
					<li>Entrance shuffle</li>
					<li>Achievements</li>
					<li>More...</li>
				</ul>
			</section>
			<section>
				<h1>Contribute</h1>
				<p>
					Cojiro is{" "}
					<a
						className="text-blue-500 underline"
						href="https://github.com/christianlegge/cojiro"
					>
						fully open source
					</a>
					, and community contributions are encouraged.
				</p>
				<p>
					It&apos;s built using the{" "}
					<a
						href="https://init.tips"
						className="text-blue-500 underline"
					>
						t3 stack
					</a>{" "}
					(React, NextJS, TypeScript, TailwindCSS, Prisma, tRPC), and
					care has been taken to make the codebase easy to work with
					for those familiar with the technologies.
				</p>
			</section>
		</Layout>
	);
};

export default LandingPage;
