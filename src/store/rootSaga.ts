import { all } from "redux-saga/effects";

import authSagas from "./auth/sagas";
import userSagas from "./user/sagas";
import requestsSagas from "./requests/sagas";
import structuresSagas from "./structures/sagas";
import employeesSagas from "./employees/sagas";
import categoriesSagas from "./categories/sagas";

function* rootSaga() {
	yield all([
		...authSagas,
		...userSagas,
		...requestsSagas,
		...structuresSagas,
		...employeesSagas,
		...categoriesSagas,
	]);
}

export default rootSaga;
