import { useMemo, memo } from "react";
import { motion, Transition, Variants } from "framer-motion";
import classnames from "classnames";

import { ReactComponent as ClearIcon } from "../../assets/reset.svg";

const variants: Variants = {
	mount: { opacity: 1, width: "auto" },
	unmount: { opacity: 1, width: 0 },
};

const transition: Transition = { type: "spring", damping: 100, stiffness: 1000, mass: 5 };

interface Props<T> {
	value: T;
	idx: number;
	readonly: boolean;
	render: (value: T) => any;
	onDissmissValue: (idx: number) => void;
}

function ComboboxValueSlot<T>(props: Props<T>): React.ReactElement | null {
	const { value, idx, readonly } = props;
	const { onDissmissValue, render } = props;

	const valueSlotClass = useMemo(() => {
		return classnames({
			"combobox-value-slot": true,
			"combobox-value-slot--readonly": readonly,
		});
	}, [readonly]);

	return (
		<motion.div
			initial='unmount'
			exit='unmount'
			animate='mount'
			layout
			variants={variants}
			transition={transition}
			style={{ overflow: "hidden" }}
		>
			<div className={valueSlotClass} onClick={(e) => e.stopPropagation()}>
				{render(value)}

				{!readonly && (
					<button
						className='combobox-value-slot-remove-btn'
						type='button'
						onClick={() => onDissmissValue(idx)}
						children={<ClearIcon />}
					/>
				)}
			</div>
		</motion.div>
	);
}

export default memo(ComboboxValueSlot) as typeof ComboboxValueSlot;
