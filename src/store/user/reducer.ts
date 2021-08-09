import { UserReducerState, Action, ActionTypes } from "./types";
import { createDefaultMenu, createDefaultStep, createDefaultUser } from "types/utils";

export const initialState: UserReducerState = {
	user: createDefaultUser(),
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
		case ActionTypes.GET_USER:
			return {
				...state,
				isLoading: true,
			};

		case ActionTypes.GET_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				user: action.payload,
			};

		case ActionTypes.GET_USER_FAILURE:
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

		case ActionTypes.GET_MENUS:
			return {
				...state,
				menusLoading: true,
			};

		case ActionTypes.GET_MENUS_SUCCESS:
			return {
				...state,
				menusLoading: false,
				menus: action.payload,
			};

		case ActionTypes.GET_MENUS_FAILURE:
			return {
				...state,
				menusLoading: false,
				error: action.payload,
			};

		case ActionTypes.GET_MENU_COUNTS:
			return {
				...state,
				menuCountsLoading: true,
			};

		case ActionTypes.GET_MENU_COUNTS_SUCCESS:
			return {
				...state,
				menuCountsLoading: false,
				menuCounts: action.payload,
			};

		case ActionTypes.GET_MENU_COUNTS_FAILURE:
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
