export interface NavigationItem {
	name: string;
	icon: string;
	to: string;
}

const navigationItems: NavigationItem[] = [
	{
		name: "İstifadəçilər",
		icon: "user-account",
		to: "employees",
	},
	{
		name: "İştirakçı təşkilatlar",
		icon: "company",
		to: "organizations",
	},
	{
		name: "Təsnifatlar",
		icon: "categorize",
		to: "categories",
	},
	{
		name: "Müştərilər",
		icon: "headset",
		to: "customers",
	},
];

export default navigationItems;
