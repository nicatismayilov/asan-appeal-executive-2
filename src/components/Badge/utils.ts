import { CSSProperties } from "react";

type BadgeRect = DOMRect | null;

export const computeStyles = (rect: BadgeRect): CSSProperties => {
	if (rect) {
		const { x, y, width } = rect;

		return { bottom: window.innerHeight - y, left: x + width };
	} else return {};
};
