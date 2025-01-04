export const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, callback: () => void, isDisabled: boolean) => {
	if (e.key === 'Enter' && !isDisabled) {
		callback();
	}
};


export function formatObject(obj: any) {
	const cleanedObj: any = {};

	for (const key in obj) {

		if (obj[key] === undefined || obj[key] === null || (typeof obj[key] === 'string' && obj[key].trim() === '')) {
			continue;
		}

		cleanedObj[key] = obj[key];
	}

	return cleanedObj;
}