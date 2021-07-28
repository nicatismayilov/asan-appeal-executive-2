import { useCallback, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import { useFormik } from "formik";

import { getRequests } from "store/requests/actions";
import {
	selectRequests,
	selectProblems,
	selectRequestsLoading,
	selectRequestsTotalCount,
} from "store/requests/selectors";
import { selectActiveMenuCanEdit, selectActiveMenu } from "store/user/selectors";

// import Scrollbar from "components/Scrollbar";
import Table, { TableColumn, Pagination, Sorter } from "components/Table";
// import TextField from "components/TextField";
// import Select from "components/Select";
import TableImage from "layoutComponents/TableImage";
import Button from "components/Button";
import Skeleton from "components/Skeleton";

// import requestsColumns from "./requestsTable";
// import problemsColumns from "./problemsTable";
import { Problem, Request } from "types/requests";

// const filtersAnimationVariants: Variants = {
// 	active: { height: "auto", opacity: 1, marginTop: 10 },
// 	inactive: { height: 0, opacity: 0, marginTop: 0 },
// };

interface RouteParams {
	menu: string;
}

const tableColumns: TableColumn<Problem>[] = [
	{
		accessor: "coverMedia",
		Cell: (record) => <TableImage url={record.value} height={50} width={50} />,
		Header: "",
	},
	{
		accessor: "title",
		Header: "Müraciətin mətni",
	},
	{
		accessor: "executive",
		Header: "Nəzarət orqanı",
		Cell: ({ value }) => value?.name || "-",
	},
	{
		accessor: (row) => {
			const address =
				row.region.name +
				(row.street ? "," + row.street.name : "") +
				(row.address ? "," + row.address.replace(row.region.name, "") : "");

			return address ? address.replaceAll(", ,", ",").replace(/,\s*$/, "") : "—";
		},
		Header: "Müraciət ünvanı",
		id: "problemAddress",
	},
	{
		accessor: "dateStr",
		Header: "Müraciət tarixi",
		Cell: ({ value }) => <div style={{ width: 150 }}>{value}</div>,
		disableSortBy: false,
	},
	{
		accessor: "id",
		Cell: ({ value }) => (
			<div style={{ width: 75 }}>
				<Button data-reqid={value} size='small'>
					{/* {canEdit ? "Bax" : "Ətraflı"} */}
					Ətraflı
				</Button>
			</div>
		),
	},
];

const pageSizeOptions = [10, 25, 50, 100];

const showTotal = (total: number, range: [number, number]) => {
	return `${total} müraciətdən ${range[0]} - ${range[1]}`;
};

const Requests: React.FC = () => {
	const dispatch = useDispatch();
	const routeParams = useParams<RouteParams>();
	const history = useHistory();
	const match = useRouteMatch();
	// const requests = useSelector(selectRequests);
	const problems = useSelector(selectProblems);
	const requestsTotalCount = useSelector(selectRequestsTotalCount);
	const loading = useSelector(selectRequestsLoading);
	const canEdit = useSelector(selectActiveMenuCanEdit);
	// const activeMenu = useSelector(selectActiveMenu);
	const [pagination, setPagination] = useState<Pagination>({ pageIndex: 0, pageSize: 10 });
	const [sorter, setSorter] = useState<Sorter<Problem>>([]);
	// const [filtersActive, setFiltersActive] = useState(false);

	const handleTableChange = useCallback((p: Pagination, s: Sorter<Problem>) => {
		setPagination(p);
		setSorter(s);
	}, []);

	const clickHandler = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			const id = (e.currentTarget.dataset["reqid"] || -1).toString();
			history.push(`${match.url}/${id}`);
		},
		[history, match.url]
	);

	// const requestsTableColumns = useMemo(() => {
	// 	return requestsColumns({ canEdit, buttonHandler: clickHandler });
	// }, [canEdit, clickHandler]);

	// const problemsTableColumns = useMemo(() => {
	// 	return problemsColumns({
	// 		canEdit,
	// 		buttonHandler: clickHandler,
	// 	});
	// }, [canEdit, clickHandler]);

	useEffect(() => {
		const menu = routeParams.menu;
		const max = pagination.pageSize;
		const offset = pagination.pageIndex * pagination.pageSize;

		dispatch(getRequests({ menu, max, offset }));
	}, [dispatch, pagination, routeParams.menu]);

	return (
		<div className='w-100 h-100'>
			<div className='pa-10'>
				<div className='mb-10'>
					{/* <div className='d-flex justify-start align-center'>
							<button onClick={() => setFiltersActive((prev) => !prev)}>toggle</button>

							<span className='text-subtitle-1 font-weight-medium ml-5 employees-list-title'>
								Axtarış filtrləri
							</span>
						</div> */}

					{/* <AnimatePresence exitBeforeEnter>
							{filtersActive && (
								<motion.div
									initial='inactive'
									animate='active'
									exit='inactive'
									variants={filtersAnimationVariants}
									transition={{ type: "spring", stiffness: 700, damping: 50 }}
									className='card'
									style={{ overflow: "hidden" }}
								>
									<div className='row pa-6'>
										
									</div>
								</motion.div>
							)}
						</AnimatePresence> */}
				</div>

				{/* {activeMenu.type === "REQUEST" && (
					<Table
						data={requests}
						columns={requestsTableColumns}
						totalCount={requestsTotalCount}
						serverSide
						onChange={handleTableChange}
						pagination={pagination}
						loading={loading}
						virtual
					/>
				)} */}

				{/* {activeMenu.type === "PROBLEM" && (
					<Table
						data={problems}
						columns={problemsTableColumns}
						totalCount={requestsTotalCount}
						serverSide
						onChange={handleTableChange}
						pagination={pagination}
						loading={loading}
						virtual
					/>
				)} */}

				<Table
					data={problems}
					columns={tableColumns}
					totalCount={requestsTotalCount}
					onChange={handleTableChange}
					loading={loading}
					showTotal={showTotal}
					showPageSizeOptions
					pageSizeOptions={pageSizeOptions}
					serverSide
				/>
			</div>
			{/* </Scrollbar> */}
		</div>
	);
};

export default Requests;
