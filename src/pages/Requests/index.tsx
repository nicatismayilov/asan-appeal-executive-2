import { useCallback, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { format } from "date-fns";

import { getRequests } from "store/requests/actions";
import {
	selectRequests,
	selectProblems,
	selectRequestsLoading,
	selectRequestsTotalCount,
} from "store/requests/selectors";
import { selectActiveMenuCanEdit, selectActiveMenu } from "store/user/selectors";

import Table, { Pagination, Sorter } from "components/Table";
import Filters from "./Filters";

import { requestsTableColumns, problemTableColumns } from "./tableColumns";
import { Problem, Request } from "types/requests";
import { Filters as FiltersType } from "./Filters/form";

import "./styles.scss";

interface RouteParams {
	menu: string;
}

const pageSizeOptions = [10, 25, 50, 100];

const showTotal = (total: number, range: [number, number]) => {
	return `${total} müraciətdən ${range[0]} - ${range[1]}`;
};

const Requests: React.FC = () => {
	const dispatch = useDispatch();
	const routeParams = useParams<RouteParams>();
	const history = useHistory();
	const match = useRouteMatch();
	const requests = useSelector(selectRequests);
	const problems = useSelector(selectProblems);
	const requestsTotalCount = useSelector(selectRequestsTotalCount);
	const loading = useSelector(selectRequestsLoading);
	const canEdit = useSelector(selectActiveMenuCanEdit);
	const activeMenu = useSelector(selectActiveMenu);
	const [pagination, setPagination] = useState<Pagination>({ pageIndex: 0, pageSize: 10 });
	const [sorter, setSorter] = useState<Sorter<Problem | Request>>([]);

	const buttonHandler = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			const id = (e.currentTarget.dataset["reqid"] || -1).toString();

			history.push(`${match.url}/${id}`);
		},
		[history, match.url]
	);

	const requestColumns = useMemo(() => {
		return requestsTableColumns({ canEdit, buttonHandler });
	}, [canEdit, buttonHandler]);

	const problemColumns = useMemo(() => {
		return problemTableColumns({ canEdit, buttonHandler });
	}, [canEdit, buttonHandler]);

	const requestParams = useMemo(() => {
		const menu = routeParams.menu;
		const max = pagination.pageSize;
		const offset = pagination.pageIndex * pagination.pageSize;
		const sort_by = sorter[0] && sorter[0].id;
		const order: "asc" | "desc" | undefined = sorter[0] && (sorter[0].desc ? "desc" : "asc");

		return { menu, max, offset, sort_by, order };
	}, [pagination.pageIndex, pagination.pageSize, routeParams.menu, sorter]);

	const handleProblemsTableChange = useCallback((p: Pagination, s: Sorter<Problem>) => {
		setPagination(p);
		setSorter(s);
	}, []);

	const handleRequestsTableChange = useCallback((p: Pagination, s: Sorter<Request>) => {
		setPagination(p);
		setSorter(s);
	}, []);

	const handleSearch = useCallback(
		(filters: FiltersType) => {
			console.log("fired");

			const dateFormat = "dd.MM.yyyy HH:mm:ss";
			const startDateStr = filters.startDateStr && format(filters.startDateStr, dateFormat);
			const endDateStr = filters.endDateStr && format(filters.endDateStr, dateFormat);
			const priority = filters.priority?.name;
			const parentOfficeId = filters.parentOfficeId?.id;
			const officeId = filters.officeId?.id;
			const regionId = filters.regionId?.id;
			const executorUUID = filters.executorUUID?.uuid;
			const executiveId = filters.executiveId?.id;
			const representationId = filters.representationId?.id;
			const stepId = filters.stepId?.id;
			const { problemNum, requestNum, completed } = filters;

			dispatch(
				getRequests({
					...requestParams,
					startDateStr,
					endDateStr,
					priority,
					parentOfficeId,
					officeId,
					regionId,
					executorUUID,
					executiveId,
					representationId,
					stepId,
					problemNum,
					requestNum,
					completed,
				})
			);
		},
		[dispatch, requestParams]
	);

	useEffect(() => {
		dispatch(getRequests({ ...requestParams }));
	}, [dispatch, requestParams]);

	return (
		<div className='w-100 h-100'>
			<Filters onSearch={handleSearch} />

			<div className='pa-10'>
				{activeMenu.type === "REQUEST" && (
					<Table
						data={requests}
						columns={requestColumns}
						totalCount={requestsTotalCount}
						onChange={handleRequestsTableChange}
						loading={loading}
						showTotal={showTotal}
						showPageSizeOptions
						pageSizeOptions={pageSizeOptions}
						serverSide
					/>
				)}

				{activeMenu.type === "PROBLEM" && (
					<Table
						data={problems}
						columns={problemColumns}
						totalCount={requestsTotalCount}
						onChange={handleProblemsTableChange}
						loading={loading}
						showTotal={showTotal}
						showPageSizeOptions
						pageSizeOptions={pageSizeOptions}
						serverSide
						checkable
						onSelectionChange={(selectedRows) => console.log(selectedRows)}
					/>
				)}
			</div>
		</div>
	);
};

export default Requests;
