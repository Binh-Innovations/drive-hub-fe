export const capitalizeFirstLetter = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
export const getTimeDiff = (departureTime: string, arrivalTime: string) => {
	// return many hours and minutes
	const departure = new Date(departureTime);
	const arrival = new Date(arrivalTime);
	const diff = arrival.getTime() - departure.getTime();

	const hours = Math.floor(diff / 1000 / 60 / 60);
	const minutes = Math.floor((diff / 1000 / 60) % 60);

	if(hours === 0) {
		return `${minutes} phút`;
	}
	if(minutes === 0) {
		return `${hours} giờ`;
	}
	return `${hours} giờ ${minutes} phút`;
}