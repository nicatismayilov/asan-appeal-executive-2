import { Organization } from "types/organization";

export interface Category {
	id: number;
	uuid: string;
	name: string;
	company?: Organization;
	parent?: Category;
	subCategories?: Category[];
}
