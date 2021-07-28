import { Variants } from "framer-motion";
import { TooltipPosition } from "./types";

type TooltipRect = DOMRect | null;

export function computeStyles(rect: TooltipRect, position: TooltipPosition, distance: number) {
	if (rect) {
		const { x, y, width, height } = rect;

		switch (position) {
			case "top":
				return { bottom: window.innerHeight - y + distance, left: x + width / 2 };

			case "left":
				return { top: y + height / 2, right: window.innerWidth - x + distance };

			case "bottom":
				return { top: y + height + distance, left: x + width / 2 };

			case "right":
				return { top: y + height / 2, left: x + width + distance };
		}
	}
}

export function computeVariants(p: TooltipPosition): Variants {
	switch (p) {
		case "top":
			return {
				initial: { opacity: 0, scale: 0.7, y: 10, x: "-50%" },
				animate: { opacity: 1, scale: 1, y: 0, x: "-50%" },
			};

		case "bottom":
			return {
				initial: { opacity: 0, scale: 0.7, y: -10, x: "-50%" },
				animate: { opacity: 1, scale: 1, y: 0, x: "-50%" },
			};

		case "right":
			return {
				initial: { opacity: 0, scale: 0.7, x: "-25%", y: "-50%" },
				animate: { opacity: 1, scale: 1, x: 0, y: "-50%" },
			};

		case "left":
			return {
				initial: { opacity: 0, scale: 0.7, x: "20%", y: "-50%" },
				animate: { opacity: 1, scale: 1, x: 0, y: "-50%" },
			};

		default:
			return {
				initial: { opacity: 0, scale: 0.7, y: 10, x: "-50%" },
				animate: { opacity: 1, scale: 1, y: 0, x: "-50%" },
			};
	}
}
