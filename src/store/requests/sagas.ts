import { takeLatest, call, put, select } from "redux-saga/effects";
import { ActionTypes, GetRequests, GetRequest } from "./types";
import {
	getRequestsSuccess,
	getRequestsFailure,
	setRequestsTotalCount,
	getRequestSuccess,
	getRequestFailure,
} from "./actions";
import { selectActiveMenu } from "../user/selectors";
import * as RequestsService from "apiServices/requestsService";
import { Menu } from "types/common";

// workers
function* handleGetRequests(action: GetRequests) {
	const activeMenu: Menu = yield select(selectActiveMenu);

	try {
		const res = yield call(
			RequestsService.getRequests,
			action.payload,
			activeMenu.type.toLocaleLowerCase()
		);
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

// watchers
export function* watchGetRequests() {
	yield takeLatest(ActionTypes.GET_REQUESTS, handleGetRequests);
}

export function* watchGetRequest() {
	yield takeLatest(ActionTypes.GET_REQUEST, handleGetRequest);
}

const requestsSagas = [call(watchGetRequests), call(watchGetRequest)];

export default requestsSagas;
