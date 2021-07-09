import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { PersistConfig } from "redux-persist/es/types";

import alertsReducer from "./alerts/reducer";
import authReducer from "./auth/reducer";
import userReducer from "./user/reducer";
import requestsReducer from "./requests/reducer";

import { Action as AlertsAction } from "./alerts/types";
import { Action as AuthAction } from "./auth/types";
import { Action as UserAction } from "./user/types";
import { Action as RequestsAction } from "./requests/types";

const appReducer = combineReducers({
	alertsReducer,
	authReducer,
	userReducer,
	requestsReducer,
});

export type StoreState = ReturnType<typeof appReducer>;
export type StoreAction = AlertsAction | AuthAction | UserAction | RequestsAction;

const persistConfig: PersistConfig<StoreState> = {
	key: "root",
	storage,
	whitelist: ["userReducer", "authReducer"],
};

export const rootReducer = (state: StoreState | undefined, action: StoreAction) => {
	if (action.type === "LOGOUT_USER") {
		storage.removeItem("persist:root");
		return appReducer(undefined, action);
	}

	return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
