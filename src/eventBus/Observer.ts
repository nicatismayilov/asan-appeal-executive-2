export type Listener<EventType> = (e: EventType) => void;

interface IObserver<EventType> {
	subscribe: (listener: Listener<EventType>) => () => void;
	publish: (event: EventType) => void;
}

class Observer<EventType> implements IObserver<EventType> {
	private listeners: Listener<EventType>[] = [];

	subscribe(listener: Listener<EventType>): () => void {
		this.listeners = [...this.listeners, listener];

		return () => {
			this.listeners = this.listeners.filter((l) => l !== listener);
		};
	}

	publish(event: EventType): void {
		this.listeners.forEach((l) => l(event));
	}
}

export default Observer;
