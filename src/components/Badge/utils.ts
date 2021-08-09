import { CSSProperties } from "react";

type BadgeRect = DOMRect | null;

interface IArguments {
	rect: BadgeRect;
	distanceX: number;
	distanceY: number;
}

export function computeStyles(args: IArguments): CSSProperties {
	const { rect, distanceX, distanceY } = args;

	if (rect) {
		const { x, y, width } = rect;

		return { bottom: window.innerHeight - y - distanceY, left: x + width - distanceX };
	} else return {};
}
