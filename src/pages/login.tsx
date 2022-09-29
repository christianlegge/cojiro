import React from "react";
import Layout from "../components/Layout";
import { signIn } from "next-auth/react";
import { FaDiscord, FaGoogle, FaTwitch } from "react-icons/fa";

const textInputClasses = "p-2 w-full border text-lg rounded-lg";

const RegisterForm = () => {
	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors, isValid },
	// 	setError,
	// } = useForm({
	// 	mode: "all",
	// 	resolver: zodResolver(registerValidation),
	// });

	return <div>Unimplemented.</div>;

	// const usernameExists = trpc.useMutation("user.usernameExists", {
	// 	onSuccess(data) {
	// 		if (data) {
	// 			setError("username", { message: "Username already exists :(" });
	// 		}
	// 	},
	// });

	// const registerMutation = trpc.useMutation("user.register", {
	// 	onError(error, variables, context) {
	// 		console.log("error");
	// 		console.log(error.message);
	// 		if (error.data?.code === "CONFLICT") {
	// 			setError(error.message, {
	// 				message: `User with ${error.message} already exists`,
	// 			});
	// 		}
	// 	},
	// });

	// return (
	// 	<form
	// 		className="flex flex-col"
	// 		onSubmit={handleSubmit(({ email, username, password }) =>
	// 			registerMutation.mutate({ email, username, password })
	// 		)}
	// 	>
	// 		<div>
	// 			<label htmlFor="email">email</label>
	// 			<input
	// 				{...register("email")}
	// 				className={`${textInputClasses} ${
	// 					errors.email && "border-red-500"
	// 				}`}
	// 				type="text"
	// 				name="email"
	// 				id="email"
	// 				placeholder="email"
	// 			/>
	// 			<p
	// 				className={`text-sm ${
	// 					errors.email ? "visible" : "invisible"
	// 				}`}
	// 			>
	// 				{errors.email
	// 					? (errors.email.message as string)
	// 					: "No errors"}
	// 			</p>
	// 		</div>
	// 		<div>
	// 			<label htmlFor="username">username</label>
	// 			<input
	// 				{...register("username")}
	// 				className={`${textInputClasses} ${
	// 					errors.username && "border-red-500"
	// 				}`}
	// 				type="text"
	// 				name="username"
	// 				id="username"
	// 				placeholder="username"
	// 				onBlur={(e) => usernameExists.mutate(e.currentTarget.value)}
	// 			/>
	// 			<p
	// 				className={`text-sm ${
	// 					errors.username ? "visible" : "invisible"
	// 				}`}
	// 			>
	// 				{errors.username
	// 					? (errors.username.message as string)
	// 					: "No errors"}
	// 			</p>
	// 		</div>
	// 		<div>
	// 			<label htmlFor="password">password</label>
	// 			<input
	// 				{...register("password")}
	// 				className={`${textInputClasses} ${
	// 					errors.password && "border-red-500"
	// 				}`}
	// 				type="password"
	// 				name="password"
	// 				id="password"
	// 				placeholder="password"
	// 			/>
	// 			<p
	// 				className={`text-sm ${
	// 					errors.password ? "visible" : "invisible"
	// 				}`}
	// 			>
	// 				{errors.password
	// 					? (errors.password.message as string)
	// 					: "No errors"}
	// 			</p>
	// 		</div>

	// 		<button
	// 			className={`${
	// 				isValid ? "bg-indigo-700" : "cursor-default bg-zinc-500"
	// 			} w-full rounded-lg  text-white py-2 mt-4`}
	// 		>
	// 			submit
	// 		</button>
	// 	</form>
	// );
};

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
					onClick={() => signIn("google", { callbackUrl: "/play" })}
					className={`${signInButtonClasses} bg-orange-700`}
				>
					<FaGoogle />
					Sign in with Google
				</button>
				<button
					onClick={() => signIn("twitch", { callbackUrl: "/play" })}
					className={`${signInButtonClasses} bg-twitchpurple`}
				>
					<FaTwitch />
					Sign in with Twitch
				</button>
				<button
					onClick={() => signIn("discord", { callbackUrl: "/play" })}
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
