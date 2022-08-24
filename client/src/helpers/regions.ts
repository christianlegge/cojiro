type Location = {
	name: string;
	child: boolean;
	adult: boolean;
};

type Exit = Location & { destination: Region };

type Region = {
	name: string;
	child: boolean;
	adult: boolean;
	locations: Location[];
	exits: Exit[];
};

const getRegions = () => ["Kokiri Forest", "Hyrule Field", "Lake Hylia"];

const getLocationsAtRegion = (region: string) => ["Check 1, Check 2, Check 3"];

export { getRegions, getLocationsAtRegion };
