export interface Menu {
	canEdit: boolean;
	designStatus: string;
	icon: string;
	label: string;
	name: string;
	showInNewTab: boolean;
	title: string;
	type: AppealType;
	url: string;
}

export type AppealType = "REQUEST" | "PROBLEM";
