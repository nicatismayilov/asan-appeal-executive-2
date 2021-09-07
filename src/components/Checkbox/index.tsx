import { useMemo, MouseEvent } from "react";
import { motion } from "framer-motion";
import classnames from "classnames";

import Icon from "components/Icon";

import "./styles.scss";

interface Props {
	value: boolean | "indefinite";
	textPosition?: "top" | "right" | "bottom" | "left";
	disabled?: boolean;
	onChange?: (value: boolean | "indefinite") => void;
}

const Checkbox: React.FC<Props> = (props) => {
	const { value, textPosition = "right", disabled = false } = props;
	const { onChange } = props;

	// classes
	const wrapperClass = useMemo(() => {
		return classnames({
			"checkbox-wrapper": true,
			[`checkbox-wrapper--${textPosition}`]: !!props.children,
			"checkbox-wrapper--disabled": disabled,
		});
	}, [disabled, props.children, textPosition]);

	const checkboxClass = useMemo(() => {
		return classnames({
			checkbox: true,
			"checkbox--active": value,
			"checkbox--indefinite": value === "indefinite",
		});
	}, [value]);

	const textClass = useMemo(() => {
		return classnames({
			"checkbox-text": true,
			[`checkbox-text--${textPosition}`]: true,
		});
	}, [textPosition]);
	//

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		if (disabled) return;

		e.stopPropagation();
		onChange?.(value === "indefinite" ? true : !value);
	};

	return (
		<div className={wrapperClass} onClick={handleClick}>
			<div className={checkboxClass}>
				<motion.div
					initial={false}
					animate={{ scale: value ? 1 : 0 }}
					transition={{ type: "spring", stiffness: 1000, damping: 25 }}
					className='checkbox-icon'
				>
					<Icon icon={value === "indefinite" ? "horizontal-line" : "check"} />
				</motion.div>
			</div>

			{props.children && <div className={textClass}>{props.children}</div>}
		</div>
	);
};

export default Checkbox;
