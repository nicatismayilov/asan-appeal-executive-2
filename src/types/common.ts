export interface Menu {
	canEdit: boolean;
	designStatus: string;
	icon: string;
	label: string;
	name: string;
	showInNewTab: boolean;
	title: string;
	type: "REQUEST" | "PROBLEM";
	url: string;
}
