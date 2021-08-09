import { useState, useCallback, useEffect } from "react";

import TreeNode from "./components/TreeNode";

import TreeViewContext, { TreeViewContextState } from "./contexts/TreeViewContext";

import { parseProp } from "./utils";

import "./styles.scss";

export interface TreeConfig<T> {
	id: keyof T | ((node: T) => string);
	title: keyof T | ((node: T) => any);
	childrenKey: keyof T;
	hasChildKey?: keyof T;
}

type CheckedNodesMap<T> = { [id: string]: T | undefined };

export interface Props<T> {
	data: T[];
	config: TreeConfig<T>;
	async?: boolean;
	defaultOpen?: boolean;
	checkable?: boolean;
	defaultCheckedKeys?: string[];
	defaultExpandedKeys?: string[];
	onCheck?: (cn: T[], ck: string[]) => void;
	onSelect?: (node: T) => void;
	onLoad?: (node: T) => void;
	selected?: T;
	multiple?: boolean;
	selectable?: boolean;
}

const TreeView = <T,>(props: Props<T>) => {
	const {
		data,
		config,
		async = false,
		defaultOpen = false,
		checkable = false,
		defaultCheckedKeys = [],
		defaultExpandedKeys = [],
		onCheck,
		onSelect,
		onLoad,
		selected,
		selectable = true,
	} = props;
	const [contextState, setContextState] = useState<TreeViewContextState>({
		defaultCheckedKeys,
		defaultExpandedKeys,
		checkedKeysMap: {},
	});
	const [checkedNodesMap, setCheckedNodesMap] = useState<CheckedNodesMap<T>>({});

	const handleCheck = useCallback((id: string, value: boolean | "indefinite", node: T) => {
		setContextState((prev) => ({
			...prev,
			checkedKeysMap: { ...prev.checkedKeysMap, [id]: value },
		}));

		setCheckedNodesMap((prev) => ({ ...prev, [id]: value ? node : undefined }));
	}, []);

	const handleSelect = useCallback(
		(node: T) => {
			if (onSelect && selectable) onSelect(node);
		},
		[onSelect, selectable]
	);

	const handleLoad = useCallback(
		(node: T) => {
			if (onLoad && async) onLoad(node);
		},
		[async, onLoad]
	);

	useEffect(() => {
		if (onCheck) {
			const { checkedKeysMap } = contextState;
			const checkedNodes = Object.values(checkedNodesMap).filter((n) => n !== undefined) as T[];
			const checkedKeys = Object.keys(checkedKeysMap).filter((k) => checkedKeysMap[k]);

			onCheck(checkedNodes, checkedKeys);
		}
	}, [checkedNodesMap, contextState, onCheck]);

	return (
		<div className='tree-view'>
			<TreeViewContext.Provider value={contextState}>
				{data.map((node) => {
					return (
						<TreeNode
							key={parseProp(config.id, node)}
							node={node}
							id={config.id}
							title={config.title}
							childrenKey={config.childrenKey}
							hasChildKey={config.hasChildKey}
							level={0}
							async={async}
							defaultOpen={defaultOpen}
							checkable={checkable}
							onCheck={handleCheck}
							onSelect={handleSelect}
							onLoad={handleLoad}
							selected={selected}
						/>
					);
				})}
			</TreeViewContext.Provider>
		</div>
	);
};

export default TreeView;
