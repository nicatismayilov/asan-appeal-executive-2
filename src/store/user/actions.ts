import { ActionTypes, Action } from "./types";
import { Step, UserInformation } from "types/user";
import { Menu } from "types/common";

export const fetchUser = (): Action => ({
	type: ActionTypes.FETCH_USER,
});

export const fetchUserSuccess = (user: UserInformation): Action => ({
	type: ActionTypes.FETCH_USER_SUCCESS,
	payload: user,
});

export const fetchUserFailure = (error: string): Action => ({
	type: ActionTypes.FETCH_USER_FAILURE,
	payload: error,
});

export const setActiveStep = (s: Step): Action => {
	return {
		type: ActionTypes.SET_ACTIVE_STEP,
		payload: s,
	};
};

export const fetchMenus = (): Action => ({
	type: ActionTypes.FETCH_MENUS,
});

export const fetchMenusSuccess = (menus: Menu[]): Action => ({
	type: ActionTypes.FETCH_MENUS_SUCCESS,
	payload: menus,
});

export const fetchMenusFailure = (error: string): Action => ({
	type: ActionTypes.FETCH_MENUS_FAILURE,
	payload: error,
});

export const fetchMenuCounts = (): Action => ({
	type: ActionTypes.FETCH_MENU_COUNTS,
});

export const fetchMenuCountsSuccess = (countsObj: { [menu: string]: string }): Action => ({
	type: ActionTypes.FETCH_MENU_COUNTS_SUCCESS,
	payload: countsObj,
});

export const fetchMenuCountsFailure = (error: string): Action => ({
	type: ActionTypes.FETCH_MENU_COUNTS_FAILURE,
	payload: error,
});

export const setActiveMenu = (m: Menu): Action => {
	return {
		type: ActionTypes.SET_ACTIVE_MENU,
		payload: m,
	};
};
