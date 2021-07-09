import { memo, useState, useMemo, useCallback, useEffect } from "react";
import classnames from "classnames";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";

import { ReactComponent as ArrowDown } from "../../assets/chevron-down.svg";
import "./styles.scss";

interface Props {
	title: any;
	defaultOpen?: boolean;
}

const variants: Variants = {
	open: { height: "auto" },
	collapsed: { height: 0 },
};

const transition: Transition = { bounce: 0 };

const TreeNode: React.FC<Props> = (props) => {
	const { title, defaultOpen = false } = props;
	const [isOpen, setOpen] = useState(defaultOpen);

	const titleClass = useMemo(() => {
		return classnames({
			"tree-view-node-title": true,
			"tree-view-node-title--no-children": !props.children,
			"tree-view-node-title--active": isOpen,
		});
	}, [props.children, isOpen]);

	const arrowDownClass = useMemo(() => {
		return classnames({
			"tree-view-node-arrow-down": true,
			"tree-view-node-arrow-down--active": isOpen,
		});
	}, [isOpen]);

	const handleToggleOpen = useCallback(() => {
		if (props.children) setOpen((o) => !o);
	}, [props.children]);

	const closeEffect = () => {
		if (!props.children) setOpen(false);
	};

	useEffect(closeEffect, [props.children]);

	return (
		<div className='tree-view-node'>
			<div className={titleClass} onClick={handleToggleOpen}>
				{props.children && (
					<div className='tree-view-node-arrow-down-wrapper'>
						<ArrowDown className={arrowDownClass} />
					</div>
				)}

				{title}
			</div>

			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						key='content'
						initial='collapsed'
						animate='open'
						exit='collapsed'
						variants={variants}
						transition={transition}
						className='tree-view-node-content'
					>
						{props.children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default memo(TreeNode) as typeof TreeNode;
