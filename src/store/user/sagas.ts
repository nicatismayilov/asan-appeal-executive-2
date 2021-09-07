import { takeLatest, call, put, select } from "redux-saga/effects";
import { ActionTypes, SetActiveStep } from "./types";
import {
	getUser,
	getUserSuccess,
	getUserFailure,
	setActiveStep,
	getMenus,
	getMenuCounts,
	getMenusSuccess,
	getMenusFailure,
	getMenuCountsSuccess,
	getMenuCountsFailure,
	setActiveMenu,
} from "./actions";
import { selectIsAuthenticated } from "../auth/selectors";
import { selectUser } from "./selectors";
import UserService from "apiServices/userService";
import CommonService from "apiServices/commonService";
import EventBus, { MenusLoadEvent } from "eventBus";
import { User } from "types/user";

// workers
function* handleCheckUserSession() {
	const isAuth: boolean = yield select(selectIsAuthenticated);
	const user: User = yield select(selectUser);

	if (isAuth && user.uuid && user.pin) {
		yield put(getMenuCounts());

		return;
	}

	yield put(getUser());
}

function* handleGetUser() {
	try {
		const res = yield call(UserService.getUserData);
		const user = res.data.data;

		yield put(getUserSuccess(user));
		yield put(setActiveStep(user.steps[0]));
	} catch (error) {
		yield put(getUserFailure(error.message));
	}
}

function* handleSetActiveStep(action: SetActiveStep) {
	const { payload } = action;

	if (payload.id !== -1 && payload.id !== 9999) {
		yield put(getMenus());
		yield put(getMenuCounts());
	}
}

function* handleGetMenus() {
	try {
		const res = yield call(CommonService.getMenus);
		const menus = res.data.data;

		yield put(getMenusSuccess(menus));
		yield put(setActiveMenu(menus[0]));
		yield call(EventBus.publish, "menus-load", new MenusLoadEvent(menus[0]));
	} catch (error) {
		yield put(getMenusFailure(error.message));
	}
}

function* handleGetMenuCounts() {
	try {
		const res = yield call(CommonService.getMenuCount);

		if (res.data.error) throw new Error(res.data.error.message);

		const counts = res.data.data;

		yield put(getMenuCountsSuccess(counts));
	} catch (error) {
		yield put(getMenuCountsFailure(error.message));
	}
}

// watchers
function* watchCheckUserSession() {
	yield takeLatest(ActionTypes.CHECK_USER_SESSION, handleCheckUserSession);
}

function* watchGetUser() {
	yield takeLatest(ActionTypes.GET_USER, handleGetUser);
}

function* watchSetActiveStep() {
	yield takeLatest(ActionTypes.SET_ACTIVE_STEP, handleSetActiveStep);
}

function* watchGetMenus() {
	yield takeLatest(ActionTypes.GET_MENUS, handleGetMenus);
}

function* watchGetMenuCounts() {
	yield takeLatest(ActionTypes.GET_MENU_COUNTS, handleGetMenuCounts);
}

const userSagas = [
	call(watchCheckUserSession),
	call(watchGetUser),
	call(watchSetActiveStep),
	call(watchGetMenus),
	call(watchGetMenuCounts),
];

export default userSagas;
