import Observer, { Listener } from "./Observer";
import { MenusLoadEvent, ThemeChangeEvent } from "./events";

export * from "./events";

/* Singleton implementation of Global Event Bus */
class EventBus {
	private static instance: EventBus;
	private MenusLoadObserver = new Observer<MenusLoadEvent>();
	private ThemeChangeObserver = new Observer<ThemeChangeEvent>();

	private constructor() {}

	static getInstance() {
		if (!EventBus.instance) {
			EventBus.instance = new EventBus();
		}

		return EventBus.instance;
	}

	public publishers = {
		menusLoad(event: MenusLoadEvent): void {
			EventBus.getInstance().MenusLoadObserver.publish(event);
		},

		themeChange(event: ThemeChangeEvent): void {
			EventBus.getInstance().ThemeChangeObserver.publish(event);
		},
	};

	public subscribers = {
		onMenusLoad(listener: Listener<MenusLoadEvent>): () => void {
			return EventBus.getInstance().MenusLoadObserver.subscribe(listener);
		},

		onThemeChange(listener: Listener<ThemeChangeEvent>): () => void {
			return EventBus.getInstance().ThemeChangeObserver.subscribe(listener);
		},
	};
}

const eventBus = EventBus.getInstance();

export default eventBus;
