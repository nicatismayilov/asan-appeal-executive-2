import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";

import { getRequests } from "store/requests/actions";
import {
	selectRequests,
	selectRequestsLoading,
	selectRequestsTotalCount,
} from "store/requests/selectors";
import { selectActiveMenuCanEdit } from "store/user/selectors";

import Scrollbar from "components/Scrollbar";
import Table, { Pagination } from "components/Table";

import { GetRequestsParams } from "apiServices/requestsService";

import columns from "./tableColumns";

const pagination: Pagination = {
	showTotal: (total, range) => `${total} müraciətdən ${range[0]} - ${range[1]}`,
	showRowCountChanger: true,
};

interface RouteParams {
	menu: string;
}

const Requests: React.FC = () => {
	const dispatch = useDispatch();
	const routeParams = useParams<RouteParams>();
	const history = useHistory();
	const match = useRouteMatch();
	const requests = useSelector(selectRequests);
	const requestsTotalCount = useSelector(selectRequestsTotalCount);
	const loading = useSelector(selectRequestsLoading);
	const canEdit = useSelector(selectActiveMenuCanEdit);

	const handleTableChange = useCallback(
		(p: Pagination) => {
			const params: GetRequestsParams = {
				menu: routeParams.menu,
				max: p.rowCount,
				offset: ((p.activePage || 1) - 1) * (p.rowCount || 10),
			};

			dispatch(getRequests(params));
		},
		[dispatch, routeParams.menu]
	);

	const clickHandler = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			const id = (e.currentTarget.dataset["reqid"] || -1).toString();
			history.push(`${match.url}/${id}`);
		},
		[history, match.url]
	);

	return (
		<div className='w-100 h-100'>
			<Scrollbar>
				<div className='pa-10'>
					<Table
						data={requests}
						columns={columns({ canEdit, buttonHandler: clickHandler })}
						totalCount={requestsTotalCount}
						serverSide
						onChange={handleTableChange}
						pagination={pagination}
						loading={loading}
					/>
				</div>
			</Scrollbar>
		</div>
	);
};

export default Requests;
