import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import TextInput from "../components/TextInput";
import Layout from "../components/Layout";
import { registerValidation } from "../server/common/form-validation";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const textInputClasses = "p-2 w-full border text-lg rounded-lg";

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

	const usernameExists = trpc.useMutation("user.usernameExists", {
		onSuccess(data) {
			if (data) {
				setError("username", { message: "Username already exists :(" });
			}
		},
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
					className={`${textInputClasses} ${
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
					className={`${textInputClasses} ${
						errors.username && "border-red-500"
					}`}
					type="text"
					name="username"
					id="username"
					placeholder="username"
					onBlur={(e) => usernameExists.mutate(e.currentTarget.value)}
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
					className={`${textInputClasses} ${
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
	return (
		<Layout>
			<RegisterForm />
		</Layout>
	);
};

export default LoginRegister;
