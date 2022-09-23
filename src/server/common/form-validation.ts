import { z } from "zod";

const usernameValidator = z
	.string()
	.min(4, { message: "Username must be at least 4 characters" })
	.max(20, { message: "Username must be 20 characters or less" })
	.regex(/[A-Za-z0-9_]+/, {
		message: "Username must contain only letters, numbers, and underscores",
	});

const passwordValidator = z
	.string()
	.min(6, { message: "Password must be at least 6 characters" })
	.max(256, { message: "Password must be 256 characters or less" });

export const registerValidation = z.object({
	email: z.string().email({ message: "Invalid email" }),
	username: usernameValidator,
	password: passwordValidator,
});

export const loginValidation = z.object({
	username: usernameValidator,
	password: passwordValidator,
});
