import { EmployeesReducerState, Action, ActionTypes } from "./types";

const initialState: EmployeesReducerState = {
	executors: [],
	executorsLoading: false,
	executorsTotalCount: 0,
	error: "",
};

const reducer = (state = initialState, action: Action): EmployeesReducerState => {
	switch (action.type) {
		case ActionTypes.GET_EXECUTORS:
			return {
				...state,
				executorsLoading: false,
			};

		case ActionTypes.GET_EXECUTORS_SUCCESS:
			return {
				...state,
				executors: action.payload.entities,
				executorsLoading: false,
				executorsTotalCount: action.payload.totalCount,
			};

		case ActionTypes.GET_EXECUTORS_FAILURE:
			return {
				...state,
				error: action.payload,
				executorsLoading: false,
			};

		default:
			return state;
	}
};

export default reducer;
