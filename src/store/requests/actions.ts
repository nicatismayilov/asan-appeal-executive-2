import { GetActionsParams, GetRequestParams, GetRequestsParams } from "apiServices/requestsService";
import { Request, Action as RequestAction } from "types/requests";
import { ActionTypes, Action, GetRequestsSuccessPayload } from "./types";

export const getRequests = (params: GetRequestsParams): Action => {
	return {
		type: ActionTypes.GET_REQUESTS,
		payload: params,
	};
};

export const getRequestsSuccess = (payload: GetRequestsSuccessPayload): Action => {
	return {
		type: ActionTypes.GET_REQUESTS_SUCCESS,
		payload,
	};
};

export const getRequestsFailure = (error: string): Action => {
	return {
		type: ActionTypes.GET_REQUESTS_FAILURE,
		payload: error,
	};
};

/*------------------------------------------------------------------------------------------------*/

export const setRequestsTotalCount = (count: number): Action => {
	return {
		type: ActionTypes.SET_REQUESTS_TOTAL_COUNT,
		payload: count,
	};
};

/*------------------------------------------------------------------------------------------------*/

export const getRequest = (payload: GetRequestParams): Action => {
	return {
		type: ActionTypes.GET_REQUEST,
		payload,
	};
};

export const getRequestSuccess = (payload: Request): Action => {
	return {
		type: ActionTypes.GET_REQUEST_SUCCESS,
		payload,
	};
};

export const getRequestFailure = (payload: string): Action => {
	return {
		type: ActionTypes.GET_REQUEST_FAILURE,
		payload,
	};
};

/*------------------------------------------------------------------------------------------------*/

export const getActions = (payload: GetActionsParams): Action => ({
	type: ActionTypes.GET_ACTIONS,
	payload,
});

export const getActionsSuccess = (payload: RequestAction[]): Action => ({
	type: ActionTypes.GET_ACTIONS_SUCCESS,
	payload,
});

export const getActionsFailure = (payload: string): Action => ({
	type: ActionTypes.GET_ACTIONS_FAILURE,
	payload,
});
