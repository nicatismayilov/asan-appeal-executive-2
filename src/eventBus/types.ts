import { Menu } from "types/common";

/* Base Event */
export interface IBaseEvent {
	id: string;
	name: string;
	timestamp: Date;
}

/* Events */
export interface IMenusLoad extends IBaseEvent {
	menu: Menu;
}
