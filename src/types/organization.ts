export interface Organization {
	id: number;
	name: string;
	address: string;
	email?: string;
	phoneNumber?: string;
	region: Region;
	type: OrganizationType;
	webSite?: string;
	voen?: string;
	askForRedirection?: boolean;
	parent?: Organization;
	relatedMinistry?: Organization;
	subCompanies?: Organization[];
}

export interface Region {
	id: number;
	name: string;
	parent?: Region;
}

export type OrganizationLabel =
	| "REPRESENTATION"
	| "OFFICE"
	| "EXECUTIVE"
	| "OTHER"
	| "SUBOFFICE"
	| "CURATOR"
	| "ADMINISTRATION"
	| "";

export interface OrganizationType {
	id: number;
	name: string;
	label: OrganizationLabel;
}
