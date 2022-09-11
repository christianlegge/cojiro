import React, { useState } from "react";
import ErrorBox from "./ErrorBox";
import TextInput from "./TextInput";
import { trpc } from "../utils/trpc";

const settingsPresets: { [key: string]: string } = {
	"Settings Presets": "",
	"Default / Beginner": "AJLSXCHYKASBJAAZNAAAANCUWCHGLTDDAAAAAKAAA4AAJUCA",
	"Easy Mode": "AJUWXCHYKAA83RABAAAAAECCWCHGLTDDAKJ8S8A9BAAANKAAA4HA2UCA",
	"S5 Tournament":
		"AJTWXCHYKAA8KLAHJAASAECCWCHGLTDDAKAAJAEAC2AJSDGBLADLED7JKQUXEANKCAJAAYMASBFAB",
	"Standard Weekly (Latest)":
		"AJSWXCHYKAA8KLAHJAASAECCWCHGLTDDAKAAJAEAC2AJSDGBLADLED7JKQUXEANKCAJAAWVASBFAB",
	"DDR Weekly (2021-01-19)":
		"AJ2EXAHYKAA6MAAHJAAAAECCUCHGLTDDAKAAJAEAC2AJSDGBLAD8SC3JHLUVNFBAMCAASYAAYWAA",
	"Scrub Tournament":
		"AJSWPCBSKAA8KLAHJAASAECCYCHGLTDDAKJ8S8A9BAJAEAC2AJSDGBLADLED7JKYUAJGKAABDAA7BANJBJ",
	"Multiworld Tournament Season 2":
		"CJSWXCHYKAA8KRAHJAAAXECCYCHGLTDHAKJ8S8AAJAEAC2AJSDGBLAD5TC3JHLUVNFBSNCAUFNAAWXASBFSA",
	"Hell Mode": "AJKSYCHYKSTBAAAZ6559HD7PXCHGLTDRAA29BAAASEGAE23S",
	Bingo: "AJ2AWCHYKASFKAAHJAAAANCUWCHGLTDDAKJ8S82TBASAWJG4TU6EMKA2UAAAWDASFFAA",
	League: "AASWXCHYKAA8KCAHJAAAAECCWCHGLTDDAKAAJAEAHADLED7JKQUXEANKAJ2AAJZAADLAC",
	"Co-op Tournament Season 2":
		"AASWWCHYKAA8KRAHJAAAXECCYCHGLTDDAKJ8S8AAJAEAC2AJSDGBLADLED7JKQUXEANKAJAAWTASBFSA",
};

const StartForm = ({
	setPlaythroughId,
}: {
	setPlaythroughId: (id: string | null) => void;
}) => {
	const [error, setError] = useState<string | null>(null);
	const [generating, setGenerating] = useState(false);
	const startMutation = trpc.useMutation("startPlaythrough", {
		onSuccess: ({ id, locations }) => {
			localStorage.setItem("playthroughId", id);
			setPlaythroughId(id);
		},
		onSettled: () => setGenerating(false),
		onError: (err) => setError(err.message),
	});

	const [settingsString, setSettingsString] = useState<string>("");

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const target = e.target as typeof e.target & {
						Seed: { value: string };
						Settings: { value: string };
					};
					startMutation.mutate({
						seed: target.Seed.value,
						settingsString: target.Settings.value,
					});
					setError(null);
					setGenerating(true);
				}}
				className=""
			>
				<TextInput name="Seed" placeholder="leave blank for random" />
				<TextInput
					name="Settings"
					valueState={[settingsString, setSettingsString]}
					required
				/>
				<select
					onChange={(e) => {
						setSettingsString(settingsPresets[e.target.value]);
					}}
				>
					{Object.keys(settingsPresets).map((preset) => (
						<option key={preset}>{preset}</option>
					))}
				</select>

				<button
					className={`p-4 rounded-md ${
						generating ? "bg-zinc-300" : "bg-blue-200"
					}`}
					{...(generating ? { disabled: true } : {})}
				>
					{generating ? (
						<>
							<span className="animate-spin inline-block mr-3">
								.
							</span>
							<span>Generating...</span>
						</>
					) : (
						"Generate"
					)}
				</button>
			</form>
			<button onClick={() => startMutation.mutate({ sampleSeed: true })}>
				Sample seed
			</button>
			<ErrorBox error={error} />
		</>
	);
};

export default StartForm;
