import { useCallback, useRef, memo, ReactNode, Fragment, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "@reach/window-size";

import Scrollbar from "components/Scrollbar";

import { checkHeightStr } from "./utils";

import "./styles.scss";

interface Props {
	active: boolean;
	closable?: boolean;
	onClose: () => void;
	children?: ReactNode;
	className?: string;
	name?: string;

	maxHeight?: number | string;
	minHeight?: number | string;
}

const Modal: React.FC<Props> = (props) => {
	const { active, children, className, maxHeight = "90vh", minHeight = "15vh" } = props;
	const { onClose } = props;
	const modalWrapperRef = useRef<HTMLDivElement>(null);
	const windowSize = useWindowSize();

	const autoHeightMin = useMemo(() => {
		if (typeof minHeight === "number") return minHeight;
		else return windowSize.height * checkHeightStr(minHeight, "15vh");
	}, [minHeight, windowSize.height]);

	const autoHeightMax = useMemo(() => {
		if (typeof maxHeight === "number") return maxHeight;
		else return windowSize.height * checkHeightStr(maxHeight, "90vh");
	}, [maxHeight, windowSize.height]);

	const handleClose = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (e.target === modalWrapperRef.current) onClose && onClose();
		},
		[onClose]
	);

	return createPortal(
		<AnimatePresence>
			{active && (
				<Fragment>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						ref={modalWrapperRef}
						className='modal-wrapper'
						onClick={handleClose}
					/>

					<motion.div
						initial={{ scale: 0.5 }}
						animate={{ scale: 1 }}
						className={`modal ${className}`}
					>
						<Scrollbar autoHeight autoHeightMax={autoHeightMax} autoHeightMin={autoHeightMin}>
							{children}
						</Scrollbar>
					</motion.div>
				</Fragment>
			)}
		</AnimatePresence>,
		document.getElementById("root") || document.createElement("div")
	);
};

export default memo(Modal);
