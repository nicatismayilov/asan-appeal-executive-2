import { useCallback } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence, AnimateSharedLayout, Transition, Variants } from "framer-motion";

import { removeAlert } from "store/alerts/actions";
import { selectAlerts } from "store/alerts/selectors";

import Alert from "components/Alert";

import "./styles.scss";

const transition: Transition = { type: "spring", damping: 100, stiffness: 1000, mass: 5 };

const variants: Variants = {
	open: { height: "auto", opacity: 1, marginTop: 10 },
	closed: { height: 0, opacity: 0, marginTop: 0 },
};

const Alerts: React.FC = () => {
	const dispatch = useDispatch();
	const alerts = useSelector(selectAlerts);

	const handleRemove = useCallback(
		(id: string) => {
			dispatch(removeAlert(id));
		},
		[dispatch]
	);

	return createPortal(
		<AnimateSharedLayout>
			<AnimatePresence>
				{alerts.length && (
					<div className='alerts'>
						{alerts.map((alert) => (
							<motion.div
								key={alert.id}
								initial='closed'
								exit='closed'
								animate='open'
								layout
								transition={transition}
								variants={variants}
								className='alert-wrapper'
							>
								<Alert
									type={alert.type}
									id={alert.id}
									text={alert.text}
									selfRemove
									onRemove={handleRemove}
								/>
							</motion.div>
						))}
					</div>
				)}
			</AnimatePresence>
		</AnimateSharedLayout>,
		document.getElementById("root") || document.createElement("div")
	);
};

export default Alerts;
