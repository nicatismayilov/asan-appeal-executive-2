export interface Structure {
	id: number;
	name: string;
	address: string;
	email?: string;
	phoneNumber?: string;
	region: Region;
	type: StructureType;
	webSite?: string;
	voen?: string;
	askForRedirection?: boolean;
	parent?: Structure;
	relatedMinistry?: Structure;
	subStructures?: Structure[];
}

export interface Region {
	id: number;
	name: string;
	parent?: Region;
}

export type StructureLabel =
	| "REPRESENTATION"
	| "OFFICE"
	| "EXECUTIVE"
	| "OTHER"
	| "SUBOFFICE"
	| "CURATOR"
	| "ADMINISTRATION"
	| "";

export interface StructureType {
	id: number;
	name: string;
	label: StructureLabel;
}
