import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import TextInput from "../components/TextInput";
import Layout from "../components/Layout";
import { registerValidation } from "../server/common/form-validation";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setError,
	} = useForm({
		mode: "all",
		resolver: zodResolver(registerValidation),
	});

	const registerMutation = trpc.useMutation("user.register", {
		onError(error, variables, context) {
			console.log("error");
			console.log(error.message);
			if (error.data?.code === "CONFLICT") {
				setError(error.message, {
					message: `User with ${error.message} already exists`,
				});
			}
		},
	});

	return (
		<form
			className="flex flex-col p-4"
			onSubmit={handleSubmit(({ email, username, password }) =>
				registerMutation.mutate({ email, username, password })
			)}
		>
			<div>
				<label htmlFor="email">email</label>
				<input
					{...register("email")}
					className={`${"p-2 w-full border text-lg rounded-lg"} ${
						errors.email && "border-red-500"
					}`}
					type="text"
					name="email"
					id="email"
					placeholder="email"
				/>
				<p
					className={`text-sm ${
						errors.email ? "visible" : "invisible"
					}`}
				>
					{errors.email
						? (errors.email.message as string)
						: "No errors"}
				</p>
			</div>
			<div>
				<label htmlFor="username">username</label>
				<input
					{...register("username")}
					className={`${"p-2 w-full border text-lg rounded-lg"} ${
						errors.username && "border-red-500"
					}`}
					type="text"
					name="username"
					id="username"
					placeholder="username"
				/>
				<p
					className={`text-sm ${
						errors.username ? "visible" : "invisible"
					}`}
				>
					{errors.username
						? (errors.username.message as string)
						: "No errors"}
				</p>
			</div>
			<div>
				<label htmlFor="password">password</label>
				<input
					{...register("password")}
					className={`${"p-2 w-full border text-lg rounded-lg"} ${
						errors.password && "border-red-500"
					}`}
					type="password"
					name="password"
					id="password"
					placeholder="password"
				/>
				<p
					className={`text-sm ${
						errors.password ? "visible" : "invisible"
					}`}
				>
					{errors.password
						? (errors.password.message as string)
						: "No errors"}
				</p>
			</div>

			<button
				className={`${
					isValid ? "bg-indigo-700" : "cursor-default bg-zinc-500"
				} w-full rounded-lg  text-white py-2 mt-4`}
			>
				submit
			</button>
		</form>
	);
};

const LoginRegister = () => {
	const login = trpc.useMutation("user.login", {
		onSuccess(data, variables, context) {
			console.log(data);
		},
		onError(error, variables, context) {
			console.log(error);
			console.log(context);
		},
	});
	const registerInputs = ["email", "username", "password"] as const;
	return (
		<Layout>
			<RegisterForm />
		</Layout>
	);

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<Layout>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					register.mutate({ email, username, password });
				}}
			>
				<TextInput
					type="email"
					name="email"
					valueState={[email, setEmail]}
					placeholder="email"
				/>
				<TextInput
					type="text"
					name="username"
					valueState={[username, setUsername]}
					placeholder="username"
				/>
				<TextInput
					type="password"
					name="password"
					valueState={[password, setPassword]}
					placeholder="password"
				/>
				<button>submit</button>
			</form>
		</Layout>
	);
};

export default LoginRegister;
