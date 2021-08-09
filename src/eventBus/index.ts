import Observer, { Listener } from "./Observer";
import { MenusLoad } from "./events";

export * from "./events";

/* Singleton implementation of Global Event Bus */
class EventBus {
	private static instance: EventBus;
	private MenusLoadObserver = new Observer<MenusLoad>();

	private constructor() {}

	static getInstance() {
		if (!EventBus.instance) {
			EventBus.instance = new EventBus();
		}

		return EventBus.instance;
	}

	public publishers = {
		menusLoad(event: MenusLoad): void {
			EventBus.getInstance().MenusLoadObserver.publish(event);
		},
	};

	public subscribers = {
		onMenusLoad(listener: Listener<MenusLoad>): () => void {
			return EventBus.getInstance().MenusLoadObserver.subscribe(listener);
		},
	};
}

const eventBus = EventBus.getInstance();

export default eventBus;
