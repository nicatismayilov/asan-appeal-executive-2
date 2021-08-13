import { Problem, Request, Action as RequestAction } from "types/requests";
import { GetActionsParams, GetRequestParams, GetRequestsParams } from "apiServices/requestsService";

/* Interface for Requests Reducer State */
export interface RequestsReducerState {
	requests: Request[];
	problems: Problem[];
	requestsLoading: boolean;
	error: string;
	totalCount: number;
	selectedRequest: Request;
	requestLoading: boolean;
	actions: RequestAction[];
	actionsLoading: boolean;
}

/* Action Types Anum */
export enum ActionTypes {
	GET_REQUESTS = "GET_REQUESTS",
	GET_REQUESTS_SUCCESS = "GET_REQUESTS_SUCCESS",
	GET_REQUESTS_FAILURE = "GET_REQUESTS_FAILURE",

	SET_REQUESTS_TOTAL_COUNT = "SET_REQUESTS_TOTAL_COUNT",

	GET_REQUEST = "GET_REQUEST",
	GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS",
	GET_REQUEST_FAILURE = "GET_REQUEST_FAILURE",

	GET_ACTIONS = "GET_ACTIONS",
	GET_ACTIONS_SUCCESS = "GET_ACTIONS_SUCCESS",
	GET_ACTIONS_FAILURE = "GET_ACTIONS_FAILURE",
}

export interface GetRequestsSuccessPayload {
	type: "REQUEST" | "PROBLEM";
	requests: Request[];
	problems: Problem[];
}

/* Action Interfaces */
export interface GetRequests {
	type: typeof ActionTypes.GET_REQUESTS;
	payload: GetRequestsParams;
}

export interface GetRequestsSuccess {
	type: typeof ActionTypes.GET_REQUESTS_SUCCESS;
	payload: GetRequestsSuccessPayload;
}

export interface GetRequestsFailure {
	type: typeof ActionTypes.GET_REQUESTS_FAILURE;
	payload: string;
}

/*------------------------------------------------------------------------------------------------*/

export interface SetRequestsTotalCount {
	type: typeof ActionTypes.SET_REQUESTS_TOTAL_COUNT;
	payload: number;
}

/*------------------------------------------------------------------------------------------------*/

export interface GetRequest {
	type: typeof ActionTypes.GET_REQUEST;
	payload: GetRequestParams;
}

export interface GetRequestSuccess {
	type: typeof ActionTypes.GET_REQUEST_SUCCESS;
	payload: Request;
}

export interface GetRequestFailure {
	type: typeof ActionTypes.GET_REQUEST_FAILURE;
	payload: string;
}

/*------------------------------------------------------------------------------------------------*/

export interface GetActions {
	type: typeof ActionTypes.GET_ACTIONS;
	payload: GetActionsParams;
}

export interface GetActionsSuccess {
	type: typeof ActionTypes.GET_ACTIONS_SUCCESS;
	payload: RequestAction[];
}

export interface GetActionsFailure {
	type: typeof ActionTypes.GET_ACTIONS_FAILURE;
	payload: string;
}

/* Unified Action type for Requests Reducer */
export type Action =
	| GetRequests
	| GetRequestsSuccess
	| GetRequestsFailure
	| SetRequestsTotalCount
	| GetRequest
	| GetRequestSuccess
	| GetRequestFailure
	| GetActions
	| GetActionsSuccess
	| GetActionsFailure;
