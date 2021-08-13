import { createSelector } from "reselect";
import { StoreState } from "../rootReducer";
import { RequestsReducerState } from "./types";

const selectRequestsReducer = (store: StoreState): RequestsReducerState => store.requestsReducer;

export const selectRequests = createSelector(
	[selectRequestsReducer],
	(reducer) => reducer.requests
);

export const selectProblems = createSelector(
	[selectRequestsReducer],
	(reducer) => reducer.problems
);

export const selectRequestsTotalCount = createSelector(
	[selectRequestsReducer],
	(reducer) => reducer.totalCount
);

export const selectRequestsLoading = createSelector(
	[selectRequestsReducer],
	(reducer) => reducer.requestsLoading
);

export const selectRequestLoading = createSelector(
	[selectRequestsReducer],
	(reducer) => reducer.requestLoading
);

export const selectRequest = createSelector(
	[selectRequestsReducer],
	(reducer) => reducer.selectedRequest
);

export const selectActions = createSelector([selectRequestsReducer], (reducer) => reducer.actions);

export const selectActionLoading = createSelector(
	[selectRequestsReducer],
	(reducer) => reducer.actionsLoading
);
