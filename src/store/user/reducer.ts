import { UserReducerState, Action, ActionTypes } from "./types";
import { emptyUser } from "./types";
import { createDefaultMenu, createDefaultStep } from "types/utils";

export const initialState: UserReducerState = {
	user: emptyUser,
	isLoading: false,
	error: "",
	activeStep: createDefaultStep(),
	menus: [],
	menusLoading: false,
	menuCounts: {},
	menuCountsLoading: false,
	activeMenu: createDefaultMenu(),
};

const reducer = (state = initialState, action: Action): UserReducerState => {
	switch (action.type) {
		case ActionTypes.FETCH_USER:
			return {
				...state,
				isLoading: true,
			};

		case ActionTypes.FETCH_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
			};

		case ActionTypes.FETCH_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		case ActionTypes.SET_ACTIVE_STEP:
			return {
				...state,
				activeStep: action.payload,
			};

		case ActionTypes.FETCH_MENUS:
			return {
				...state,
				menusLoading: true,
			};

		case ActionTypes.FETCH_MENUS_SUCCESS:
			return {
				...state,
				menusLoading: false,
				menus: action.payload,
			};

		case ActionTypes.FETCH_MENUS_FAILURE:
			return {
				...state,
				menusLoading: false,
				error: action.payload,
			};

		case ActionTypes.FETCH_MENU_COUNTS:
			return {
				...state,
				menuCountsLoading: true,
			};

		case ActionTypes.FETCH_MENU_COUNTS_SUCCESS:
			return {
				...state,
				menuCountsLoading: false,
				menuCounts: action.payload,
			};

		case ActionTypes.FETCH_MENU_COUNTS_FAILURE:
			return {
				...state,
				menuCountsLoading: false,
				error: action.payload,
			};

		case ActionTypes.SET_ACTIVE_MENU:
			return {
				...state,
				activeMenu: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;
