import axios from "axios";
import React, { useState } from "react";
import ErrorBox from "./ErrorBox";
import TextInput from "./TextInput";

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

	async function startPlaythrough(seed: string, settingsString: string) {
		try {
			let res = await axios.get(
				`${process.env.REACT_APP_SERVER_URL}/startPlaythrough`,
				{
					params: {
						seed: seed,
						settingsString: settingsString,
					},
				}
			);
			localStorage.setItem("playthroughId", res.data.id);
			setPlaythroughId(res.data.id);
		} catch (err: any) {
			setError(err.response.data);
		} finally {
			setGenerating(false);
		}
	}

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
					startPlaythrough(target.Seed.value, target.Settings.value);
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
			<ErrorBox error={error} />
		</>
	);
};

export default StartForm;
