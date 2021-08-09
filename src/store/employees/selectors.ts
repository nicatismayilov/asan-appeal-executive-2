import { createSelector } from "reselect";
import { StoreState } from "../rootReducer";

const selectEmployeesReducer = (state: StoreState) => state.employeesReducer;

/* Selectors for Executors */
export const selectExecutors = createSelector(
	[selectEmployeesReducer],
	(reducer) => reducer.executors
);

export const selectExecutorsLoading = createSelector(
	[selectEmployeesReducer],
	(reducer) => reducer.executorsLoading
);

export const selectExecutorsTotalCount = createSelector(
	[selectEmployeesReducer],
	(reducer) => reducer.executorsTotalCount
);
