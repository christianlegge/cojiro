import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../../../server/server";
import { mapHeaderTextAtom, errorTextAtom } from "./atoms";
import { useAtom } from "jotai";

export const trpc = createReactQueryHooks<AppRouter>();

export const usePlaythrough = (id: string) =>
	trpc.useQuery(["playthrough.get", { id }]);

export const useCheckLocation = (id: string) => {
	const [mapHeaderText, setMapHeaderText] = useAtom(mapHeaderTextAtom);
	const [errorText, setErrorText] = useAtom(errorTextAtom);
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
	const [mapHeaderText, setMapHeaderText] = useAtom(mapHeaderTextAtom);
	const [errorText, setErrorText] = useAtom(errorTextAtom);
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
