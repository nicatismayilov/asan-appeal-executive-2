import { RequestTextHistory } from "types/requests";

import "./styles.scss";

interface Props {
	history: RequestTextHistory;
}

const HistoryItem: React.FC<Props> = (props) => {
	const { history } = props;

	return (
		<div className='history-item'>
			<div className='history-item-citizen'>
				<span>Müraciət edən şəxs:</span>
				{`${history.user.firstName} ${history.user.lastName}, ${history.user.fatherName}`}
			</div>

			<div className='history-item-text'>
				<span>Qeyd:</span>
				{history.text}
			</div>

			<div className='history-item-date'>
				<span>Tarix:</span>
				{history.dateStr}
			</div>
		</div>
	);
};

export default HistoryItem;
