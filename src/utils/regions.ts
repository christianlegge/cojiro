import regionsJson from "../data/regions.json";

type RegionsType = {
	[key: string]: {
		name: string;
		child: boolean;
		adult: boolean;
		locations: {
			[key: string]: {
				top: number;
				left: number;
				child: boolean;
				adult: boolean;
				always?: boolean;
			};
		};
		gossip_stones: {
			[key: string]: {
				top: number;
				left: number;
				child: boolean;
				adult: boolean;
				always?: boolean;
			};
		};
	};
};

const regions = regionsJson as RegionsType;

export default regions;
