import { useEffect, memo } from "react";

import AlertIcon from "./components/AlertIcon";

import { AlertType } from "types/alert";

import { ReactComponent as DismissIcon } from "./assets/dismiss.svg";
import "./styles.scss";

interface Props {
	id: string;
	type: AlertType;
	text: string;
	selfRemove?: boolean;
	removeTimeout?: number;

	onRemove?: (id: string) => void;
}

const Alert: React.FC<Props> = (props) => {
	const { text, type, id, selfRemove = false, removeTimeout = 5000 } = props;
	const { onRemove } = props;

	const selfRemoveEffect = () => {
		let timeout: NodeJS.Timeout;

		if (selfRemove) {
			timeout = setTimeout(() => {
				onRemove && onRemove(id);
			}, removeTimeout);
		}

		return () => {
			clearTimeout(timeout);
		};
	};

	useEffect(selfRemoveEffect, [id, onRemove, selfRemove, removeTimeout]);

	return (
		<li className={`alert alert--${type}`}>
			<div className='row justify-between align-center h-100'>
				<div className='col-10 d-flex align-center h-100'>
					<AlertIcon type={type} />

					<div className='alert__text'>{text}</div>
				</div>

				<div className='col-2 d-flex justify-end'>
					<button className='alert__btn' onClick={() => onRemove && onRemove(id)}>
						<DismissIcon />
					</button>
				</div>
			</div>
		</li>
	);
};

export default memo(Alert);
