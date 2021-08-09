import { Category } from "types/category";

/* Interface for Categories Reducer State */
export interface CategoriesReducerState {
	categories: Category[];
	categoriesLoading: boolean;
	categoriesTotalCount: number;
	error: string;
}

/* Action Types Enum */
export enum ActionTypes {
	GET_CATEGORIES = "GET_CATEGORIES",
	GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS",
	GET_CATEGORIES_FAILURE = "GET_CATEGORIES_FAILURE",
}

/* Payload Interfaces */
export interface EntitiesPayload {
	entities: Category[];
	totalCount: number;
}

/* Action Interfaces */
export interface GetCategories {
	type: typeof ActionTypes.GET_CATEGORIES;
}

export interface GetCategoriesSuccess {
	type: typeof ActionTypes.GET_CATEGORIES_SUCCESS;
	payload: EntitiesPayload;
}

export interface GetCategoriesFailure {
	type: typeof ActionTypes.GET_CATEGORIES_FAILURE;
	payload: string;
}

/* Unified Action type for Categories Reducer */
export type Action = GetCategories | GetCategoriesSuccess | GetCategoriesFailure;
