import { takeLatest, call, put } from "redux-saga/effects";
import JWT from "jwt-decode";

import * as AuthService from "apiServices/authService";
import { ActionTypes, AuthenticateUserStart } from "./types";
import { authenticateUserSuccess, authenticateUserFailure } from "./actions";
import { addAlert } from "store/alerts/actions";
import { fetchUser } from "store/user/actions";

import createAlert from "utils/createAlert";
import { getCookie, removeCookie } from "utils/cookies";
import { getRedirectOrigin, setAccessToken, removeAccessToken } from "utils/sessionStorage";

//workers
function* handleAuthenticateUser(action: AuthenticateUserStart) {
	try {
		const res = yield call(AuthService.signIn, action.payload);

		if (res.data.error) {
			const newAlert = createAlert("error", res.data.error.message);
			yield put(addAlert(newAlert));

			throw new Error(res.data.error.message);
		}

		const token = res.data.data;
		const { exp } = yield call(JWT, token);
		const expDate = new Date(exp * 1000).toUTCString();

		const redirect = yield call(getRedirectOrigin);
		const isDev = origin === "http://mreg.asan.org" || process.env.NODE_ENV === "development";

		if (!isDev)
			document.cookie = `ASAN-APPEAL-TOKEN=${token}; expires=${expDate}; domain=.muraciet.az; path=/`;
		else
			document.cookie = `ASAN-APPEAL-TOKEN=${token}; expires=${expDate}; domain=.asan.org; path=/`;
		yield call(setAccessToken, token);

		if (redirect) window.location.href = redirect;
		else {
			yield put(authenticateUserSuccess());
			yield put(fetchUser());
		}
	} catch (error) {
		yield put(authenticateUserFailure(error.message));
	}
}

function* handleLogoutUser() {
	const token = yield call(getCookie, "ASAN-APPEAL-TOKEN");

	if (token) {
		const decoded = yield call(JWT, token);

		const { loginWithAsanLogin } = decoded;

		if (loginWithAsanLogin) {
			yield (window.location.href = `https://asanlogin.my.gov.az/cdsso-logout?origin=${origin}`);
		}
	}

	yield call(removeCookie, "ASAN-APPEAL-TOKEN");
	yield call(removeAccessToken);
}

//watchers
function* watchAuthenticateUser() {
	yield takeLatest(ActionTypes.AUHTENTICATE_USER_START, handleAuthenticateUser);
}

function* watchLogoutUser() {
	yield takeLatest(ActionTypes.LOGOUT_USER, handleLogoutUser);
}

const authSagas = [call(watchAuthenticateUser), call(watchLogoutUser)];

export default authSagas;
