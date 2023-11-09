import React from "react";
import Layout from "../components/Layout";
import { signIn } from "next-auth/react";
import { FaDiscord, FaGoogle, FaTwitch } from "react-icons/fa";

const LoginRegister = () => {
	const signInButtonClasses =
		"w-full flex justify-center items-center gap-2 text-white font-semibold rounded-lg py-2";
	return (
		<Layout mainClass="p-2 bg-[url('/images/bg/kakariko-night.jpg')] bg-no-repeat bg-cover bg-center grid place-items-center">
			<div className="flex w-full max-w-lg flex-col gap-4 rounded-lg bg-zinc-300 bg-opacity-30 px-8 py-4 shadow-xl backdrop-blur">
				<h1 className="mb-4 text-center text-4xl font-bold text-white">
					Sign in to Cojiro
				</h1>
				<button
					onClick={() => void signIn("google", { callbackUrl: "/play" })}
					className={`${signInButtonClasses} bg-orange-700`}
				>
					<FaGoogle />
					Sign in with Google
				</button>
				<button
					onClick={() => void signIn("twitch", { callbackUrl: "/play" })}
					className={`${signInButtonClasses} bg-twitchpurple`}
				>
					<FaTwitch />
					Sign in with Twitch
				</button>
				<button
					onClick={() => void signIn("discord", { callbackUrl: "/play" })}
					className={`${signInButtonClasses} bg-discordblurple`}
				>
					<FaDiscord />
					Sign in with Discord
				</button>
			</div>
		</Layout>
	);
};

export default LoginRegister;
