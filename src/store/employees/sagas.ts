import { takeLatest, put, call } from "redux-saga/effects";
import { ActionTypes } from "./types";
import { getExecutorsSuccess, getExecutorsFailure } from "./actions";
import EmployeesService from "apiServices/employeesService";

/* Worker Sagas */
function* handleGetExecutors() {
	try {
		const res = yield call(EmployeesService.getExecutors);
		const { entities, totalCount } = res.data.data;

		yield put(getExecutorsSuccess({ entities, totalCount }));
	} catch (error) {
		yield put(getExecutorsFailure(error.message));
	}
}

/* Watcher Sagas */
function* watchGetExecutors() {
	yield takeLatest(ActionTypes.GET_EXECUTORS, handleGetExecutors);
}

const employeesSagas = [call(watchGetExecutors)];

export default employeesSagas;
