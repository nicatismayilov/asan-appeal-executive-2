import { Employee } from "types/employee";
import { Organization, Region, OrganizationType } from "types/organization";
import { Role, Step } from "types/user";
import { Menu } from "types/common";
import { Request, RequestAddress, RequestFile, RequestTextHistory } from "./requests";
import { Customer } from "./customer";

export function createDefaultRole(): Role {
	return {
		id: -1,
		name: "",
		addChildCompany: false,
		addParentCompany: false,
		addWorker: false,
		canUseAdminPanel: false,
		isSAdmin: false,
		addCategory: false,
		addSubscriber: false,
	};
}

export function createDefaultStep(): Step {
	return {
		id: -1,
		name: "",
		label: "",
	};
}

export function createDefaultRegion(): Region {
	return {
		id: -1,
		name: "",
	};
}

export function createDefaultOrganizationType(): OrganizationType {
	return {
		id: -1,
		name: "",
		label: "",
	};
}

export function createDefaultOrganization(): Organization {
	return {
		id: -1,
		name: "",
		address: "",
		region: createDefaultRegion(),
		type: createDefaultOrganizationType(),
		askForRedirection: false,
	};
}

export function createDefaultEmployee(): Employee {
	return {
		uuid: "",
		pin: "",
		firstName: "",
		lastName: "",
		fatherName: "",
		email: "",
		address: "",
		company: createDefaultOrganization(),
		steps: [],
		role: createDefaultRole(),
		photo: "",
		gender: false,
		mobilePhoneNumber: "",
		whatsapNumber: "",
		taskCount: 0,
	};
}

export function createDefaultMenu(): Menu {
	return {
		canEdit: false,
		designStatus: "",
		icon: "",
		label: "",
		name: "",
		showInNewTab: false,
		title: "",
		type: "REQUEST",
		url: "",
	};
}

export function createDefaultRequest(): Request {
	return {
		appealDate: "",
		citizen: {
			firstName: "",
			lastName: "",
			fatherName: "",
			mobilePhoneNumber: "",
			uuid: "",
		},
		citizenCancelled: false,
		coverMedia: "",
		dateCreatedStr: "",
		id: "",
		isBelonging: false,
		isClear: false,
		isJoined: false,
		joinedCount: -1e19,
		latitude: -1e19,
		longitude: -1e19,
		number: -1e19,
		text: "",
		addresses: [],
		fileList: [],
		textHistory: [],
	};
}

export function createDefaultRequestAddress(): RequestAddress {
	return {
		formatted_address: "",
		place_id: "",
	};
}

export function createDefaultRequestFile(): RequestFile {
	return {
		distance: -1e19,
		latitude: -1e19,
		longitude: -1e19,
		length: -1e19,
		path: "",
		sameAddress: false,
		type: "IMAGE",
		uploadDateStr: "",
	};
}

export function createDefaultRequestTextHistory(): RequestTextHistory {
	return {
		dateStr: "",
		step: "",
		text: "",
		user: {
			firstName: "",
			lastName: "",
			fatherName: "",
			taskCount: 0,
		},
	};
}

export function createDefaultCustomer(): Customer {
	return {
		firstName: "",
		lastName: "",
		fatherName: "",
		uuid: "",
		isWorker: false,
		docSeriesNumber: "",
		pin: "",
	};
}
