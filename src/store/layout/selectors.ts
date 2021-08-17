import { createSelector } from "reselect";
import { StoreState } from "../rootReducer";

const selectLayoutReducer = (state: StoreState) => state.layoutReducer;

export const selectMainContentHeight = createSelector(
	[selectLayoutReducer],
	(reducer) => reducer.mainContentHeight
);
