/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";
import { useRouter } from "next/router";
import { mapHeaderTextAtom, errorTextAtom, fetchingAtom } from "./atoms";
import { useSetAtom } from "jotai";
import { saveAs } from "file-saver";

import { type AppRouter } from "~/server/api/root";

const getBaseUrl = () => {
	if (typeof window !== "undefined") return ""; // browser should use relative url
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

/** A set of type-safe react-query hooks for your tRPC API. */
export const api = createTRPCNext<AppRouter>({
	config() {
		return {
			/**
			 * Transformer used for data de-serialization from the server.
			 *
			 * @see https://trpc.io/docs/data-transformers
			 */
			transformer: superjson,

			/**
			 * Links used to determine request flow from client to server.
			 *
			 * @see https://trpc.io/docs/links
			 */
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === "development" ||
						(opts.direction === "down" && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		};
	},
	/**
	 * Whether tRPC should await queries when server rendering pages.
	 *
	 * @see https://trpc.io/docs/nextjs#ssr-boolean-default-false
	 */
	ssr: false,
});

export const usePlaythrough = (id: string) => {
	const router = useRouter();
	const setErrorText = useSetAtom(errorTextAtom);
	return api.playthrough.getPlaythrough.useQuery(
		{ id },
		{
			retry: false,
			onError(err) {
				setErrorText(err.message);
				void router.push("/play");
			},
		}
	);
};

export const useCheckLocation = (id: string) => {
	const setFetching = useSetAtom(fetchingAtom);
	const setMapHeaderText = useSetAtom(mapHeaderTextAtom);
	const setErrorText = useSetAtom(errorTextAtom);
	const utils = api.useUtils();

	const mutation = api.playthrough.checkLocation.useMutation({
		onMutate({ location }) {
			setFetching(true);
			utils.playthrough.getPlaythrough.setData({ id }, (old) => {
				if (!old) {
					return undefined;
				}
				return {
					...old,
					checked: [...old.checked, location],
				};
			});
		},
		onSuccess: ({ checked, item, known_locations }) => {
			utils.playthrough.getPlaythrough.setData({ id }, (old) => {
				if (!old) {
					return undefined;
				}
				return {
					...old,
					checked: [...old.checked, checked],
					items: item ? [...old.items, item] : old.items,
					known_locations,
				};
			});
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
		onError: (err) => {
			setErrorText(err.message);
			void utils.playthrough.getPlaythrough.invalidate({ id });
		},
		onSettled: () => {
			setFetching(false);
		},
	});
	return {
		mutate: (location: string) => mutation.mutate({ id, location }),
		isLoading: mutation.isLoading,
	};
};

export const useCheckStone = (id: string) => {
	const setFetching = useSetAtom(fetchingAtom);
	const setMapHeaderText = useSetAtom(mapHeaderTextAtom);
	const setErrorText = useSetAtom(errorTextAtom);
	const utils = api.useUtils();

	const mutation = api.playthrough.checkStone.useMutation({
		onMutate({ stone }) {
			setFetching(true);
			utils.playthrough.getPlaythrough.setData({ id }, (old) => {
				if (!old) {
					return undefined;
				}
				return {
					...old,
					checked: [...old.checked, stone],
				};
			});
		},
		onSuccess: ({
			text,
			type,
			checked,
			item,
			location,
			path_locations,
			region,
		}) => {
			utils.playthrough.getPlaythrough.setData({ id }, (old) => {
				if (!old) {
					return undefined;
				}
				if (type === "barren") {
					return {
						...old,
						checked: [...old.checked, checked],
						known_barren: [...old.known_barren, region!],
					};
				} else if (type === "woth") {
					return {
						...old,
						checked: [...old.checked, checked],
						known_woth: [...old.known_woth, region!],
					};
				} else if (type === "path") {
					return {
						...old,
						checked: [...old.checked, checked],
						known_paths: {
							...old.known_paths,
							[region!]: path_locations!,
						},
					};
				} else if (type === "item") {
					return {
						...old,
						checked: [...old.checked, checked],
						known_locations: {
							...old.known_locations,
							[location!]: item!,
						},
					};
				} else if (type === "junk") {
					return {
						...old,
						checked: [...old.checked, checked],
					};
				}
			});
			setErrorText("");
			setMapHeaderText(text);
		},
		onError: (err) => {
			setErrorText(err.message);
			void utils.playthrough.getPlaythrough.invalidate({ id });
		},
		onSettled: () => {
			setFetching(false);
		},
	});

	return (stone: string) => mutation.mutate({ id, stone });
};

export const useLightArrowsHint = (id: string) => {
	const setFetching = useSetAtom(fetchingAtom);
	const setMapHeaderText = useSetAtom(mapHeaderTextAtom);
	const setErrorText = useSetAtom(errorTextAtom);
	const utils = api.useUtils();

	const mutation = api.playthrough.checkLightArrowsHint.useMutation({
		onMutate() {
			setFetching(true);
			utils.playthrough.getPlaythrough.setData({ id }, (old) => {
				if (!old) {
					return undefined;
				}
				return {
					...old,
					checked: [...old.checked, "Light Arrows Hint"],
				};
			});
		},
		onSuccess: ({ message, region }) => {
			utils.playthrough.getPlaythrough.setData({ id }, (old) => {
				if (!old) {
					return undefined;
				}
				return {
					...old,
					checked: [...old.checked, "Light Arrows Hint"],
					known_locations: {
						...old.known_locations,
						[region]: "Light Arrows",
					},
				};
			});
			setErrorText("");
			setMapHeaderText(message);
		},
		onError: (err) => {
			setErrorText(err.message);
			void utils.playthrough.getPlaythrough.invalidate({ id });
		},
		onSettled: () => {
			setFetching(false);
		},
	});

	return () => mutation.mutate({ id });
};

export const useBeatGanon = (id: string) => {
	const utils = api.useUtils();
	const setErrorText = useSetAtom(errorTextAtom);

	const mutation = api.playthrough.beatGanon.useMutation({
		onSuccess() {
			void utils.playthrough.getPlaythrough.invalidate({ id });
			setErrorText("");
		},
		onError(err) {
			setErrorText(err.message);
		},
	});

	return () => mutation.mutate({ id });
};

export const useDownloadLog = (id: string) => {
	const setErrorText = useSetAtom(errorTextAtom);
	const utils = api.useUtils();
	return () =>
		utils.playthrough.downloadLog
			.fetch({ id })
			.then((data) => {
				const logBlob = new Blob([data.log], { type: "application/json" });
				saveAs(logBlob, `cojiro-log-${id}.json`);
				setErrorText("");
			})
			.catch((err: unknown) => {
				if (err !== null && typeof err === "object") {
					if ("message" in err && typeof err.message === "string") {
						setErrorText(err.message);
					} else {
						setErrorText(JSON.stringify(err));
					}
				} else {
					setErrorText("Unknown error");
				}
			});
};
/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
