import { memo } from "react";

import TreeRootNode from "./components/TreeRootNode";

export interface TreeViewNode {
	title: any;
	subNodes?: TreeViewNode[];
}

interface Props {
	data: TreeViewNode[];
}

const TreeView: React.FC<Props> = (props) => {
	const { data } = props;

	return (
		<div className='tree-view'>
			{data.map((node, idx) => (
				<TreeRootNode key={idx} title={node.title} subNodes={node.subNodes} />
			))}
		</div>
	);
};

export default memo(TreeView);
