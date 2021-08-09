import { Action, ActionTypes, EntitiesPayload } from "./types";

/* Action creators for Categories */
export const getCategories = (): Action => {
	return {
		type: ActionTypes.GET_CATEGORIES,
	};
};

export const getCategoriesSuccess = (payload: EntitiesPayload): Action => {
	return {
		type: ActionTypes.GET_CATEGORIES_SUCCESS,
		payload,
	};
};

export const getCategoriesFailure = (payload: string): Action => {
	return {
		type: ActionTypes.GET_CATEGORIES_FAILURE,
		payload,
	};
};
