import { Category } from "./category";
import { Structure } from "./structures";
import { File } from "types/file";

export interface Request {
	appealDate: string;
	citizen: {
		age?: number;
		fatherName: string;
		firstName: string;
		lastName: string;
		mobilePhoneNumber: string;
		type?: number;
		taskCount?: number;
		uuid: string;
		email?: string;
	};
	citizenCancelled: boolean;
	coverMedia: string;
	dateCreatedStr: string;
	id: string;
	isBelonging: boolean;
	isClear: boolean;
	isJoined: boolean;
	joinedCount: number;
	latitude: number;
	longitude: number;
	number: number;
	text: string;
	addresses?: RequestAddress[];
	filesList?: RequestFile[];
	textHistory?: RequestTextHistory[];
	address: string;
	title: string;
	executive: Structure;
	execStructures?: Structure[];
	categories?: Category[];
	type?: "COMPLAINT" | "OFFER";
	priorityLevel?: PriorityName;
	lastOperation?: string;
}

export interface Problem {
	id: string;
	title: string;
	street: { name: string };
	dateStr: string;
	address: string;
	appealCount: number;
	number: number;
	executive?: { name: string };
	isViewed: boolean;
	coverMedia: string;
	appealDate: string;
	priorityLevel: PriorityName;
	region: { name: string };
	canBeJoined: boolean;
}

export type PriorityName = "CRITICAL" | "NORMAL" | "LOW";

export interface Priority {
	name: PriorityName;
	title: string;
	color: string;
}

export interface RequestAddress {
	formatted_address: string;
	place_id: string;
}

export interface RequestFile extends File {
	distance?: number;
	latitude?: number;
	longitude?: number;
	length?: number;
	sameAddress: boolean;
	uploadDateStr: string;
	address?: string;
	executive?: Structure;
	madeByMobileApp?: boolean;
}

export interface RequestTextHistory {
	dateStr: string;
	step: string;
	text: string;
	user: {
		firstName: string;
		lastName: string;
		fatherName: string;
		taskCount: number;
	};
}

export type RequestType = {
	name: "COMPLAINT" | "OFFER";
	title: string;
};

export interface Action {
	id: number;
	name: string;
	dataRequired: boolean;
	color: string;
	inSentence: string;
	askReason: boolean;
}
