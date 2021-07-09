import { createSelector } from "reselect";

import { StoreState } from "../rootReducer";
import { UserReducerState } from "./types";

const selectUserReducer = (store: StoreState): UserReducerState => store.userReducer;

export const selectUserLoading = createSelector(
	[selectUserReducer],
	(reducer) => reducer.isLoading
);

export const selectUserInfo = createSelector([selectUserReducer], (reducer) => reducer.user);

export const selectUserImage = createSelector([selectUserInfo], (info) => info.image);

export const selectUserFullname = createSelector(
	[selectUserInfo],
	(info) => `${info.name} ${info.surname}`
);

export const selectUserCompany = createSelector([selectUserInfo], (info) => info.company);

export const selectUserRole = createSelector([selectUserInfo], (user) => user.role);

export const selectCanUseAdminPanel = createSelector(
	[selectUserRole],
	(role) => role.canUseAdminPanel
);

export const selectCanAddCategory = createSelector([selectUserRole], (role) => role.addCategory);

export const selectCanAddParentCompany = createSelector(
	[selectUserRole],
	(role) => role.addParentCompany
);

export const selectCanAddChildCompany = createSelector(
	[selectUserRole],
	(role) => role.addChildCompany
);

export const selectCanAddSubscriber = createSelector(
	[selectUserRole],
	(role) => role.addSubscriber
);

export const selectIsSuperAdmin = createSelector([selectUserRole], (role) => role.isSAdmin);

export const selectUserSteps = createSelector([selectUserInfo], (info) => info.steps);

export const selectActiveStep = createSelector(
	[selectUserReducer],
	(reducer) => reducer.activeStep
);

export const selectMenus = createSelector([selectUserReducer], (reducer) => reducer.menus);

export const selectMenusLoading = createSelector(
	[selectUserReducer],
	(reducer) => reducer.menusLoading
);

export const selectMenuCounts = createSelector(
	[selectUserReducer],
	(reducer) => reducer.menuCounts
);

export const selectMenuCountsLoading = createSelector(
	[selectUserReducer],
	(reducer) => reducer.menuCountsLoading
);

export const selectActiveMenu = createSelector(
	[selectUserReducer],
	(reducer) => reducer.activeMenu
);

export const selectActiveMenuCanEdit = createSelector(
	[selectActiveMenu],
	(activeMenu) => activeMenu.canEdit
);
