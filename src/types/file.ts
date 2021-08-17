export interface File {
	type: "IMAGE" | "VIDEO" | "AUDIO" | "DOCUMENT" | "EXCEL" | "PDF";
	path: string;
	size?: string | number;
}
