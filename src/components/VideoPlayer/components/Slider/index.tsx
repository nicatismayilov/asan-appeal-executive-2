import { MouseEvent, useRef } from "react";
import { motion, Transition } from "framer-motion";
import { useRect } from "@reach/rect";
import classnames from "classnames";

import "./styles.scss";

interface Props {
	value: number;
	onChange: (val: number) => void;
	vertical?: boolean;
	verticalDirection?: "toUp" | "toBottom";
}

const transition: Transition = {
	duration: 0.1,
};

const Slider: React.FC<Props> = (props) => {
	const { value, onChange, vertical = false, verticalDirection = "toUp" } = props;
	const containerRef = useRef<HTMLDivElement>(null);
	const containerRect = useRect(containerRef);

	const handleSliderClick = (e: MouseEvent<HTMLDivElement>) => {
		if (containerRect) {
			const { pageX, pageY } = e;
			const { x, width, y, height } = containerRect;

			if (vertical) {
				if (verticalDirection === "toUp") {
					onChange((Math.abs(pageY - (y + height)) / height) * 100);
				} else {
					onChange((Math.abs(pageY - y) / height) * 100);
				}
			} else onChange(((pageX - x) / width) * 100);
		}
	};

	return (
		<div
			ref={containerRef}
			className={classnames({
				"slider-container": true,
				"slider-container--vertical": vertical,
				"slider-container--horizontal": !vertical,
				"slider-container--vertical-to-up": vertical && verticalDirection === "toUp",
				"slider-container--vertical-to-bottom": vertical && verticalDirection === "toBottom",
			})}
			onClick={handleSliderClick}
		>
			<motion.div
				transition={transition}
				className={`slider slider--${vertical ? "vertical" : "horizontal"}`}
				animate={vertical ? { height: `${value}%` } : { width: `${value}%` }}
			/>
		</div>
	);
};

export default Slider;
