import regionsJson from "../data/regions.json";

type RegionsType = Record<string, {
		name: string;
		child: boolean;
		adult: boolean;
		locations: Record<string, {
				top: number;
				left: number;
				child: boolean;
				adult: boolean;
				always?: boolean;
			}>;
		gossip_stones: Record<string, {
				top: number;
				left: number;
				child: boolean;
				adult: boolean;
				always?: boolean;
			}>;
		entrances: Record<string, {
				top: number;
				left: number;
				child: boolean;
				adult: boolean;
				always?: boolean;
			}>;
	}>;

const regions = regionsJson as RegionsType;

export default regions;
