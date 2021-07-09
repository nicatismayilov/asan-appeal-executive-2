import { takeLatest, call, put } from "redux-saga/effects";
import { ActionTypes, GetRequests, GetRequest } from "./types";
import {
	getRequestsSuccess,
	getRequestsFailure,
	setRequestsTotalCount,
	getRequestSuccess,
	getRequestFailure,
} from "./actions";
import * as RequestsService from "apiServices/requestsService";

// workers
function* handleGetRequests(action: GetRequests) {
	try {
		const res = yield call(RequestsService.getRequests, action.payload);
		const { entities, totalCount } = res.data.data;

		yield put(getRequestsSuccess(entities));
		yield put(setRequestsTotalCount(totalCount));
	} catch (error) {
		yield put(getRequestsFailure(error.message));
	}
}

function* handleGetRequest(action: GetRequest) {
	try {
		const res = yield call(RequestsService.getRequest, action.payload);

		if (res.data.data) yield put(getRequestSuccess(res.data.data));
		else throw new Error("Müraciət tapılmadı");
	} catch (error) {
		yield put(getRequestFailure(error.message));
	}
}

// watchers
export function* watchGetRequests() {
	yield takeLatest(ActionTypes.GET_REQUESTS, handleGetRequests);
}

export function* watchGetRequest() {
	yield takeLatest(ActionTypes.GET_REQUEST, handleGetRequest);
}

const requestsSagas = [call(watchGetRequests), call(watchGetRequest)];

export default requestsSagas;
