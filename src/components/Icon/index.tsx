import { SVGProps } from "react";

import icons from "./icons";

const Icon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
	const { name = "", ...rest } = props;
	const SelectedIcon = icons[name];

	if (SelectedIcon) return <SelectedIcon {...rest} />;
	else return null;
};

export default Icon;
