// src/utils/trpc.ts
import type { AppRouter } from "../server/router";
import { createReactQueryHooks } from "@trpc/react";
import type { inferProcedureOutput, inferProcedureInput } from "@trpc/server";
import { mapHeaderTextAtom, errorTextAtom } from "./atoms";
import { useUpdateAtom } from "jotai/utils";

export const trpc = createReactQueryHooks<AppRouter>();

/**
 * These are helper types to infer the input and output of query resolvers
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<
	TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferQueryInput<
	TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureInput<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferMutationOutput<
	TRouteKey extends keyof AppRouter["_def"]["mutations"]
> = inferProcedureOutput<AppRouter["_def"]["mutations"][TRouteKey]>;

export type inferMutationInput<
	TRouteKey extends keyof AppRouter["_def"]["mutations"]
> = inferProcedureInput<AppRouter["_def"]["mutations"][TRouteKey]>;

export const usePlaythrough = (id: string) =>
	trpc.useQuery(["playthrough.get", { id }]);

export const useCheckLocation = (id: string) => {
	const setMapHeaderText = useUpdateAtom(mapHeaderTextAtom);
	const setErrorText = useUpdateAtom(errorTextAtom);
	const playthrough = usePlaythrough(id);
	const mutation = trpc.useMutation("playthrough.checkLocation", {
		onSuccess: ({ checked, item }) => {
			playthrough.refetch();
			setErrorText("");
			if (/Check .* Dungeons/.test(checked)) {
				setMapHeaderText(
					`You inspect the altar and gain information about the sacred ${
						checked.includes("Stone") ? "stones" : "medallions"
					}...`
				);
			} else {
				setMapHeaderText(`${checked}: ${item}`);
			}
		},
		onError: (err) => setErrorText(err.message),
	});

	return (location: string) => mutation.mutate({ id, location });
};

export const useCheckStone = (id: string) => {
	const setMapHeaderText = useUpdateAtom(mapHeaderTextAtom);
	const setErrorText = useUpdateAtom(errorTextAtom);
	const playthrough = usePlaythrough(id);
	const mutation = trpc.useMutation("playthrough.checkStone", {
		onSuccess: ({ text }) => {
			playthrough.refetch();
			setErrorText("");
			setMapHeaderText(text);
		},
		onError: (err) => setErrorText(err.message),
	});

	return (stone: string) => mutation.mutate({ id, stone });
};
