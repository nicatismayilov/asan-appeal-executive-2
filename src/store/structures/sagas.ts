import { takeLatest, put, call } from "redux-saga/effects";
import { ActionTypes } from "./types";
import {
	getExecutivesSuccess,
	getExecutivesFailure,
	getExecStructuresSuccess,
	getExecStructuresFailure,
	getRepresentationsSuccess,
	getRepresentationsFailure,
	getSubOfficesSuccess,
	getSubOfficesFailure,
	getStepsSuccess,
	getStepsFailure,
} from "./actions";
import { GetRepresentations } from "./types";
import StructuresService from "apiServices/structuresService";

/* Worker Sagas */
function* handleGetExecutives() {
	try {
		const res = yield call(StructuresService.getExecutives);
		const { entities, totalCount } = res.data.data;

		yield put(getExecutivesSuccess({ entities, totalCount }));
	} catch (error) {
		yield put(getExecutivesFailure(error.message));
	}
}

function* handleGetExecStructures() {
	try {
		const res = yield call(StructuresService.getExecStructures);
		const { entities, totalCount } = res.data.data;

		yield put(getExecStructuresSuccess({ entities, totalCount }));
	} catch (error) {
		yield put(getExecStructuresFailure(error.message));
	}
}

function* handleGetRepresentations(action: GetRepresentations) {
	const { payload } = action;

	try {
		const res = yield call(StructuresService.getRepresentations, payload);
		const { entities, totalCount } = res.data.data;

		yield put(getRepresentationsSuccess({ entities, totalCount }));
	} catch (error) {
		yield put(getRepresentationsFailure(error.message));
	}
}

function* handleGetSubOffices() {
	try {
		const res = yield call(StructuresService.getSubOffices);
		const { entities, totalCount } = res.data.data;

		yield put(getSubOfficesSuccess({ entities, totalCount }));
	} catch (error) {
		yield put(getSubOfficesFailure(error.message));
	}
}

function* handleGetSteps() {
	try {
		const res = yield call(StructuresService.getSteps);
		const { data } = res.data;

		yield put(getStepsSuccess(data));
	} catch (error) {
		yield put(getStepsFailure(error.message));
	}
}

/* Watcher Sagas */
function* watchGetExecutives() {
	yield takeLatest(ActionTypes.GET_EXECUTIVES, handleGetExecutives);
}

function* watchGetExecStructures() {
	yield takeLatest(ActionTypes.GET_EXECUTIVES, handleGetExecStructures);
}

function* watchGetRepresentations() {
	yield takeLatest(ActionTypes.GET_REPRESENTATIONS, handleGetRepresentations);
}

function* watchGetSubOffices() {
	yield takeLatest(ActionTypes.GET_SUB_OFFICES, handleGetSubOffices);
}

function* watchGetSteps() {
	yield takeLatest(ActionTypes.GET_STEPS, handleGetSteps);
}

const structuresSagas = [
	call(watchGetExecutives),
	call(watchGetExecStructures),
	call(watchGetRepresentations),
	call(watchGetSubOffices),
	call(watchGetSteps),
];

export default structuresSagas;
