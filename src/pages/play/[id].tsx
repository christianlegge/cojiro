import React, { useEffect } from "react";
import RegionList from "~/components/RegionList";
import LocationList from "~/components/LocationList";
import ItemTracker from "~/components/ItemTracker";
import QuestTracker from "~/components/QuestTracker";
import Layout from "~/components/Layout";
import { useRouter } from "next/router";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import { idAtom, errorTextAtom, winScreenOpenAtom } from "~/utils/atoms";
import { usePlaythrough, useDownloadLog, useCheckLocation } from "~/utils/api";
import SongTracker from "~/components/SongTracker";
import ErrorBox from "~/components/ErrorBox";

const Trackers = ({
	items,
	knownLocations,
}: {
	items: string[];
	knownLocations: Record<string, string>;
}) => {
	const itemLocations = Object.keys(knownLocations).reduce<
		Record<string, string[]>
	>(
		(a, v) => ({
			...a,
			[knownLocations[v]]: [...(a[knownLocations[v]] ?? []), v],
		}),
		{}
	);
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
	downloadLog,
}: {
	checked: number;
	locations: number;
	createdAt: Date;
	finishedAt: Date;
	closeWinScreen: () => void;
	downloadLog: () => void;
}) => {
	const elapsedMs = finishedAt.getTime() - createdAt.getTime();
	const hours = Math.floor(elapsedMs / 1000 / 60 / 60);
	const minutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / 1000 / 60);
	const seconds = Math.floor((elapsedMs % (1000 * 60)) / 1000);
	const timeStr = `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	const errorText = useAtomValue(errorTextAtom);

	return (
		<div className="fixed top-0 z-[998] col-start-1 row-start-1 h-screen w-full bg-black bg-opacity-70 text-center text-white">
			<div className="grid h-full place-items-center">
				<div className="flex flex-col gap-4">
					<h2 className="text-6xl font-bold tracking-wide">You win!</h2>
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
					<button
						className="text-xl font-semibold underline"
						onClick={() => downloadLog()}
					>
						Download log
					</button>
					<ErrorBox error={errorText} />
				</div>
			</div>
		</div>
	);
};

const Cojiro = () => {
	const router = useRouter();
	const { id } = router.query;
	const [winScreenOpen, setWinScreenOpen] = useAtom(winScreenOpenAtom);
	const setId = useSetAtom(idAtom);
	const setErrorText = useSetAtom(errorTextAtom);
	const { data: playthrough, isLoading } = usePlaythrough(id as string);
	const downloadLog = useDownloadLog(id as string);
	const { mutate: checkLocation, isLoading: checkIsLoading } = useCheckLocation(
		id as string
	);

	useEffect(() => {
		setErrorText("");
	}, [id, setErrorText]);

	useEffect(() => {
		if (
			id &&
			playthrough &&
			!isLoading &&
			!checkIsLoading &&
			!playthrough.checked.includes("Links Pocket")
		) {
			checkLocation("Links Pocket");
		}
	}, [id, isLoading, checkIsLoading, checkLocation, playthrough]);

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
						downloadLog={() => downloadLog()}
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
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Cojiro;
