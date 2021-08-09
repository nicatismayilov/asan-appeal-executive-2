import { createSelector } from "reselect";

import { StoreState } from "../rootReducer";
import { UserReducerState } from "./types";

const selectUserReducer = (store: StoreState): UserReducerState => store.userReducer;

export const selectUserLoading = createSelector(
	[selectUserReducer],
	(reducer) => reducer.isLoading
);

export const selectUser = createSelector([selectUserReducer], (reducer) => reducer.user);

export const selectUserImage = createSelector([selectUser], (user) => user.photo);

export const selectUserFullname = createSelector(
	[selectUser],
	(user) => `${user.firstName} ${user.lastName}`
);

export const selectUserStructure = createSelector([selectUser], (user) => user.structure);

export const selectUserRole = createSelector([selectUser], (user) => user.role);

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

export const selectUserSteps = createSelector([selectUser], (user) => user.steps);

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
