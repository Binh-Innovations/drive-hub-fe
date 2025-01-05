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

export const formatDateTime = (dateStr: string) => {
	return new Date(dateStr).toLocaleString('vi-VN', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
};

export const formatPrice = (price: number) => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND'
	}).format(price);
};