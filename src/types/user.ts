import { Organization } from "./organization";

export interface UserInformation {
	image: string;
	pin: string;
	name: string;
	surname: string;
	father: string;
	birthDate: string;
	gender: Gender;
	role: Role;
	address: string;
	steps: Step[];
	company: Organization;
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
}
