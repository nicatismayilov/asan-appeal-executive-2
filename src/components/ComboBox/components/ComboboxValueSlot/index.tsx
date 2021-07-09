import { useMemo, memo } from "react";
import { motion, Transition, Variants } from "framer-motion";
import classnames from "classnames";

import { ComboboxValue } from "../..";

import { ReactComponent as ClearIcon } from "../../assets/reset.svg";

const variants: Variants = {
	mount: { opacity: 1, width: "auto" },
	unmount: { opacity: 1, width: 0 },
};

const transition: Transition = { type: "spring", damping: 100, stiffness: 1000, mass: 5 };

interface Props {
	value: ComboboxValue;
	idx: number;
	readonly: boolean;

	onDissmissValue: (idx: number) => void;
}

const ComboboxValueSlot: React.FC<Props> = (props) => {
	const { value, idx, readonly } = props;
	const { onDissmissValue } = props;

	const valueSlotClass = useMemo(() => {
		return classnames({
			"combobox-value-slot": true,
			"combobox-value-slot--readonly": readonly,
		});
	}, [readonly]);

	const handleDismissValue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const idx = +(e.currentTarget.dataset["idx"] || -1);
		onDissmissValue(idx);
	};

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
				{value.text}

				{!readonly && (
					<button
						className='combobox-value-slot-remove-btn'
						type='button'
						data-idx={`${idx}`}
						onClick={handleDismissValue}
						children={<ClearIcon />}
					/>
				)}
			</div>
		</motion.div>
	);
};

export default memo(ComboboxValueSlot);
