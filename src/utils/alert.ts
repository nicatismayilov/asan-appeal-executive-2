import { Alert, AlertType } from "types/alert";
import generateKey from "utils/generateKey";

export const createAlert = (text: string, type: AlertType): Alert => {
	return {
		id: generateKey(),
		text,
		type,
	};
};
