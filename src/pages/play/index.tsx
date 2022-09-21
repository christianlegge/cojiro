import React, { useEffect, useState } from "react";
import ErrorBox from "../../components/ErrorBox";
import TextInput from "../../components/TextInput";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
// import { Link, useNavigate } from "react-router-dom";
import LeftRightSwitch from "../../components/LeftRightSwitch";
import { useUpdateAtom } from "jotai/utils";
import { ageAtom, regionAtom } from "../../utils/atoms";

const settingsPresets: { [key: string]: string } = {
	"S5 Tournament":
		"AJTWXCHYKAA8KLAHJAASAECCWCHGLTDDAKAAJAEAC2AJSDGBLADLED7JKQUXEANKCAJAAYMASBFAB",
	"Scrub Tournament":
		"AJSWPCBSKAA8KLAHJAASAECCYCHGLTDDAKJ8S8A9BAJAEAC2AJSDGBLADLED7JKYUAJGKAABDAA7BANJBJ",
	"Co-op Tournament Season 2":
		"AASWWCHYKAA8RAHJAAAXECCYCHGLTDDAKJ8S8AAJAEAC2AJSDGBLADLED7JKQUXEANKAJAAWTASBFSA",
	"Standard Weekly (Latest)":
		"AJSWXCHYKAA8KLAHJAASAECCWCHGLTDDAKAAJAEAC2AJSDGBLADLED7JKQUXEANKCAJAAWVASBFAB",
	"DDR Weekly (2021-01-19)":
		"AJ2EXAHYKAA6MAAHJAAAAECCUCHGLTDDAKAAJAEAC2AJSDGBLAD8SC3JHLUVNFBAMCAASYAAYWAA",
	"Default / Beginner": "AJLSXCHYKASBJAAZNAAAANCUWCHGLTDDAAAAAKAAA4AAJUCA",
	"Easy Mode": "AJUWXCHYKAA83RABAAAAAECCWCHGLTDDAKJ8S8A9BAAANKAAA4HA2UCA",
	// "Multiworld Tournament Season 2":
	// 	"CJSWXCHYKAA8KRAHJAAAXECCYCHGLTDHAKJ8S8AAJAEAC2AJSDGBLAD5TC3JHLUVNFBSNCAUFNAAWXASBFSA",
	// "Hell Mode": "AJKSYCHYKSTBAAAZ6559HD7PXCHGLTDRAA29BAAASEGAE23S",
	Bingo: "AJ2AWCHYKASFKAAHJAAAANCUWCHGLTDDAKJ8S82TBASAWJG4TU6EMKA2UAAAWDASFFAA",
	League: "AASWXCHYKAA8KCAHJAAAAECCWCHGLTDDAKAAJAEAHADLED7JKQUXEANKAJ2AAJZAADLAC",
};

