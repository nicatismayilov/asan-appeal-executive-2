import { ActionTypes, Action } from "./types";
import { Step, User } from "types/user";
import { Menu } from "types/common";

export const checkUserSession = (): Action => {
	return {
		type: ActionTypes.CHECK_USER_SESSION,
	};
};

export const getUser = (): Action => ({
	type: ActionTypes.GET_USER,
});

export const getUserSuccess = (payload: User): Action => ({
	type: ActionTypes.GET_USER_SUCCESS,
	payload,
});

export const getUserFailure = (payload: string): Action => ({
	type: ActionTypes.GET_USER_FAILURE,
	payload,
});

export const setActiveStep = (s: Step): Action => {
	return {
		type: ActionTypes.SET_ACTIVE_STEP,
		payload: s,
	};
};

export const getMenus = (): Action => ({
	type: ActionTypes.GET_MENUS,
});

export const getMenusSuccess = (menus: Menu[]): Action => ({
	type: ActionTypes.GET_MENUS_SUCCESS,
	payload: menus,
});

export const getMenusFailure = (error: string): Action => ({
	type: ActionTypes.GET_MENUS_FAILURE,
	payload: error,
});

export const getMenuCounts = (): Action => ({
	type: ActionTypes.GET_MENU_COUNTS,
});

export const getMenuCountsSuccess = (countsObj: { [menu: string]: string }): Action => ({
	type: ActionTypes.GET_MENU_COUNTS_SUCCESS,
	payload: countsObj,
});

export const getMenuCountsFailure = (error: string): Action => ({
	type: ActionTypes.GET_MENU_COUNTS_FAILURE,
	payload: error,
});

export const setActiveMenu = (m: Menu): Action => {
	return {
		type: ActionTypes.SET_ACTIVE_MENU,
		payload: m,
	};
};
