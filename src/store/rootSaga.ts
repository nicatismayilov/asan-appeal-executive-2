import { all } from "redux-saga/effects";

import authSagas from "./auth/sagas";
import userSagas from "./user/sagas";
import requestsSagas from "./requests/sagas";

function* rootSaga() {
	yield all([...authSagas, ...userSagas, ...requestsSagas]);
}

export default rootSaga;
