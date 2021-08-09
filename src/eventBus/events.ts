import { Menu } from "types/common";
import { IBaseEvent, IMenusLoad } from "./types";
import generateKey from "utils/generateKey";

export class BaseEvent implements IBaseEvent {
	public id: string;
	public name: string;
	public timestamp: Date;

	constructor(name: string) {
		this.name = name;
		this.id = generateKey();
		this.timestamp = new Date();
	}
}

export class MenusLoad extends BaseEvent implements IMenusLoad {
	public menu: Menu;

	public constructor(menu: Menu) {
		super("Menus Load");

		this.menu = menu;
	}
}
