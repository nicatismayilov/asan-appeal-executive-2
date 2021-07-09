import { takeLatest, call, put } from "redux-saga/effects";

import * as UserService from "apiServices/userService";
import * as CommonService from "apiServices/commonService";
import { ActionTypes, SetActiveStep } from "./types";
import { UserInformation } from "types/user";
import {
	fetchUserSuccess,
	fetchUserFailure,
	setActiveStep,
	fetchMenus,
	fetchMenuCounts,
	fetchMenusSuccess,
	fetchMenusFailure,
	fetchMenuCountsSuccess,
	fetchMenuCountsFailure,
	setActiveMenu,
} from "./actions";

import EventBus from "eventBus";

// workers
function* handleFetchUser() {
	try {
		const res = yield call(UserService.loadDetails);
		const info = res.data.data;

		const user: UserInformation = {
			image: info.photo,
			pin: info.pin,
			name: info.firstName,
			surname: info.lastName,
			father: info.fatherName,
			birthDate: info.birthdayStr,
			gender: info.gender ? "Qadın" : "Kişi",
			role: info.role,
			address: info.address || "",
			steps: info.steps,
			company: info.company,
		};

		yield put(fetchUserSuccess(user));
		yield put(setActiveStep(user.steps[0]));
	} catch (error) {
		yield put(fetchUserFailure(error.message));
	}
}

function* handleSetActiveStep(action: SetActiveStep) {
	const { payload } = action;

	if (payload.id !== -1 && payload.id !== 9999) {
		yield put(fetchMenus());
		yield put(fetchMenuCounts());
	}
}

function* handleFetchMenus() {
	try {
		const res = yield call(CommonService.getMenus);
		const menus = res.data.data;

		yield put(fetchMenusSuccess(menus));
		yield put(setActiveMenu(menus[0]));
		yield call(EventBus.publishers.getMenusSuccess, { menu: menus[0] });
	} catch (error) {
		yield put(fetchMenusFailure(error.message));
	}
}

function* handleFetchMenuCounts() {
	try {
		const res = yield call(CommonService.getMenuCounts);

		if (res.data.error) throw new Error(res.data.error.message);

		const counts = res.data.data;

		yield put(fetchMenuCountsSuccess(counts));
	} catch (error) {
		yield put(fetchMenuCountsFailure(error.message));
	}
}

// watchers
function* watchFetchUser() {
	yield takeLatest(ActionTypes.FETCH_USER, handleFetchUser);
}

function* watchSetActiveStep() {
	yield takeLatest(ActionTypes.SET_ACTIVE_STEP, handleSetActiveStep);
}

function* watchFetchMenus() {
	yield takeLatest(ActionTypes.FETCH_MENUS, handleFetchMenus);
}

function* watchFetchMenuCounts() {
	yield takeLatest(ActionTypes.FETCH_MENU_COUNTS, handleFetchMenuCounts);
}

const userSagas = [
	call(watchFetchUser),
	call(watchSetActiveStep),
	call(watchFetchMenus),
	call(watchFetchMenuCounts),
];

export default userSagas;
