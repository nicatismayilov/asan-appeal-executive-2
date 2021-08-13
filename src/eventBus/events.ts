import { Menu } from "types/common";
import { IBaseEvent, IMenusLoad, IThemeChange } from "./types";
import generateKey from "utils/generateKey";

class BaseEvent implements IBaseEvent {
	public id: string;
	public name: string;
	public timestamp: Date;

	constructor(name: string) {
		this.name = name;
		this.id = generateKey();
		this.timestamp = new Date();
	}
}

export class MenusLoadEvent extends BaseEvent implements IMenusLoad {
	public menu: Menu;

	constructor(menu: Menu) {
		super("Menus Load");

		this.menu = menu;
	}
}

export class ThemeChangeEvent extends BaseEvent implements IThemeChange {
	public theme: "light" | "dark";

	constructor(theme: "light" | "dark") {
		super("Theme Change");

		this.theme = theme;
	}
}
