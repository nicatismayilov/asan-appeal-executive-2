import { takeLatest, put, call } from "redux-saga/effects";
import { ActionTypes } from "./types";
import { getCategoriesSuccess, getCategoriesFailure } from "./actions";
import CategoriesService from "apiServices/categoriesService";

/* Worker Sagas */
function* handleGetCategories() {
	try {
		const res = yield call(CategoriesService.getCategories);
		const { entities, totalCount } = res.data.data;

		yield put(getCategoriesSuccess({ entities, totalCount }));
	} catch (error) {
		yield put(getCategoriesFailure(error.message));
	}
}

/* Watcher Sagas */
function* watchGetCategories() {
	yield takeLatest(ActionTypes.GET_CATEGORIES, handleGetCategories);
}

const categoriesSagas = [call(watchGetCategories)];

export default categoriesSagas;
