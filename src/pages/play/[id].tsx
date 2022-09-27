import React, { useState } from "react";
import RegionList from "../../components/RegionList";
import LocationList from "../../components/LocationList";
import ItemTracker from "../../components/ItemTracker";
import QuestTracker from "../../components/QuestTracker";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useUpdateAtom } from "jotai/utils";
import { idAtom, errorTextAtom } from "../../utils/atoms";
import { usePlaythrough } from "../../utils/trpc";
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
		<>
			<QuestTracker items={items} itemLocations={itemLocations} />
			<SongTracker items={items} itemLocations={itemLocations} />
			<ItemTracker items={items} itemLocations={itemLocations} />
		</>
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

const ZootrSim = () => {
	const router = useRouter();
	const { id } = router.query;
	const [winScreenOpen, setWinScreenOpen] = useState(true);
	const setId = useUpdateAtom(idAtom);
	const setErrorText = useUpdateAtom(errorTextAtom);
	const { data, isLoading } = usePlaythrough(id as string);
	if (!id || isLoading) {
		return <div>Loading...</div>;
	}
	setId(id as string);

	return (
		<Layout>
			<div className="grid min-h-full bg-black">
				{data?.finished && winScreenOpen && (
					<WinScreen
						checked={
							data.checked.filter((el) =>
								data.locations.includes(el)
							).length
						}
						locations={data.locations.length}
						createdAt={data.createdAt}
						finishedAt={data.finishedAt}
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

						<div className="bg-gray-700 gap-4 p-4 flex 2xl:flex-col justify-around items-center">
							<Trackers
								items={data ? data.items : []}
								knownLocations={
									data ? data.known_locations : {}
								}
							/>
						</div>
						{/* <HintTracker /> */}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ZootrSim;
