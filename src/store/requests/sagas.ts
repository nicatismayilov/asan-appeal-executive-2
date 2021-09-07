import { takeLatest, call, put, select } from "redux-saga/effects";
import {
	ActionTypes,
	GetRequests,
	GetRequest,
	GetActions,
	GetJoinedRequests,
	GetNearRequests,
} from "./types";
import {
	getRequestsSuccess,
	getRequestsFailure,
	setRequestsTotalCount,
	getRequestSuccess,
	getRequestFailure,
	getActionsSuccess,
	getActionsFailure,
	getJoinedRequestsSuccess,
	getJoinedRequestsFailure,
	getNearRequestsFailure,
	getNearRequestsSuccess,
} from "./actions";
import { selectActiveMenu } from "../user/selectors";
import RequestsService from "apiServices/requestsService";
import { Menu } from "types/common";

// workers
function* handleGetRequests(action: GetRequests) {
	const activeMenu: Menu = yield select(selectActiveMenu);
	const type = activeMenu.type.toLocaleLowerCase();
	const { payload } = action;

	try {
		const res = yield call(RequestsService.getRequests, payload, type);
		const { entities, totalCount } = res.data.data;

		yield put(
			getRequestsSuccess({
				type: activeMenu.type,
				requests: entities || [],
				problems: entities || [],
			})
		);
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

function* handleGetActions(action: GetActions) {
	const { payload } = action;

	try {
		const res = yield call(RequestsService.getActions, payload);

		yield put(getActionsSuccess(res.data.data));
	} catch (error) {
		yield put(getActionsFailure(error.message));
	}
}

function* handleGetJoinedRequests(action: GetJoinedRequests) {
	const { payload } = action;

	try {
		const res = yield call(RequestsService.getJoinedRequests, payload);
		const { entities, totalCount } = res.data.data;

		yield put(getJoinedRequestsSuccess({ entities, totalCount }));
	} catch (error) {
		yield put(getJoinedRequestsFailure(error.message));
	}
}

function* handleGetNearRequests(action: GetNearRequests) {
	const { payload } = action;

	try {
		const res = yield call(RequestsService.getNearRequests, payload);
		const { entities, totalCount } = res.data.data;

		yield put(getNearRequestsSuccess({ entities, totalCount }));
	} catch (error) {
		yield put(getNearRequestsFailure(error.message));
	}
}

// watchers
function* watchGetRequests() {
	yield takeLatest(ActionTypes.GET_REQUESTS, handleGetRequests);
}

function* watchGetRequest() {
	yield takeLatest(ActionTypes.GET_REQUEST, handleGetRequest);
}

function* watchGetActions() {
	yield takeLatest(ActionTypes.GET_ACTIONS, handleGetActions);
}

function* watchGetJoinedRequests() {
	yield takeLatest(ActionTypes.GET_JOINED_REQUESTS, handleGetJoinedRequests);
}

function* watchGetNearRequests() {
	yield takeLatest(ActionTypes.GET_NEAR_REQUESTS, handleGetNearRequests);
}

export const requestsSagas = [
	call(watchGetRequests),
	call(watchGetRequest),
	call(watchGetActions),
	call(watchGetJoinedRequests),
	call(watchGetNearRequests),
];

export default requestsSagas;
