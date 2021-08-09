import { Menu } from "types/common";
import { Step, User } from "types/user";

// user reducer interface
export interface UserReducerState {
	user: User;
	isLoading: boolean;
	error: string;
	activeStep: Step;
	menus: Menu[];
	menusLoading: boolean;
	menuCounts: { [menu: string]: string };
	menuCountsLoading: boolean;
	activeMenu: Menu;
}

// action types
export enum ActionTypes {
	CHECK_USER_SESSION = "CHECK_USER_SESSION",

	GET_USER = "GET_USER",
	GET_USER_SUCCESS = "GET_USER_SUCCESS",
	GET_USER_FAILURE = "GET_USER_FAILURE",

	SET_ACTIVE_STEP = "SET_ACTIVE_STEP",

	GET_MENUS = "GET_MENUS",
	GET_MENUS_SUCCESS = "GET_MENUS_SUCCESS",
	GET_MENUS_FAILURE = "GET_MENUS_FAILURE",

	GET_MENU_COUNTS = "GET_MENU_COUNTS",
	GET_MENU_COUNTS_SUCCESS = "GET_MENU_COUNTS_SUCCESS",
	GET_MENU_COUNTS_FAILURE = "GET_MENU_COUNTS_FAILURE",

	SET_ACTIVE_MENU = "SET_ACTIVE_MENU",
}

// action interfaces
export interface CheckUserSession {
	type: typeof ActionTypes.CHECK_USER_SESSION;
}

export interface GetUser {
	type: typeof ActionTypes.GET_USER;
}

export interface GetUserSuccess {
	type: typeof ActionTypes.GET_USER_SUCCESS;
	payload: User;
}

export interface GetUserFailure {
	type: typeof ActionTypes.GET_USER_FAILURE;
	payload: string;
}

export interface SetActiveStep {
	type: typeof ActionTypes.SET_ACTIVE_STEP;
	payload: Step;
}

export interface GetMenus {
	type: typeof ActionTypes.GET_MENUS;
}

export interface GetMenusSuccess {
	type: typeof ActionTypes.GET_MENUS_SUCCESS;
	payload: Menu[];
}

export interface GetMenusFailure {
	type: typeof ActionTypes.GET_MENUS_FAILURE;
	payload: string;
}

export interface GetMenuCounts {
	type: typeof ActionTypes.GET_MENU_COUNTS;
}

export interface GetMenuCountsSuccess {
	type: typeof ActionTypes.GET_MENU_COUNTS_SUCCESS;
	payload: { [menu: string]: string };
}

export interface GetMenuCountsFailure {
	type: typeof ActionTypes.GET_MENU_COUNTS_FAILURE;
	payload: string;
}

export interface SetActiveMenu {
	type: typeof ActionTypes.SET_ACTIVE_MENU;
	payload: Menu;
}

export type Action =
	| CheckUserSession
	| GetUser
	| GetUserSuccess
	| GetUserFailure
	| SetActiveStep
	| GetMenus
	| GetMenusSuccess
	| GetMenusFailure
	| GetMenuCounts
	| GetMenuCountsSuccess
	| GetMenuCountsFailure
	| SetActiveMenu;
