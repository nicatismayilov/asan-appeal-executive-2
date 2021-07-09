import { Menu } from "types/common";
import Observer, { Listener } from "./Observer";

/* Events */
export interface GetMenusSuccess {
	menu: Menu;
}

/* Observers Dictionary */
// GMS -> GetMenusSuccess

class EventBus {
	private static instance: EventBus;
	private GMS_Observer = new Observer<GetMenusSuccess>();

	private constructor() {}

	static getInstance() {
		if (!EventBus.instance) {
			EventBus.instance = new EventBus();
		}

		return EventBus.instance;
	}

	public publishers = {
		getMenusSuccess(event: GetMenusSuccess): void {
			EventBus.getInstance().GMS_Observer.publish(event);
		},
	};

	public subscribers = {
		onGetMenusSuccess(listener: Listener<GetMenusSuccess>): () => void {
			return EventBus.getInstance().GMS_Observer.subscribe(listener);
		},
	};
}

const eventBus = EventBus.getInstance();

export default eventBus;
