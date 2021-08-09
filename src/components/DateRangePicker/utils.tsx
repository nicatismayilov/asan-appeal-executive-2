import { CSSProperties } from "react";

type X_POSITION = "right" | "left";
type Y_POSITION = "top" | "bottom";
type RECT = DOMRect | null;

interface Arguments {
	rect: RECT;
	x: X_POSITION;
	y: Y_POSITION;
	windowHeight: number;
	windowWidth: number;
}

export function computeStyles(args: Arguments): CSSProperties {
	const { rect, x, y, windowHeight, windowWidth } = args;

	if (rect) {
		const { x: rect_x, width, bottom, y: rect_y } = rect;
		const topPos = bottom + 4;
		const bottomPos = windowHeight - (rect_y - 4);

		return {
			left: x === "left" ? rect_x : undefined,
			right: x === "right" ? windowWidth - (rect_x + width) : undefined,
			top: y === "top" ? topPos : undefined,
			bottom: y === "bottom" ? bottomPos : undefined,
			transformOrigin: y === "top" ? "center top" : "center bottom",
		};
	}

	return {
		left: 0,
		top: y === "top" ? "calc(100% + 4px)" : undefined,
		bottom: y === "bottom" ? "calc(100% + 4px)" : undefined,
		transformOrigin: y === "top" ? "center top" : "center bottom",
	};
}
