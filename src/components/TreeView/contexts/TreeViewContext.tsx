import { createContext } from "react";

type CheckedKeysMap = { [id: string]: boolean | "indefinite" };

export interface TreeViewContextState {
	defaultCheckedKeys: string[];
	defaultExpandedKeys: string[];
	checkedKeysMap: CheckedKeysMap;
}

const initialState: TreeViewContextState = {
	defaultCheckedKeys: [],
	defaultExpandedKeys: [],
	checkedKeysMap: {},
};

const TreeViewContext = createContext(initialState);

export default TreeViewContext;
