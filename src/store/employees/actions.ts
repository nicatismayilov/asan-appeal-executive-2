import { ActionTypes, Action, EmployeesPayload } from "./types";

/* Action creators for Executors */
export const getExecutors = (): Action => {
	return {
		type: ActionTypes.GET_EXECUTORS,
	};
};

export const getExecutorsSuccess = (payload: EmployeesPayload): Action => {
	return {
		type: ActionTypes.GET_EXECUTORS_SUCCESS,
		payload,
	};
};

export const getExecutorsFailure = (payload: string): Action => {
	return {
		type: ActionTypes.GET_EXECUTORS_FAILURE,
		payload,
	};
};
