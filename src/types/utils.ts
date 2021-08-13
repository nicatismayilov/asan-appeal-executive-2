import { Employee } from "types/employee";
import { Structure, Region, StructureType } from "types/structures";
import { Role, Step, User } from "types/user";
import { Menu } from "types/common";
import {
	Priority,
	Request,
	RequestAddress,
	RequestFile,
	RequestTextHistory,
	RequestType,
} from "./requests";

export function createDefaultUser(): User {
	return {
		uuid: "",
		photo: "",
		pin: "",
		firstName: "",
		lastName: "",
		fatherName: "",
		birthdayStr: "",
		gender: false,
		role: createDefaultRole(),
		address: "",
		steps: [],
		structure: createDefaultStructure(),
		taskCount: 0,
		mobilePhoneNumber: "",
	};
}

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
		defaultPath: "",
		selectExecutor: false,
		fileAnswer: false,
		showPartialList: false,
		uncheckOffice: false,
		showNotificationBar: false,
		canSearchByExecutive: false,
		canSearchByRepresentation: false,
		canSearchByParentOffice: false,
		canSearchBySuboffice: false,
		canSeeOperations: false,
		canIdentifyStreet: false,
		canUpdateProblemInfo: false,
		canAddNewRequest: false,
		canAssest: false,
		canSearchByCategory: false,
		canSearchByVerifiedDate: false,
	};
}

export function createDefaultRegion(): Region {
	return {
		id: -1,
		name: "",
	};
}

export function createDefaultStructureType(): StructureType {
	return {
		id: -1,
		name: "",
		label: "",
	};
}

export function createDefaultStructure(): Structure {
	return {
		id: -1,
		name: "",
		address: "",
		region: createDefaultRegion(),
		type: createDefaultStructureType(),
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
		structure: createDefaultStructure(),
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
		filesList: [],
		textHistory: [],
		address: "",
		title: "",
		executive: createDefaultStructure(),
		type: createDefaultRequestType(),
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

export function createDefaultRequestType(): RequestType {
	return {
		name: "COMPLAINT",
		title: "Şikayət",
	};
}

export const priorities: Priority[] = [
	{ name: "LOW", title: "Aşağı", color: "#34c759" },
	{ name: "NORMAL", title: "Normal", color: "#ffcc00" },
	{ name: "CRITICAL", title: "Kritik", color: "#ff3b30" },
];

export const prioritiesMap: { [name: string]: Priority } = {
	LOW: { name: "LOW", title: "Aşağı", color: "#34c759" },
	NORMAL: { name: "NORMAL", title: "Normal", color: "#ffcc00" },
	CRITICAL: { name: "CRITICAL", title: "Kritik", color: "#ff3b30" },
};
