import React, { useEffect, useState } from "react";
import RegionList from "../../components/RegionList";
import LocationList from "../../components/LocationList";
import ItemTracker from "../../components/ItemTracker";
import QuestTracker from "../../components/QuestTracker";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useUpdateAtom } from "jotai/utils";
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
		<div className="bg-gray-700 gap-1 md:gap-4 p-4 flex flex-col sm:flex-row 2xl:flex-col justify-around items-center">
			<SongTracker
				items={items}
				itemLocations={itemLocations}
				className="grid grid-cols-6 grid-flow-row sm:grid-rows-6 sm:grid-flow-col sm:grid-cols-1 2xl:grid-cols-6 2xl:grid-flow-row 2xl:grid-rows-1"
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
		<div className="fixed top-0 text-white text-center bg-black bg-opacity-70 w-full h-screen col-start-1 row-start-1 z-[998]">
			<div className="grid place-items-center h-full">
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
	const setId = useUpdateAtom(idAtom);
	const setErrorText = useUpdateAtom(errorTextAtom);
	const setMapHeaderText = useUpdateAtom(mapHeaderTextAtom);
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
		<Layout>
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
					className="flex flex-col lg:flex-row col-start-1 row-start-1"
					style={{ imageRendering: "crisp-edges" }}
				>
					<div className="w-full flex-shrink-0 lg:w-80 lg:border-r-2 lg:border-b-0 border-b-2 z-10">
						<RegionList />
					</div>
					<div className="flex-grow flex flex-col 2xl:flex-row">
						<div className="lg:col-span-2 xl:col-span-1 xl:row-span-2 relative flex-grow basis-0 h-full">
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
