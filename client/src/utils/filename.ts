export const formatFilename = (str: string): string => {
	return str
		.toLowerCase()
		.replaceAll(" ", "-")
		.replaceAll("(", "")
		.replaceAll(")", "")
		.replaceAll("'", "");
};
