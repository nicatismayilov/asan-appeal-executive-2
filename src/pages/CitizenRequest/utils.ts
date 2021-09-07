import { CSSProperties } from "react";

export const computeDistanceIndicatorStyles = (distance: number): CSSProperties => {
	let backgroundColor: string, borderColor: string, color: string;

	if (distance >= 0 && distance <= 5) {
		backgroundColor = "#2196f328";
		borderColor = "#2196f356";
		color = "#2196f3";
	} else if (distance > 5 && distance <= 15) {
		backgroundColor = "#fb8c0028";
		borderColor = "#fb8c0056";
		color = "#fb8c00";
	} else {
		backgroundColor = "#ff525228";
		borderColor = "#ff525256";
		color = "#ff5252";
	}

	return { backgroundColor, borderColor, color };
};
