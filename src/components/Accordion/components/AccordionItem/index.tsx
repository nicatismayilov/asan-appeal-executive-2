import { useMemo, memo, useState } from "react";
import classnames from "classnames";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";

import { ReactComponent as ArrowDown } from "../../assets/chevron-down.svg";
import "./styles.scss";

interface Props {
	title: any;
	content: any;
}

const variants: Variants = {
	open: { height: "auto" },
	collapsed: { height: 0 },
};

const transition: Transition = { duration: 0.2 };

const AccordionItem: React.FC<Props> = (props) => {
	const { title, content } = props;
	const [active, setActive] = useState(false);

	const arrowDownClass = useMemo(() => {
		return classnames({
			"accordion-item-title-svg": true,
			"accordion-item-title-svg--active": active,
		});
	}, [active]);

	const handleToggleActive = () => {
		setActive((prev) => !prev);
	};

	return (
		<motion.div transition={transition} className='accordion-item card'>
			<div className='accordion-item-title' onClick={handleToggleActive}>
				{title}

				<ArrowDown className={arrowDownClass} />
			</div>

			<AnimatePresence>
				{active && (
					<motion.div
						variants={variants}
						transition={transition}
						initial='collapsed'
						animate='open'
						exit='collapsed'
						className='accordion-item-content'
					>
						{content}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default memo(AccordionItem);
