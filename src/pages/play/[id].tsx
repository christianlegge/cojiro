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
			<div className="grid">
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
					<div className="grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min flex-grow">
						<div className="xl:col-span-3 lg:col-span-2 relative">
							<LocationList />
						</div>
						<ItemTracker />
						<QuestTracker />
						{/* <HintTracker /> */}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ZootrSim;
