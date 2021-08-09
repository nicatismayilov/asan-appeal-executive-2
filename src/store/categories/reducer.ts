import { ActionTypes, Action, CategoriesReducerState } from "./types";

const initialState: CategoriesReducerState = {
	categories: [],
	categoriesLoading: false,
	categoriesTotalCount: 0,
	error: "",
};

const reducer = (state = initialState, action: Action): CategoriesReducerState => {
	switch (action.type) {
		case ActionTypes.GET_CATEGORIES:
			return {
				...state,
				categoriesLoading: true,
			};

		case ActionTypes.GET_CATEGORIES_SUCCESS:
			return {
				...state,
				categoriesLoading: false,
				categories: action.payload.entities,
				categoriesTotalCount: action.payload.totalCount,
			};

		case ActionTypes.GET_CATEGORIES_FAILURE:
			return {
				...state,
				categoriesLoading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;
