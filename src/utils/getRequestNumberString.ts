function getRequestNumberString(num: number): string {
	if (num.toString().length < 7) {
		const numOfZeros = 7 - num.toString().length;

		return `${"0".repeat(numOfZeros)}${num}`;
	}

	return num.toString();
}

export default getRequestNumberString;
