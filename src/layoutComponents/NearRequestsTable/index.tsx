import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

import { getNearRequests } from "store/requests/actions";

import {
	selectNearRequests,
	selectNearRequestsLoading,
	selectNearRequestsTotalCount,
} from "store/requests/selectors";
import { selectActiveMenu } from "store/user/selectors";

import Table, { TableColumn } from "components/Table";

import { Request } from "types/requests";
import { GetNearRequestsParams } from "apiServices/requestsService";

interface Props {
	checkable?: boolean;
	columns: TableColumn<Request>[];
	longitude: number;
	latitude: number;
	completed?: boolean;
}

const NearRequestsTable: React.FC<Props> = (props) => {
	const { checkable, columns, longitude, latitude, completed } = props;
	const dispatch = useDispatch();
	const activeMenu = useSelector(selectActiveMenu);
	const nearRequests = useSelector(selectNearRequests);
	const nearRequestsLoading = useSelector(selectNearRequestsLoading);
	const nearRequestsTotalCount = useSelector(selectNearRequestsTotalCount);
	const { ref, inView } = useInView({ triggerOnce: true });

	useEffect(() => {
		if (inView) {
			const key = activeMenu.url.split("/")[1];
			const payload: GetNearRequestsParams = {
				sameStatus: true,
				key,
				distance: 50,
				longitude,
				latitude,
				completed,
			};

			dispatch(getNearRequests(payload));
		}
	}, [activeMenu.url, completed, dispatch, inView, latitude, longitude]);

	return (
		<div ref={ref}>
			<Table
				title='Gözləmədə olan müraciətlər'
				data={nearRequests}
				columns={columns}
				totalCount={nearRequestsTotalCount}
				loading={nearRequestsLoading}
				checkable={checkable}
			/>
		</div>
	);
};

export default NearRequestsTable;
