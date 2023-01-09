import React, { useEffect, useState } from "react";
import RegionList from "../../components/RegionList";
import LocationList from "../../components/LocationList";
import ItemTracker from "../../components/ItemTracker";
import QuestTracker from "../../components/QuestTracker";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useSetAtom } from "jotai";
import { idAtom, errorTextAtom, mapHeaderTextAtom } from "../../utils/atoms";
import { usePlaythrough, trpc } from "../../utils/trpc";
import SongTracker from "../../components/SongTracker";

const Trackers = ({
	items,
	knownLocations,
}: {
	items: string[];
	knownLocations: Record<string, string>;
}) => {
	const itemLocations = Object.keys(knownLocations).reduce(
		(a, v) => ({
			...a,
			[knownLocations[v]]: [...(a[knownLocations[v]] ?? []), v],
		}),
		{} as { [key: string]: string[] }
	);
	console.log(itemLocations);
	return (
		<div className="flex flex-col items-center justify-around gap-1 bg-gray-700 p-4 sm:flex-row md:gap-4 2xl:flex-col">
			<SongTracker
				items={items}
				itemLocations={itemLocations}
				className="grid grid-flow-row grid-cols-6 sm:grid-flow-col sm:grid-cols-1 sm:grid-rows-6 2xl:grid-flow-row 2xl:grid-cols-6 2xl:grid-rows-1"
			/>
			<ItemTracker items={items} itemLocations={itemLocations} />
			<QuestTracker items={items} itemLocations={itemLocations} />
		</div>
	);
};

const WinScreen = ({
	checked,
	locations,
	createdAt,
	finishedAt,
	closeWinScreen,
}: {
	checked: number;
	locations: number;
	createdAt: Date;
	finishedAt: Date;
	closeWinScreen: () => void;
}) => {
	const elapsedMs = finishedAt.getTime() - createdAt.getTime();
	const hours = Math.floor(elapsedMs / 1000 / 60 / 60);
	const minutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / 1000 / 60);
	const seconds = Math.floor((elapsedMs % (1000 * 60)) / 1000);
	const timeStr = `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	return (
		<div className="fixed top-0 z-[998] col-start-1 row-start-1 h-screen w-full bg-black bg-opacity-70 text-center text-white">
			<div className="grid h-full place-items-center">
				<div className="flex flex-col gap-4">
					<h2 className="text-6xl font-bold tracking-wide">
						You win!
					</h2>
					<span className="text-xl">
						Locations checked: {checked}/{locations}
					</span>
					<span className="text-xl">Total time: {timeStr}</span>
					<button
						className="text-xl font-semibold underline"
						onClick={() => closeWinScreen()}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

const Cojiro = () => {
	const router = useRouter();
	const { id } = router.query;
	const [winScreenOpen, setWinScreenOpen] = useState(true);
	const setId = useSetAtom(idAtom);
	const setErrorText = useSetAtom(errorTextAtom);
	const setMapHeaderText = useSetAtom(mapHeaderTextAtom);
	const { data: playthrough, isLoading } = usePlaythrough(id as string);
	const queryClient = trpc.useContext();
	const { mutate: checkLocation, isLoading: checkIsLoading } =
		trpc.useMutation("playthrough.checkLocation", {
			onSuccess: ({ checked, item, known_locations }) => {
				queryClient.setQueryData(
					["playthrough.get", { id: id as string }],
					(old: any) => {
						if (!old) {
							return undefined;
						}
						return {
							...old,
							checked: [...old.checked, checked],
							items: item ? [...old.items, item] : old.items,
							known_locations,
						};
					}
				);
				setErrorText("");

				setMapHeaderText(`${checked}: ${item}`);
			},
			onError: (err) => {
				setErrorText(err.message);
				queryClient.invalidateQueries(["playthrough.get"]);
			},
		});

	useEffect(() => {
		setErrorText("");
	}, [id]);

	useEffect(() => {
		if (
			id &&
			playthrough &&
			!isLoading &&
			!checkIsLoading &&
			!playthrough.checked.includes("Links Pocket")
		) {
			checkLocation({
				id: id as string,
				location: "Links Pocket",
			});
		}
	}, [id, isLoading, checkIsLoading]);

	if (!id || !playthrough || isLoading) {
		if (isLoading) {
			return <div>Loading...</div>;
		} else {
			return <div>Unknown error in Cojiro component.</div>;
		}
	}
	setId(id as string);

	return (
		<Layout noHeader>
			<div className="grid min-h-full bg-black">
				{playthrough.finished && winScreenOpen && (
					<WinScreen
						checked={
							playthrough.checked.filter((el) =>
								playthrough.locations.includes(el)
							).length
						}
						locations={playthrough.locations.length}
						createdAt={playthrough.createdAt}
						finishedAt={playthrough.finishedAt}
						closeWinScreen={() => setWinScreenOpen(false)}
					/>
				)}
				<div
					className="col-start-1 row-start-1 flex flex-col lg:flex-row"
					style={{ imageRendering: "crisp-edges" }}
				>
					<div className="z-10 w-full flex-shrink-0 border-b-2 lg:w-80 lg:border-r-2 lg:border-b-0">
						<RegionList />
					</div>
					<div className="flex flex-grow flex-col 2xl:flex-row">
						<div className="relative h-full flex-grow basis-0 lg:col-span-2 xl:col-span-1 xl:row-span-2">
							<LocationList />
						</div>

						<Trackers
							items={playthrough.items}
							knownLocations={playthrough.known_locations}
						/>

						{/* <HintTracker /> */}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Cojiro;
