import React from "react";
import RegionList from "../../components/RegionList";
import LocationList from "../../components/LocationList";
import ItemTracker from "../../components/ItemTracker";
import QuestTracker from "../../components/QuestTracker";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useUpdateAtom } from "jotai/utils";
import { idAtom } from "../../utils/atoms";

const ZootrSim = () => {
	const router = useRouter();
	const { id } = router.query;
	const setId = useUpdateAtom(idAtom);
	if (!id) {
		return <div>Loading...</div>;
	}
	setId(id as string);

	return (
		<Layout>
			<div
				className="flex flex-col lg:flex-row"
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
		</Layout>
	);
};

export default ZootrSim;
