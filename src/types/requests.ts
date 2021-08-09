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
	fileList?: RequestFile[];
	textHistory?: RequestTextHistory[];
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

export interface RequestFile {
	distance: number;
	latitude: number;
	longitude: number;
	length: number;
	path: string;
	sameAddress: boolean;
	type: "IMAGE" | "VIDEO" | "AUDIO" | "DOCUMENT" | "EXCEL" | "PDF";
	uploadDateStr: string;
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
