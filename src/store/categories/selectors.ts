import { createSelector } from "reselect";
import { StoreState } from "../rootReducer";

const selectCategoriesReducer = (state: StoreState) => state.categoriesReducer;

export const selectCategories = createSelector(
	[selectCategoriesReducer],
	(reducer) => reducer.categories
);

export const selectCategoriesLoading = createSelector(
	[selectCategoriesReducer],
	(reducer) => reducer.categoriesLoading
);

export const selectCategoriesTotalCount = createSelector(
	[selectCategoriesReducer],
	(reducer) => reducer.categoriesTotalCount
);
