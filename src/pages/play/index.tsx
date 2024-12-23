import React, { useEffect, useState } from "react";
import ErrorBox from "~/components/ErrorBox";
import TextInput from "~/components/TextInput";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Link from "next/link";
import LeftRightSwitch from "~/components/LeftRightSwitch";
import { useAtom } from "jotai";
import { useSetAtom } from "jotai";
import { ageAtom, regionAtom, errorTextAtom } from "~/utils/atoms";
import Layout from "~/components/Layout";
import { useSession } from "next-auth/react";
import { MdWarningAmber } from "react-icons/md";
import { formatFilename } from "~/utils/filename";
import Image from "next/image";
import settingsPresets from "~/server/external/apiSettingPresets";

const InProgressPlaythroughCard = ({
	medallions,
	startTime,
	checked,
	locations,
}: {
	medallions: string[];
	startTime: Date;
	checked: number;
	locations: number;
}) => {
	const seconds = (Date.now() - startTime.getTime()) / 1000;
	const rtf = new Intl.RelativeTimeFormat();
	const relTimeString =
		seconds < 60
			? rtf.format(-seconds, "second")
			: seconds < 60 * 60
			? rtf.format(-seconds / 60, "minute")
			: seconds < 60 * 60 * 24
			? rtf.format(-seconds / 60 / 60, "hour")
			: seconds < 60 * 60 * 24 * 7
			? rtf.format(-seconds / 60 / 60 / 24, "day")
			: seconds < 60 * 60 * 24 * 30
			? rtf.format(-seconds / 60 / 60 / 24 / 7, "week")
			: seconds < 60 * 60 * 24 * 365
			? rtf.format(-seconds / 60 / 60 / 24 / 30, "month")
			: rtf.format(-seconds / 60 / 60 / 24 / 365, "year");
	return (
		<div className="w-40 cursor-pointer rounded-lg border shadow-md">
			<div className="flex relative">
				{medallions.map((el) => (
					<Image
						objectFit="contain"
						key={el}
						width={0}
						height={0}
						className="h-full w-auto"
						sizes="100vw"
						src={`/images/${formatFilename(el)}.png`}
						alt={el}
					/>
				))}
			</div>

			{`${checked}/${locations}`}
			<br />
			{relTimeString}
		</div>
	);
};

