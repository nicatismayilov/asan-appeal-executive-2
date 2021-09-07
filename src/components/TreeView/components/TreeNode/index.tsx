import React, { memo, useState, useMemo, useContext, useEffect, useCallback, useRef } from "react";
import classnames from "classnames";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";

import Icon from "components/Icon";
import Checkbox from "components/Checkbox";
import Spinner from "components/Spinner";

import TreeViewContext from "../../contexts/TreeViewContext";

import { parseProp } from "../../utils";

import "./styles.scss";

interface Props<T> {
	node: T;
	id: keyof T | ((node: T) => string);
	title: keyof T | ((node: T) => any);
	childrenKey: keyof T;
	hasChildKey?: keyof T;
	defaultOpen: boolean;
	level: number;
	async: boolean;
	checkable: boolean;
	onCheck: (id: string, value: boolean | "indefinite", node: T) => void;
	onSelect: (node: T) => void;
	onLoad: (node: T) => void;
	selected?: T;
}

const variants: Variants = {
	open: { height: "auto", marginBottom: -5 },
	collapsed: { height: 0, marginBottom: 0 },
};

const transition: Transition = { bounce: 0 };

const TreeNode = <T,>(props: Props<T>) => {
	const {
		node,
		id,
		title,
		childrenKey,
		hasChildKey,
		defaultOpen,
		level,
		async,
		checkable,
		onCheck,
		onSelect,
		onLoad,
		selected,
	} = props;
	const [open, setOpen] = useState(defaultOpen);
	const [loading, setLoading] = useState(false);
	const isLoadedRef = useRef(false);
	const context = useContext(TreeViewContext);

	const nodeClass = useMemo(() => {
		return classnames({
			"tv-node": true,
			"tv-node--no-padding": level === 0,
		});
	}, [level]);

	const titleClass = useMemo(() => {
		return classnames({
			"tv-node-title": true,
			"tv-node-title--open": open,
			"tv-node-title--selected": selected && parseProp(id, node) === parseProp(id, selected),
		});
	}, [id, node, open, selected]);

	const toggleIconClass = useMemo(() => {
		return classnames({
			"tv-node-toggle-icon": true,
			"tv-node-toggle-icon--active": open,
			"tv-node-toggle-icon--selected": selected && parseProp(id, node) === parseProp(id, selected),
		});
	}, [id, node, open, selected]);

	const hasChildren = useMemo(() => {
		if (async && hasChildKey && node[hasChildKey]) return true;

		return node[childrenKey] && ((node[childrenKey] as unknown) as T[])?.length > 0;
	}, [async, childrenKey, hasChildKey, node]);

	const children = useMemo(() => {
		return (node[childrenKey] as unknown) as T[];
	}, [childrenKey, node]);

	const handleToggleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();

		if (!async || isLoadedRef.current) {
			setOpen((prev) => !prev);
			return;
		}

		setLoading(true);
		onLoad(node);
	};

	const handleCheckboxChange = useCallback(
		(value: boolean | "indefinite") => {
			onCheck(parseProp(id, node), value, node);
		},
		[id, node, onCheck]
	);

	const handleSelect = useCallback(() => {
		onSelect(node);
	}, [node, onSelect]);

	useEffect(() => {
		const isDefaultChecked = context.defaultCheckedKeys.some((key) => key === parseProp(id, node));

		if (isDefaultChecked && checkable) {
			onCheck(parseProp(id, node), true, node);
		}
	}, [checkable, context.defaultCheckedKeys, id, node, onCheck]);

	useEffect(() => {
		const isDefaultOpen = context.defaultExpandedKeys.some((key) => key === parseProp(id, node));

		if (isDefaultOpen && hasChildren) {
			setOpen(true);
		}
	}, [context.defaultExpandedKeys, hasChildren, id, node]);

	useEffect(() => {
		const hasChildren = node[childrenKey] && ((node[childrenKey] as unknown) as T[])?.length > 0;

		if (hasChildren && children && !isLoadedRef.current) {
			isLoadedRef.current = true;

			setLoading(false);
		}
	}, [children, childrenKey, hasChildren, loading, node]);

	return (
		<div className={nodeClass}>
			<div className={titleClass} onClick={handleSelect}>
				{loading ? (
					<div className='mr-1'>
						<Spinner size={18} />
					</div>
				) : hasChildren ? (
					<div className='tv-node-toggle' onClick={handleToggleClick}>
						<Icon icon='chevron-right' className={toggleIconClass} />
					</div>
				) : (
					<div className='tv-node-toggle-placeholder' />
				)}

				{checkable && (
					<Checkbox
						value={context.checkedKeysMap[parseProp(id, node)]}
						onChange={handleCheckboxChange}
					/>
				)}

				<div className='tv-node-title-text'>{parseProp(title, node)}</div>
			</div>

			<AnimatePresence initial={false}>
				{open && hasChildren && (
					<motion.div
						key='content'
						initial='collapsed'
						animate='open'
						exit='collapsed'
						variants={variants}
						transition={transition}
						className='tv-node-children'
					>
						{hasChildren &&
							children.map((n) => (
								<TreeNode
									key={parseProp(id, n)}
									node={n}
									id={id}
									title={title}
									childrenKey={childrenKey}
									hasChildKey={hasChildKey}
									level={level + 1}
									async={async}
									defaultOpen={defaultOpen}
									checkable={checkable}
									onCheck={onCheck}
									onSelect={onSelect}
									onLoad={onLoad}
									selected={selected}
								/>
							))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default memo(TreeNode) as typeof TreeNode;