const StartForm = () => {
	// const navigate = useNavigate();
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [generating, setGenerating] = useState(false);
	const [selectedPreset, setSelectedPreset] = useState<string>("");
	const [seedType, setSeedType] = useState<"random" | "custom">("random");
	const [settingsType, setSettingsType] = useState<"preset" | "custom">(
		"preset"
	);
	const [seed, setSeed] = useState("");
	const [settings, setSettings] = useState("");
	const [jwt, setJwt] = useState<string | null>(null);
	const [ids, setIds] = useState<string[]>([]);

	const setAge = useUpdateAtom(ageAtom);
	const setRegion = useUpdateAtom(regionAtom);

	const getPlaythroughFromJwt = trpc.useQuery(
		[
			"jwt.getPlaythroughs",
			{
				token: jwt as string,
			},
		],
		{
			enabled: jwt !== null,
			onSuccess({ playthroughs, newToken }) {
				localStorage.setItem("playthroughsJwt", newToken);
				setIds(playthroughs);
			},
			onError(err) {
				localStorage.removeItem("playthroughsJwt");
				setJwt(null);
				setIds([]);
			},
		}
	);
	const addPlaythroughToJwt = trpc.useMutation("jwt.addPlaythrough", {
		onSuccess({ newToken }) {
			localStorage.setItem("playthroughsJwt", newToken);
		},
		onError(err) {
			console.log(err);
		},
	});
	const startMutation = trpc.useMutation("startPlaythrough", {
		onSuccess: ({ id }) => {
			addPlaythroughToJwt.mutate({
				token: jwt,
				playthroughId: id,
			});
			setAge("child");
			setRegion("Kokiri Forest");
			router.push(`/play/${id}`);
		},
		onSettled: () => setGenerating(false),
		onError: (err) => {
			setError(err.message);
			setSelectedPreset("");
		},
	});

	useEffect(() => {
		setJwt(localStorage.getItem("playthroughsJwt"));
	}, []);

	const startPlaythrough = (settingsString: string): void => {
		if (seedType === "custom" && !seed) {
			setSelectedPreset("");
			setError(
				'No seed given! Please type a seed or choose "Random seed".'
			);
			return;
		}

		if (settingsType === "custom" && !settings) {
			setSelectedPreset("");
			setError(
				'No settings given! Please type a settings string or disable "Use custom settings".'
			);
			return;
		}

		startMutation.mutate({
			seed: seedType === "custom" ? seed : undefined,
			settingsString: settingsString,
		});
		setError(null);
		setGenerating(true);
	};

	return (
		<div className="grid place-items-center pt-2 px-2 gap-4">
			<div className="grid grid-cols-3 gap-2">
				<div className="flex pl-4 justify-between items-center w-full gap-10 col-span-3">
					<h2 className="font-semibold text-2xl">Presets</h2>
					<div className="space-x-2">
						<label htmlFor="customSettings" className="">
							Use custom settings
						</label>
						<input
							checked={settingsType === "custom"}
							onChange={(e) =>
								setSettingsType(
									e.target.checked ? "custom" : "preset"
								)
							}
							type="checkbox"
							name="customSettings"
							id="customSettings"
						/>
					</div>
				</div>
				{Object.keys(settingsPresets).map((preset) => (
					<button
						disabled={generating || settingsType === "custom"}
						key={preset}
						className={`border px-4 py-2 rounded-lg shadow-md ${
							settingsType === "custom" ||
							(generating && preset !== selectedPreset)
								? "opacity-50"
								: ""
						} ${
							preset === selectedPreset
								? "shadow-none translate-y-1"
								: ""
						}`}
						onClick={() => {
							setSelectedPreset(preset);
							startPlaythrough(settingsPresets[preset]);
						}}
					>
						{generating && preset === selectedPreset ? (
							<>
								<span className="animate-spin inline-block mr-3">
									.
								</span>
								<span>Generating...</span>
							</>
						) : (
							preset
						)}
					</button>
				))}
			</div>
			{settingsType === "custom" && (
				<div className="flex gap-2">
					<TextInput
						name="settings"
						placeholder="settings"
						valueState={[settings, setSettings]}
						enterCallback={() => startPlaythrough(settings)}
					/>
					<button
						className={`px-8 border rounded-lg ${
							generating ? "translate-y-1" : "shadow-md"
						}`}
						onClick={() => startPlaythrough(settings)}
					>
						{generating ? (
							<>
								<span className="animate-spin inline-block mr-3">
									.
								</span>
								<span>Generating...</span>
							</>
						) : (
							"Submit"
						)}
					</button>
				</div>
			)}
			<div className="flex flex-wrap justify-center items-center">
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
			<button onClick={() => startMutation.mutate({ sampleSeed: true })}>
				Sample seed
			</button>
			<h2>In progress games</h2>
			<ul>
				{ids.length === 0 ? (
					<span>None!</span>
				) : (
					ids.map((el) => (
						<li key={el}>
							<Link href={`/play/${el}`}>{el}</Link>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default StartForm;
