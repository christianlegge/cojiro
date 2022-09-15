import React, { useRef, useState } from "react";
import hellSeed from "../data/OoTR_1198103_ZNN2QY0R2G_Spoilers.json";
import { trpc } from "../utils/trpc";
import regionObj, { getNonNoneLocations, getRegions } from "../utils/regions";

const locations = Object.keys(hellSeed.locations);
const amt = locations.length;
const regions = getRegions();
const nonNoneLocations = getNonNoneLocations();
const allStones = Object.keys(hellSeed.gossip_stones);

const CheckPosition = () => {
	const [region, setRegion] = useState(regions[1]);
	const [loc, setLoc] = useState(Object.keys(regionObj[region].locations)[0]);
	const [allChecks, setAllChecks] = useState<string[]>([]);
	const locsWithPosition = trpc.useQuery(["check.getAll"], {
		onSuccess: (data) => setAllChecks(data),
	});
	const locWithPosition = trpc.useQuery(["check.get", { location: loc }], {
		onSuccess(data) {
			if (!data) {
				setChild(true);
				setAdult(true);
				return;
			}
			setCurrentLeft(data.left);
			setCurrentTop(data.top);
			setChild(data.child);
			setAdult(data.adult);
		},
	});
	const setLocation = trpc.useMutation("check.set", {
		onSuccess(data, variables, context) {
			setAllChecks((prev) => [...prev, variables.location]);
			setCurrentLeft(variables.left);
			setCurrentTop(variables.top);
		},
	});
	const imageRef = useRef<HTMLImageElement>(null);

	const [child, setChild] = useState(true);
	const [adult, setAdult] = useState(true);

	const [currentLeft, setCurrentLeft] = useState(0);
	const [currentTop, setCurrentTop] = useState(0);

	const btnClasses = (selected: boolean, done: boolean) =>
		`w-full px-4 py=2 border rounded-lg ${done && "line-through"} ${
			selected ? "text-white bg-blue-500" : done && "text-zinc-400"
		}`;

	return (
		<div className="flex pt-1">
			<div className="grid grid-cols-2 flex-grow-0 flex-shrink-0 w-80">
				<div className="space-y-1">
					{regions
						.filter((el) => el !== "None")
						.map((el, idx) => {
							return (
								<button
									key={el}
									className={btnClasses(el === region, false)}
									onClick={() => {
										setRegion(el);
										setLoc(
											Object.keys(
												regionObj[el].locations
											)[0]
										);
									}}
								>
									{el}
								</button>
							);
						})}
				</div>
				<div className="space-y-1">
					{locations
						.filter((el) => el !== "Links Pocket")
						.filter((el) => !/Item \d\s*$/.test(el))
						.filter(
							(el) =>
								el in regionObj[region].locations ||
								!nonNoneLocations.includes(el)
						)
						.concat(allStones)
						.map((el, idx) => {
							return (
								<button
									key={el}
									className={
										btnClasses(
											el === loc,
											allChecks.includes(el)
										) +
										(el === allStones[0]
											? " border-t-8 border-t-black"
											: "")
									}
									onClick={() => setLoc(el)}
								>
									{el}
								</button>
							);
						})}
				</div>
			</div>
			<div className="flex flex-col">
				<div className="flex px-24">
					<h2 className="text-center text-xl mr-auto">{loc}</h2>
					<label htmlFor="child">child?</label>
					<input
						type="checkbox"
						name="child"
						id="child"
						className="mr-4"
						checked={child}
						onChange={(e) => setChild(e.target.checked)}
					/>
					<label htmlFor="adult">adult?</label>
					<input
						type="checkbox"
						name="adult"
						id="adult"
						checked={adult}
						onChange={(e) => setAdult(e.target.checked)}
					/>
				</div>
				<div className="relative">
					<img
						ref={imageRef}
						onClick={(e) => {
							let offset =
								imageRef.current!.getBoundingClientRect();
							let [x, y] = [
								e.pageX - (offset.left + window.scrollX),
								e.pageY - (offset.top + window.scrollY),
							];

							setLocation.mutate({
								location: loc,
								region: region,
								top: (100 * y) / offset.height,
								left: (100 * x) / offset.width,
								child,
								adult,
							});
						}}
						src={`/images/maps/${region}.jpg`}
						className="inline-block object-contain"
					/>
					{allChecks.includes(loc) && (
						<div
							style={{
								top: currentTop + "%",
								left: currentLeft + "%",
							}}
							className="absolute rounded-full border-8 ring-8 ring-offset-8 border-pink-400 -translate-x-1/2 -translate-y-1/2"
						></div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CheckPosition;
