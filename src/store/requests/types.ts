import { Request } from "types/requests";
import { GetRequestParams, GetRequestsParams } from "apiServices/requestsService";

// requests reducer interface
export interface RequestsReducerState {
	requets: Request[];
	requestsLoading: boolean;
	error: string;
	totalCount: number;
	selectedRequest: Request;
	requestLoading: boolean;
}

// action types
export enum ActionTypes {
	GET_REQUESTS = "GET_REQUESTS",
	GET_REQUESTS_SUCCESS = "GET_REQUESTS_SUCCESS",
	GET_REQUESTS_FAILURE = "GET_REQUESTS_FAILURE",

	SET_REQUESTS_TOTAL_COUNT = "SET_REQUESTS_TOTAL_COUNT",

	GET_REQUEST = "GET_REQUEST",
	GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS",
	GET_REQUEST_FAILURE = "GET_REQUEST_FAILURE",
}

// action interfaces
export interface GetRequests {
	type: typeof ActionTypes.GET_REQUESTS;
	payload: GetRequestsParams;
}

export interface GetRequestsSuccess {
	type: typeof ActionTypes.GET_REQUESTS_SUCCESS;
	payload: Request[];
}

export interface GetRequestsFailure {
	type: typeof ActionTypes.GET_REQUESTS_FAILURE;
	payload: string;
}

export interface SetRequestsTotalCount {
	type: typeof ActionTypes.SET_REQUESTS_TOTAL_COUNT;
	payload: number;
}

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

export type Action =
	| GetRequests
	| GetRequestsSuccess
	| GetRequestsFailure
	| SetRequestsTotalCount
	| GetRequest
	| GetRequestSuccess
	| GetRequestFailure;
