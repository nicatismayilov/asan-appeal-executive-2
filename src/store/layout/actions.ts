import { ActionTypes, Action } from "./types";

export const setMainContentHeight = (payload: number): Action => ({
	type: ActionTypes.SET_MAIN_CONTENT_HEIGHT,
	payload,
});
