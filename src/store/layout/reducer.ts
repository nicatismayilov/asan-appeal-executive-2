import { LayoutReducerState, Action, ActionTypes } from "./types";

const initialState: LayoutReducerState = {
	mainContentHeight: 0,
};

const reducer = (state = initialState, action: Action): LayoutReducerState => {
	switch (action.type) {
		case ActionTypes.SET_MAIN_CONTENT_HEIGHT:
			return {
				...state,
				mainContentHeight: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;
