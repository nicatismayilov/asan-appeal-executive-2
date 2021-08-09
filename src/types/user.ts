import { Structure } from "./structures";

export interface User {
	uuid: string;
	pin: string;
	firstName: string;
	lastName: string;
	fatherName: string;
	email?: string;
	address?: string;
	structure: Structure;
	steps: Step[];
	photo: string;
	role: Role;
	birthdayStr: string;
	gender: boolean;
	taskCount: number;
	mobilePhoneNumber: string;
}

export type Gender = "Kişi" | "Qadın";

export interface Role {
	id: number;
	name: string;
	addParentCompany: boolean;
	addChildCompany: boolean;
	addWorker: boolean;
	addCategory: boolean;
	canUseAdminPanel: boolean;
	isSAdmin: boolean;
	addSubscriber: boolean;
}

export interface Step {
	id: number;
	label: string;
	name: string;
	defaultPath: string;
	selectExecutor: boolean;
	fileAnswer: boolean;
	showPartialList: boolean;
	uncheckOffice: boolean;
	showNotificationBar: boolean;
	canSearchByExecutive: boolean;
	canSearchByRepresentation: boolean;
	canSearchByParentOffice: boolean;
	canSearchBySuboffice: boolean;
	canSeeOperations: boolean;
	canIdentifyStreet: boolean;
	canUpdateProblemInfo: boolean;
	canAddNewRequest: boolean;
	canAssest: boolean;
	canSearchByCategory: boolean;
	canSearchByVerifiedDate: boolean;
}
