type Property<T> = keyof T | ((node: T) => string);

export function parseProp<T>(property: Property<T>, node: T) {
	if (typeof property === "function") return property(node);

	return `${node[property]}`;
}
