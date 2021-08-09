import { useMemo } from "react";
import { motion } from "framer-motion";
import classnames from "classnames";

import Icon from "components/Icon";

import "./styles.scss";

interface Props {
	value: boolean | "indefinite";
	onCheck: (value: boolean) => void;
	textPosition?: "top" | "right" | "bottom" | "left";
}

const Checkbox: React.FC<Props> = (props) => {
	const { value, textPosition = "right" } = props;
	const { onCheck } = props;

	// classes
	const wrapperClass = useMemo(() => {
		return classnames({
			"checkbox-wrapper": true,
			[`checkbox-wrapper--${textPosition}`]: true,
		});
	}, [textPosition]);

	const checkboxClass = useMemo(() => {
		return classnames({
			checkbox: true,
			"checkbox--active": value,
		});
	}, [value]);

	const textClass = useMemo(() => {
		return classnames({
			"checkbox-text": true,
			[`checkbox-text--${textPosition}`]: true,
		});
	}, [textPosition]);
	//

	return (
		<div
			className={wrapperClass}
			onClick={(e) => {
				e.stopPropagation();
				onCheck(!value);
			}}
		>
			<div className={checkboxClass}>
				<motion.div
					animate={{ scale: value ? 1 : 0 }}
					transition={{ type: "spring", stiffness: 1000, damping: 25 }}
					className='checkbox-icon'
				>
					<Icon icon={value === "indefinite" ? "hozirontal-line" : "check"} />
				</motion.div>
			</div>

			<div className={textClass}>{props.children}</div>
		</div>
	);
};

export default Checkbox;
