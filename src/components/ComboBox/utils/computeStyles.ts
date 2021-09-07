import { CSSProperties } from "react";

type ComboboxRect = DOMRect | null;

export interface Args {
	rect: ComboboxRect;
	windowHeight: number;
	position: "top" | "bottom";
}

function computeStyles(args: Args): CSSProperties | undefined {
	const { rect, windowHeight, position } = args;

	if (!rect) return undefined;

	const { width, left } = rect;
	const topPos = rect.bottom + 5;
	const bottomPos = windowHeight - (rect.y - 5);
	const top = position === "top" ? topPos : "auto";
	const bottom = position === "bottom" ? bottomPos : "auto";
	const transformOrigin = position === "top" ? "top center" : "bottom center";

	return { width, top, bottom, left, transformOrigin };
}

export default computeStyles;
