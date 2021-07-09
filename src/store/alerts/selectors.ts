import { createSelector } from "reselect";
import { StoreState } from "store/rootReducer";
import { AlertsReducerState } from "./types";

const selectAlertsReducer = (store: StoreState): AlertsReducerState => store.alertsReducer;

export const selectAlerts = createSelector([selectAlertsReducer], (reducer) => reducer.alerts);
