function getDateFormat(date: string): string {
	const datePart = date.split(" ")[0];
	const timePart = date.split(" ")[1];

	const day = datePart.split(".")[0];
	const month = datePart.split(".")[1];
	const year = datePart.split(".")[2];

	return `${month}/${day}/${year} ${timePart}`;
}

export default getDateFormat;
