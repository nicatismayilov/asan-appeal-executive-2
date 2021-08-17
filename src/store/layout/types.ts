export interface LayoutReducerState {
	mainContentHeight: number;
}

/* Action types Enum */
export enum ActionTypes {
	SET_MAIN_CONTENT_HEIGHT = "SET_MAIN_CONTENT_HEIGHT",
}

/* Action interfaces */
export interface SetMainContentHeight {
	type: typeof ActionTypes.SET_MAIN_CONTENT_HEIGHT;
	payload: number;
}

/* Unified action type for Layout Reducer */
export type Action = SetMainContentHeight;
