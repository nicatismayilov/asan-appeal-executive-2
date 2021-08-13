import { createDefaultRequest } from "types/utils";
import { ActionTypes, Action, RequestsReducerState } from "./types";

const initialState: RequestsReducerState = {
	requests: [],
	problems: [],
	requestsLoading: false,
	error: "",
	totalCount: 0,
	selectedRequest: createDefaultRequest(),
	requestLoading: false,
	actions: [],
	actionsLoading: false,
};

const reducer = (state = initialState, action: Action): RequestsReducerState => {
	switch (action.type) {
		case ActionTypes.GET_REQUESTS:
			return {
				...state,
				requestsLoading: true,
			};

		case ActionTypes.GET_REQUESTS_SUCCESS: {
			if (action.payload.type === "REQUEST")
				return {
					...state,
					requestsLoading: false,
					requests: action.payload.requests,
				};
			else
				return {
					...state,
					requestsLoading: false,
					problems: action.payload.problems,
				};
		}

		case ActionTypes.GET_REQUESTS_FAILURE:
			return {
				...state,
				requestsLoading: false,
				error: action.payload,
			};

		case ActionTypes.SET_REQUESTS_TOTAL_COUNT:
			return {
				...state,
				totalCount: action.payload,
			};

		case ActionTypes.GET_REQUEST:
			return {
				...state,
				requestLoading: true,
			};

		case ActionTypes.GET_REQUEST_SUCCESS:
			return {
				...state,
				requestLoading: false,
				selectedRequest: action.payload,
			};

		case ActionTypes.GET_REQUEST_FAILURE:
			return {
				...state,
				requestLoading: false,
				error: action.payload,
			};

		case ActionTypes.GET_ACTIONS:
			return {
				...state,
				actionsLoading: true,
			};

		case ActionTypes.GET_ACTIONS_SUCCESS:
			return {
				...state,
				actionsLoading: false,
				actions: action.payload,
			};

		case ActionTypes.GET_ACTIONS_FAILURE:
			return {
				...state,
				actionsLoading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;
