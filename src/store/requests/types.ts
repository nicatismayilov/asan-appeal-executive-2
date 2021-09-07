import { Problem, Request, Action as RequestAction } from "types/requests";
import {
	GetActionsParams,
	GetRequestParams,
	GetRequestsParams,
	GetJoinedRequestsParams,
	GetNearRequestsParams,
} from "apiServices/requestsService";

/* Interface for Requests Reducer State */
export interface RequestsReducerState {
	requests: Request[];
	problems: Problem[];
	joinedRequests: Request[];
	nearRequests: Request[];
	actions: RequestAction[];
	selectedRequest: Request;

	totalCount: number;
	joinedRequestsTotalCount: number;
	nearRequestsTotalCount: number;

	requestsLoading: boolean;
	requestLoading: boolean;
	actionsLoading: boolean;
	joinedRequestsLoading: boolean;
	nearRequestsLoading: boolean;

	error: string;
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

	GET_JOINED_REQUESTS = "GET_JOINED_REQUESTS",
	GET_JOINED_REQUESTS_SUCCESS = "GET_JOINED_REQUESTS_SUCCESS",
	GET_JOINED_REQUESTS_FAILURE = "GET_JOINED_REQUESTS_FAILURE",

	GET_NEAR_REQUESTS = "GET_NEAR_REQUESTS",
	GET_NEAR_REQUESTS_SUCCESS = "GET_NEAR_REQUESTS_SUCCESS",
	GET_NEAR_REQUESTS_FAILURE = "GET_NEAR_REQUESTS_FAILURE",
}

export interface GetRequestsSuccessPayload {
	type: "REQUEST" | "PROBLEM";
	requests: Request[];
	problems: Problem[];
}

export interface GetJoinedRequestsSuccessPayload {
	entities: Request[];
	totalCount: number;
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

/*------------------------------------------------------------------------------------------------*/

export interface GetJoinedRequests {
	type: typeof ActionTypes.GET_JOINED_REQUESTS;
	payload: GetJoinedRequestsParams;
}

export interface GetJoinedRequestsSuccess {
	type: typeof ActionTypes.GET_JOINED_REQUESTS_SUCCESS;
	payload: GetJoinedRequestsSuccessPayload;
}

export interface GetJoinedRequestsFailure {
	type: typeof ActionTypes.GET_JOINED_REQUESTS_FAILURE;
	payload: string;
}

/*------------------------------------------------------------------------------------------------*/

export interface GetNearRequests {
	type: typeof ActionTypes.GET_NEAR_REQUESTS;
	payload: GetNearRequestsParams;
}

export interface GetNearRequestsSuccess {
	type: typeof ActionTypes.GET_NEAR_REQUESTS_SUCCESS;
	payload: GetJoinedRequestsSuccessPayload;
}

export interface GetNearRequestsFailure {
	type: typeof ActionTypes.GET_NEAR_REQUESTS_FAILURE;
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
	| GetActionsFailure
	| GetJoinedRequests
	| GetJoinedRequestsSuccess
	| GetJoinedRequestsFailure
	| GetNearRequests
	| GetNearRequestsSuccess
	| GetNearRequestsFailure;
