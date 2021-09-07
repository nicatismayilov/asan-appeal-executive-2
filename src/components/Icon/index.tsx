import { SVGProps } from "react";

import icons, { IconName } from "./components/icons";

export type { IconName } from "./components/icons";

interface Props {
	icon: IconName;
}

const Icon: React.FC<Props & SVGProps<SVGSVGElement>> = (props) => {
	const { icon, ...rest } = props;
	const SelectedIcon = icons[icon];

	if (SelectedIcon) return <SelectedIcon {...rest} />;
	else return null;
};

export default Icon;
