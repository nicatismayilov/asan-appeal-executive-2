export interface Category {
	id: number;
	uuid: string;
	name: string;
	parent?: {
		id: number;
		uuid: string;
		name: string;
	};
	subCategories?: Category[];
	structure?: {
		id: number;
		name: string;
	};
}
