import { createSelector } from "reselect";
import { StoreState } from "../rootReducer";

const selectStructuresReducer = (state: StoreState) => state.structuresReducer;

/* Selectors for Executives */
export const selectExecutives = createSelector(
	[selectStructuresReducer],
	(reducer) => reducer.executives
);

export const selectExecutivesLoading = createSelector(
	[selectStructuresReducer],
	(reducer) => reducer.executivesLoading
);

export const selectExecutivesTotalCount = createSelector(
	[selectStructuresReducer],
	(reducer) => reducer.executivesTotalCount
);

/* Selectors for Exec Structures */
export const selectExecStructures = createSelector(
	[selectStructuresReducer],
	(reducer) => reducer.execStructures
);

export const selectExecStructuresLoading = createSelector(
	[selectStructuresReducer],
	(reducer) => reducer.execStructuresLoading
);

export const selectExecStructuresTotalCount = createSelector(
	[selectStructuresReducer],
	(reducer) => reducer.execStructuresTotalCount
);

/* Selectors for Representations */
export const selectRepresentations = createSelector(
	[selectStructuresReducer],
	(reducer) => reducer.representations
);

export const selectRepresentationsLoading = createSelector(
	[selectStructuresReducer],
	(reducer) => reducer.representationsLoading
);

export const selectRepresentationsTotalCount = createSelector(
	[selectStructuresReducer],
	(reducer) => reducer.representationsTotalCount
);

/* Selectors for Sub Offices */
export const selectSubOffices = createSelector(
	[selectStructuresReducer],
	(reducer) => reducer.subOffices
);

export const selectSubOfficesLoading = createSelector(
	[selectStructuresReducer],
	(reducer) => reducer.subOfficesLoading
);

export const selectSubOfficesTotalCount = createSelector(
	[selectStructuresReducer],
	(reducer) => reducer.subOfficesTotalCount
);

/* Selectors for Steps */
export const selectSteps = createSelector([selectStructuresReducer], (reducer) => reducer.steps);

export const selectStepsLoading = createSelector(
	[selectStructuresReducer],
	(reducer) => reducer.stepsLoading
);
