import { ActionTypes, Action, StructuresReducerState } from "./types";

const initialState: StructuresReducerState = {
	executives: [],
	execStructures: [],
	representations: [],
	subOffices: [],
	steps: [],
	executivesLoading: false,
	execStructuresLoading: false,
	representationsLoading: false,
	subOfficesLoading: false,
	stepsLoading: false,
	executivesTotalCount: 0,
	execStructuresTotalCount: 0,
	representationsTotalCount: 0,
	subOfficesTotalCount: 0,
	error: "",
};

const reducer = (state = initialState, action: Action): StructuresReducerState => {
	switch (action.type) {
		case ActionTypes.GET_EXECUTIVES:
			return {
				...state,
				executivesLoading: true,
			};

		case ActionTypes.GET_EXECUTIVES_SUCCESS:
			return {
				...state,
				executivesLoading: false,
				executives: action.payload.entities,
				executivesTotalCount: action.payload.totalCount,
			};

		case ActionTypes.GET_EXECUTIVES_FAILURE:
			return {
				...state,
				executivesLoading: false,
				error: action.payload,
			};

		case ActionTypes.GET_EXEC_STRUCTURES:
			return {
				...state,
				execStructuresLoading: true,
			};

		case ActionTypes.GET_EXEC_STRUCTURES_SUCCESS:
			return {
				...state,
				execStructuresLoading: false,
				execStructures: action.payload.entities,
				execStructuresTotalCount: action.payload.totalCount,
			};

		case ActionTypes.GET_EXEC_STRUCTURES_FAILURE:
			return {
				...state,
				execStructuresLoading: false,
				error: action.payload,
			};

		case ActionTypes.GET_REPRESENTATIONS:
			return {
				...state,
				representationsLoading: true,
			};

		case ActionTypes.GET_REPRESENTATIONS_SUCCESS:
			return {
				...state,
				representationsLoading: false,
				representations: action.payload.entities,
				representationsTotalCount: action.payload.totalCount,
			};

		case ActionTypes.GET_REPRESENTATIONS_FAILURE:
			return {
				...state,
				representationsLoading: false,
				error: action.payload,
			};

		case ActionTypes.RESET_REPRESENTATIONS:
			return {
				...state,
				representations: [],
			};

		case ActionTypes.GET_SUB_OFFICES:
			return {
				...state,
				subOfficesLoading: true,
			};

		case ActionTypes.GET_SUB_OFFICES_SUCCESS:
			return {
				...state,
				subOfficesLoading: false,
				subOffices: action.payload.entities,
				subOfficesTotalCount: action.payload.totalCount,
			};

		case ActionTypes.GET_SUB_OFFICES_FAILURE:
			return {
				...state,
				subOfficesLoading: false,
				error: action.payload,
			};

		case ActionTypes.GET_STEPS:
			return {
				...state,
				stepsLoading: true,
			};

		case ActionTypes.GET_STEPS_SUCCESS:
			return {
				...state,
				stepsLoading: false,
				steps: action.payload,
			};

		case ActionTypes.GET_STEPS_FAILURE:
			return {
				...state,
				stepsLoading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;
