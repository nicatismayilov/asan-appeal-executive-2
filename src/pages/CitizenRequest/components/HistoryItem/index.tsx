import { RequestTextHistory } from "types/requests";

import getFullName from "utils/getFullName";
import getDateFormatString from "utils/getDateFormatString";

import "./styles.scss";

interface Props {
	history: RequestTextHistory;
}

const HistoryItem: React.FC<Props> = (props) => {
	const { history } = props;

	return (
		<div className='history-item'>
			<div className='history-item-left'>
				<div className='history-item-user'>
					<div className='history-item-user-fullname grey-3--text'>{getFullName(history.user)}</div>

					<div className='history-item-user-step'>{history.step}</div>
				</div>

				<div className='history-item-date grey-1--text'>
					{getDateFormatString(history.dateStr, "d MMMM Y HH:mm")}
				</div>
			</div>

			<div className='history-item-right'>
				<div className='history-item-text grey-3--text'>
					{history.text || (
						<div className='history-item-text--empty grey-1--text'>(Qeyd yoxdur)</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default HistoryItem;