const StartForm = () => {
	const router = useRouter();
	const [error, setError] = useAtom(errorTextAtom);
	const [generatingId, setGeneratingId] = useState<number | null>(null);
	const [generating, setGenerating] = useState(false);
	const [selectedPreset, setSelectedPreset] = useState<string>("");
	const [seedType, setSeedType] = useState<"random" | "custom">("random");
	// const [settingsType, setSettingsType] = useState<"preset" | "custom">(
	// 	"preset"
	// );
	const [seed, setSeed] = useState("");
	// const [settings, setSettings] = useState("");
	const [jwt, setJwt] = useState<string | null>(null);

	const setAge = useSetAtom(ageAtom);
	const setRegion = useSetAtom(regionAtom);

	const { status } = useSession();

	const jwtPlaythroughs = api.jwt.getPlaythroughs.useQuery(
		{
			token: jwt!,
		},
		{
			enabled: jwt !== null,
			onSuccess({ newToken }) {
				localStorage.setItem("playthroughsJwt", newToken);
			},
			onError(err) {
				console.error(err);
				localStorage.removeItem("playthroughsJwt");
				setJwt(null);
			},
		}
	);
	const addPlaythroughToJwt = api.jwt.addPlaythrough.useMutation({
		onSuccess({ newToken }) {
			localStorage.setItem("playthroughsJwt", newToken);
		},
		onError(err) {
			console.log(err);
		},
	});
	const seedGenMutation = api.playthrough.submitSeedGen.useMutation({
		onSuccess: (id: string) => {
			setGeneratingId(parseInt(id));
			setGenerating(true);
			setError("");
			startMutation.mutate({ id: parseInt(id) });
		},
	});
	const startMutation = api.playthrough.startPlaythrough.useMutation({
		onSuccess: ({ id, status: responseStatus }) => {
			if (responseStatus === 204) {
				setTimeout(() => startMutation.mutate({ id: generatingId! }), 5000);
				return;
			}
			if (status !== "authenticated") {
				addPlaythroughToJwt.mutate({
					token: jwt,
					playthroughId: id,
				});
			}
			setAge("child");
			setRegion("Kokiri Forest");
			setGenerating(false);
			setGeneratingId(null);
			void router.push(`/play/${id}`);
		},
		onError: (err) => {
			setError(err.message);
			setSelectedPreset("");
			setGenerating(false);
		},
	});
	const userPlaythroughs = api.user.getPlaythroughs.useQuery();

	useEffect(() => {
		setJwt(localStorage.getItem("playthroughsJwt"));
	}, []);

	const startPlaythrough = (
		settingsPreset: keyof typeof settingsPresets
	): void => {
		if (seedType === "custom" && !seed) {
			setSelectedPreset("");
			setError('No seed given! Please type a seed or choose "Random seed".');
			return;
		}

		// if (settingsType === "custom" && !settings) {
		// 	setSelectedPreset("");
		// 	setError(
		// 		'No settings given! Please type a settings string or disable "Use custom settings".'
		// 	);
		// 	return;
		// }

		seedGenMutation.mutate({
			seed: seedType === "custom" ? seed : undefined,
			settingsPreset: settingsPreset,
		});
	};

	const inProgressPlaythroughs = (
		jwtPlaythroughs.data?.playthroughs ?? []
	).concat(userPlaythroughs.data ?? []);

	return (
		<Layout>
			<div className="grid h-full place-items-center bg-[url('/images/bg/hyrule-field-mountain.png')] bg-cover bg-center">
				<div className="grid place-items-center gap-4 rounded-lg bg-gray-300 bg-opacity-50 p-4 px-2 pt-2 backdrop-blur-md">
					{status === "unauthenticated" && (
						<div className="flex w-[65ch] items-center justify-center gap-1 rounded-lg bg-amber-200 p-2">
							<MdWarningAmber className="w-8" />
							You are not signed in. You may play as a guest, but the game will
							be deleted after 3 days, will not be tracked for stats, and can be
							claimed by anyone with the URL.
						</div>
					)}
					<div className="mx-8 grid grid-cols-4 gap-2">
						<div className="col-span-4 flex w-full items-center justify-between gap-10 pl-4">
							<h2 className="text-2xl font-semibold">Presets</h2>
							<span>OoT Randomizer v7.1</span>
							{/*<div className="space-x-2">
								<label htmlFor="customSettings" className="">
									Use custom settings
								</label>
								<input
									checked={settingsType === "custom"}
									onChange={(e) =>
										setSettingsType(e.target.checked ? "custom" : "preset")
									}
									type="checkbox"
									name="customSettings"
									id="customSettings"
								/>
							</div>*/}
						</div>
						{Object.keys(settingsPresets).map((preset) => (
							<button
								// disabled={generating || settingsType === "custom"}
								disabled={generating}
								key={preset}
								className={`rounded-lg border px-4 py-2 shadow-md ${
									// settingsType === "custom" ||
									generating && preset !== selectedPreset ? "opacity-50" : ""
								} ${
									preset === selectedPreset ? "translate-y-1 shadow-none" : ""
								}`}
								onClick={() => {
									setSelectedPreset(preset);
									startPlaythrough(preset as keyof typeof settingsPresets);
								}}
							>
								{generating && preset === selectedPreset ? (
									<>
										<span className="mr-3 inline-block animate-spin">.</span>
										<span>Generating...</span>
									</>
								) : (
									preset
								)}
							</button>
						))}
					</div>
					{/*settingsType === "custom" && (
						<div className="flex gap-2">
							<TextInput
								name="settings"
								placeholder="settings"
								valueState={[settings, setSettings]}
								// enterCallback={() => startPlaythrough(settings)}
							/>
							<button
								className={`rounded-lg border px-8 ${
									generating ? "translate-y-1" : "shadow-md"
								}`}
								// onClick={() => startPlaythrough(settings)}
							>
								{generating ? (
									<>
										<span className="mr-3 inline-block animate-spin">.</span>
										<span>Generating...</span>
									</>
								) : (
									"Generate"
								)}
							</button>
						</div>
					)*/}
					<div className="flex flex-wrap items-center justify-center">
						<LeftRightSwitch
							left="Random seed"
							right="Custom seed"
							leftCallback={() => setSeedType("random")}
							rightCallback={() => setSeedType("custom")}
						/>
						{seedType === "custom" && (
							<TextInput
								name="seed"
								placeholder="seed"
								valueState={[seed, setSeed]}
							/>
						)}
					</div>
					<ErrorBox error={error} />
					<h2>In progress games</h2>
					<ul className="flex max-w-4xl flex-wrap justify-center gap-4">
						{inProgressPlaythroughs.length === 0 ? (
							<span>None!</span>
						) : (
							inProgressPlaythroughs.map((el) => (
								<Link key={el.id} href={`/play/${el.id}`}>
									<li>
										<InProgressPlaythroughCard
											medallions={el.medallions}
											startTime={el.startTime}
											checked={el.checked}
											locations={el.locations}
										/>
									</li>
								</Link>
							))
						)}
					</ul>
				</div>
			</div>
		</Layout>
	);
};

export default StartForm;
