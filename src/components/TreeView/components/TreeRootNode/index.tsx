import { memo } from "react";

import TreeNode from "../TreeNode";

import { TreeViewNode } from "../..";

interface Props extends TreeViewNode {}

const TreeRootNode: React.FC<Props> = (props) => {
	const { title, subNodes } = props;

	return (
		<TreeNode title={title}>
			{subNodes &&
				subNodes.length > 0 &&
				subNodes.map((node, idx) => (
					<TreeRootNode key={idx} title={node.title} subNodes={node.subNodes} />
				))}
		</TreeNode>
	);
};

export default memo(TreeRootNode);
