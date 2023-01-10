import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import {
	FaTwitter,
	FaTwitch,
	FaGithub,
	FaLinkedin,
	FaDiscord,
} from "react-icons/fa";

const LandingPage = () => {
	return (
		<Layout mainClass="text-xl">
			<section className="flex h-[calc(100vh-5rem)] items-center justify-center bg-[url('/images/bg/cojiro.jpg')] bg-cover bg-fixed bg-center px-4 text-center lg:grid-cols-2">
				<div className=" grid place-items-center space-y-6 rounded-lg bg-gray-200 bg-opacity-60 p-4 backdrop-blur-lg">
					<h1 className="font-heading text-5xl font-bold xl:text-7xl">
						Route the game.
						<br />
						Flout the tedium.
					</h1>
					<p className="w-[65ch] text-zinc-800 xl:text-xl">
						Cojiro is the fastest way to learn the logic, practice
						routing, and beat seeds faster -<br />
						all without loading up the game.
					</p>
					<Link href="/play">
						<button className="rounded-full bg-indigo-700 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-indigo-700 xl:px-8 xl:text-lg">
							Play now
						</button>
					</Link>
				</div>
				<div></div>
			</section>
			<section className="grid place-items-center space-y-2 bg-blue-100 py-8">
				<h1 className="font-heading text-3xl font-semibold">
					Why not just play the game?
				</h1>
				<p className="w-[65ch]">
					Cojiro is not and will never be a replacement for Ocarina of
					Time Randomizer.
					<br />
					It doesn&apos;t help you with execution, but more
					importantly,{" "}
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
				<ul
					className="pb-2 text-left"
					style={{ listStyleImage: "url('images/cojiro.png')" }}
				>
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
				<p>
					You can also play just for fun, if you want. We don&apos;t
					discriminate.
				</p>
			</section>
			<section className="grid place-items-center space-y-2 py-8">
				<h1 className="font-heading text-3xl font-semibold">
					Bigger and better
				</h1>
				<p className="w-[65ch]">
					Cojiro is a green-field rewrite of a now-defunct web app
					called ZOoTR Sim. Cojiro aims for a much nicer user
					experience, using icons on a map rather than lists of names.
				</p>
				<p>On top of that, here are some future plans for Cojiro:</p>
				<ul
					className="grid grid-flow-col grid-rows-4 gap-x-12"
					style={{ listStyleImage: "url('images/cojiro.png')" }}
				>
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
			<section className="grid place-items-center space-y-2 bg-blue-100 py-8">
				<h1 className="font-heading text-3xl font-semibold">
					Contribute
				</h1>
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
				<p className="w-[65ch]">
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
			<section className="grid place-items-center space-y-2 py-8">
				<h1 className="font-heading text-3xl font-semibold">
					About the author
				</h1>
				<p className="w-[65ch]">
					Cojiro was made in large part by me, Christian Legge, also
					known as scatter, standing on the shoulders of the giants
					who created NextJS, the rest of the tech stack, and of
					course{" "}
					<a
						href="https://ootrandomizer.com/"
						className="text-blue-500 underline"
					>
						Ocarina of Time Randomizer
					</a>{" "}
					itself.
				</p>
				<p className="w-[65ch]">
					I&apos;m a software engineer, between jobs at the time of
					writing.
				</p>
				<p className="w-[65ch]">
					My socials are linked below. Feel free to reach out to me
					anywhere.
				</p>
				<div className="flex gap-4 pt-4">
					<a href="https://twitter.com/christian_legge">
						<FaTwitter className="h-12 w-12" />
					</a>
					<a href="https://github.com/christianlegge">
						<FaGithub className="h-12 w-12" />
					</a>
					<a href="https://www.twitch.tv/scatter">
						<FaTwitch className="h-12 w-12" />
					</a>
					<a href="https://discord.com/users/164133593331793921">
						<FaDiscord className="h-12 w-12" />
					</a>
					<a href="https://www.linkedin.com/in/christian-legge">
						<FaLinkedin className="h-12 w-12" />
					</a>
				</div>
			</section>
		</Layout>
	);
};

export default LandingPage;
