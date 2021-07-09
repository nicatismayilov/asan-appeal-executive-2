import { Menu } from "types/common";
import { Organization } from "types/organization";
import { Step, UserInformation } from "types/user";
import { createDefaultRole } from "types/utils";

// user reducer interface
export interface UserReducerState {
	user: UserInformation;
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
	FETCH_USER = "FETCH_USER",
	FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
	FETCH_USER_FAILURE = "FETCH_USER_FAILURE",

	SET_ACTIVE_STEP = "SET_ACTIVE_STEP",

	FETCH_MENUS = "FETCH_MENUS",
	FETCH_MENUS_SUCCESS = "FETCH_MENUS_SUCCESS",
	FETCH_MENUS_FAILURE = "FETCH_MENUS_FAILURE",

	FETCH_MENU_COUNTS = "FETCH_MENU_COUNTS",
	FETCH_MENU_COUNTS_SUCCESS = "FETCH_MENU_COUNTS_SUCCESS",
	FETCH_MENU_COUNTS_FAILURE = "FETCH_MENU_COUNTS_FAILURE",

	SET_ACTIVE_MENU = "SET_ACTIVE_MENU",
}

// action interfaces
export interface LoadUserInformationStart {
	type: typeof ActionTypes.FETCH_USER;
}

export interface LoadUserInformationSuccess {
	type: typeof ActionTypes.FETCH_USER_SUCCESS;
	payload: UserInformation;
}

export interface LoadUserInformationFailure {
	type: typeof ActionTypes.FETCH_USER_FAILURE;
	payload: string;
}

export interface SetActiveStep {
	type: typeof ActionTypes.SET_ACTIVE_STEP;
	payload: Step;
}

export interface FetchMenus {
	type: typeof ActionTypes.FETCH_MENUS;
}

export interface FetchMenusSuccess {
	type: typeof ActionTypes.FETCH_MENUS_SUCCESS;
	payload: Menu[];
}

export interface FetchMenusFailure {
	type: typeof ActionTypes.FETCH_MENUS_FAILURE;
	payload: string;
}

export interface FetchMenuCounts {
	type: typeof ActionTypes.FETCH_MENU_COUNTS;
}

export interface FetchMenuCountsSuccess {
	type: typeof ActionTypes.FETCH_MENU_COUNTS_SUCCESS;
	payload: { [menu: string]: string };
}

export interface FetchMenuCountsFailure {
	type: typeof ActionTypes.FETCH_MENU_COUNTS_FAILURE;
	payload: string;
}

export interface SetActiveMenu {
	type: typeof ActionTypes.SET_ACTIVE_MENU;
	payload: Menu;
}

export type Action =
	| LoadUserInformationStart
	| LoadUserInformationSuccess
	| LoadUserInformationFailure
	| SetActiveStep
	| FetchMenus
	| FetchMenusSuccess
	| FetchMenusFailure
	| FetchMenuCounts
	| FetchMenuCountsSuccess
	| FetchMenuCountsFailure
	| SetActiveMenu;

// initial values

export const emptyUser: UserInformation = {
	image: "",
	pin: "",
	name: "",
	surname: "",
	father: "",
	birthDate: "",
	gender: "Kişi",
	role: createDefaultRole(),
	address: "",
	steps: [],
	company: {} as Organization,
};
