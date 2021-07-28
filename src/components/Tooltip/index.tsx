import { useState, ReactElement, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { useRect } from "@reach/rect";
import { useWindowSize } from "@reach/window-size";

import { TooltipPosition } from "./types";
import { computeStyles, computeVariants } from "./utils";
import generateKey from "utils/generateKey";

import "./styles.scss";

interface Props {
	position?: TooltipPosition;
	content: string | ReactElement;
	distance?: number;
	disabled?: boolean;
}

const transition: Transition = { duration: 0.15 };

const Tooltip: React.FC<Props> = (props) => {
	const { position = "top", content, distance = 5, disabled = false } = props;
	const [active, setActive] = useState(false);
	const tooltipWrapperRef = useRef<HTMLDivElement>(null);
	const tooltipKey = useRef(generateKey());
	const rect = useRect(tooltipWrapperRef, { observe: active });
	const { width, height } = useWindowSize();

	const styles = useMemo(() => {
		return computeStyles(rect, position, distance);
	}, [distance, position, rect]);

	const variants = useMemo(() => {
		return computeVariants(position);
	}, [position]);

	useEffect(() => {
		tooltipKey.current = generateKey();
	}, [width, height]);

	return (
		<div
			key={tooltipKey.current}
			ref={tooltipWrapperRef}
			className='tooltip-wrapper'
			onMouseEnter={() => setActive(true)}
			onMouseLeave={() => setActive(false)}
		>
			{props.children}

			{!disabled &&
				createPortal(
					<AnimatePresence>
						{active && (
							<motion.div
								initial='initial'
								animate='animate'
								exit='initial'
								variants={variants}
								transition={transition}
								className={`tooltip-slot tooltip-slot--${position}`}
								style={styles}
							>
								{content}
							</motion.div>
						)}
					</AnimatePresence>,
					document.getElementById("root") || document.createElement("div")
				)}
		</div>
	);
};

export default Tooltip;
