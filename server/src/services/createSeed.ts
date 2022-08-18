import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const createSeed = async (params: {
	seed?: string;
	settingsString: string;
}) => {
	try {
		let response = await axios.get(
			"https://www.ootrandomizer.com/api/seed/create",
			{
				params: {
					key: process.env.OOTRANDOMIZER_API_KEY,
					...params,
				},
			}
		);
		return response.data;
	} catch (err) {
		return err;
	}
};
