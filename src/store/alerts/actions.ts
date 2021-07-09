import { Alert } from "types/alert";
import { Action, ActionTypes } from "./types";

export const addAlert = (a: Alert): Action => {
	return {
		type: ActionTypes.ADD_ALERT,
		payload: a,
	};
};

export const removeAlert = (id: string): Action => {
	return {
		type: ActionTypes.REMOVE_ALERT,
		payload: id,
	};
};
