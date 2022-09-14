import React from "react";
import { trpc } from "../utils/trpc";

const LoginRegister = () => {
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

	return (
		<>
			<button
				onClick={() => {
					register.mutate({
						email: "hello@email.com",
						password: "mypassword",
						username: "scatter",
					});
				}}
			>
				register my awesome ass
			</button>
			<br />
			<button
				onClick={() => {
					login.mutate({
						password: "mypassword",
						username: "scatter",
					});
				}}
			>
				log me in hamachie
			</button>
		</>
	);
};

export default LoginRegister;
