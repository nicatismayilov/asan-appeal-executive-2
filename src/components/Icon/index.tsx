import { SVGProps } from "react";

import icons from "./icons";

interface Props {
	icon: string;
}

const Icon: React.FC<Props & SVGProps<SVGSVGElement>> = (props) => {
	const { icon, ...rest } = props;
	const SelectedIcon = icons[icon];

	if (SelectedIcon) return <SelectedIcon {...rest} />;
	else return null;
};

export default Icon;
