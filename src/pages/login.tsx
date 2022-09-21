import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import TextInput from "../components/TextInput";

const LoginRegister = () => {
	return <div>Not implemented.</div>;
	const register = trpc.useMutation("user.register", {
		onError(error, variables, context) {
			console.log(error);
		},
	});
	const login = trpc.useMutation("user.login", {
		onSuccess(data, variables, context) {
			console.log(data);
		},
		onError(error, variables, context) {
			console.log(error);
		},
	});

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
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
	);
};

export default LoginRegister;
