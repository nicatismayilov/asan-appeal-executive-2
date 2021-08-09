import { useState, useEffect, useCallback, memo, useRef, ReactNode, useMemo } from "react";
import { useTable, usePagination, useSortBy, Column, SortingRule } from "react-table";
import classnames from "classnames";

import TablePagination, { RefObject as TablePaginationRef } from "./components/TablePagination";
import Icon from "components/Icon";
import Spinner from "components/Spinner";

import { TableColumn } from "./types";

import "./styles.scss";

export type { TableColumn } from "./types";
export type Sorter<T> = SortingRule<T>[];

interface Props<T extends object> {
	title?: string;
	data: T[];
	columns: TableColumn<T>[];
	totalCount: number;
	loading?: boolean;
	serverSide?: boolean;
	virtual?: boolean;
	defaultPageIndex?: number;
	defaultPageSize?: number;
	pageSizeOptions?: number[];
	showPageSizeOptions?: boolean;
	showTotal?: (total: number, range: [number, number]) => void | ReactNode;

	onChange?: (p: Pagination, sorter: Sorter<T>) => void;
}

export interface Pagination {
	pageSize: number;
	pageIndex: number;
}

const Table = <T extends object>(props: Props<T>) => {
	const {
		columns,
		data,
		loading = false,
		totalCount,
		serverSide = true,
		defaultPageIndex = 0,
		defaultPageSize = 10,
		showPageSizeOptions = false,
		showTotal,
		pageSizeOptions = [],
	} = props;
	const { onChange } = props;
	const [controlledPageSize, setControlledPageSize] = useState(defaultPageSize);
	const paginationRef = useRef<TablePaginationRef>(null);

	// @ts-ignore
	const defaultColumn = useMemo<Column<T>>(() => {
		return {
			disableSortBy: true,
		};
	}, []);

	const tableInstance = useTable(
		{
			columns,
			data,
			manualPagination: true,
			pageCount: Math.ceil(totalCount / controlledPageSize),
			manualSortBy: true,
			initialState: { pageIndex: defaultPageIndex, pageSize: defaultPageSize },
			defaultColumn,
			autoResetSortBy: false,
			disableSortBy: data.length === 0,
		},
		useSortBy,
		usePagination
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		pageOptions,
		state,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		setPageSize,
		gotoPage,
	} = tableInstance;
	const { pageIndex, pageSize, sortBy } = state;

	const handlePageChange = useCallback(
		(page: number) => {
			gotoPage(page);
		},
		[gotoPage]
	);

	const handlePageSizeChange = useCallback(
		(pageSize: number) => {
			setControlledPageSize(pageSize);
			setPageSize(pageSize);
		},
		[setPageSize]
	);

	useEffect(() => {
		if (!serverSide) paginationRef.current?.reset();
	}, [data, serverSide]);

	useEffect(() => {
		if (onChange) {
			onChange({ pageIndex, pageSize }, sortBy);
		}
	}, [onChange, pageSize, pageIndex, sortBy]);

	return (
		<div className='table-container'>
			<div className='pa-10 pt-6 d-flex justify-end'>
				{totalCount > 0 && (
					<TablePagination
						ref={paginationRef}
						pageIndex={pageIndex}
						totalCount={totalCount}
						pageSize={pageSize}
						onPageChange={handlePageChange}
						onPageSizeChange={handlePageSizeChange}
						showTotal={showTotal}
						showPageSizeOptions={showPageSizeOptions}
						pageSizeOptions={pageSizeOptions}
						canNextPage={canNextPage}
						canPreviousPage={canPreviousPage}
						nextPage={nextPage}
						previousPage={previousPage}
						pageOptions={pageOptions}
					/>
				)}
			</div>

			<div
				className={classnames({
					"table-area": true,
					"table-area--loading": loading,
				})}
			>
				<table {...getTableProps()} className='table'>
					<thead className='table-thead'>
						{headerGroups.map((headerGroup) => (
							<tr className='pa-0' {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										className='table-th'
										{...column.getHeaderProps(column.getSortByToggleProps())}
										title={undefined}
									>
										{column.canSort ? (
											<div className='w-100 d-flex justify-center'>
												<div className='pr-12'>{column.render("Header")}</div>

												<div className='table-th-sorter'>
													<Icon
														icon='sort-up'
														style={{
															fill: column.isSorted && !column.isSortedDesc ? "#4759e4" : undefined,
														}}
													/>
													<Icon
														icon='sort-down'
														style={{
															fill: column.isSorted && column.isSortedDesc ? "#4759e4" : undefined,
														}}
													/>
												</div>
											</div>
										) : (
											column.render("Header")
										)}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody className='table-tbody' {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);

							return (
								<tr className='table-tr' {...row.getRowProps()}>
									{row.cells.map((cell) => (
										<td className='table-td' {...cell.getCellProps()}>
											{cell.render("Cell")}
										</td>
									))}
								</tr>
							);
						})}
					</tbody>
				</table>

				{loading && (
					<div
						style={{ position: "absolute", top: "50%", left: "50%", transform: "translateX(-50%)" }}
					>
						<Spinner size={50} />
					</div>
				)}

				{page.length === 0 && (
					<div className='d-flex flex-column align-center justify-center w-100'>
						<Icon icon='empty-box' className='table-no-data-icon' />
						<span className='table-no-data-text'>Məlumat yoxdur</span>
					</div>
				)}
			</div>

			<div className='pa-10 pt-6 d-flex justify-end'>
				{totalCount > 0 && (
					<TablePagination
						ref={paginationRef}
						pageIndex={pageIndex}
						totalCount={totalCount}
						pageSize={pageSize}
						onPageChange={handlePageChange}
						onPageSizeChange={handlePageSizeChange}
						showTotal={showTotal}
						showPageSizeOptions={showPageSizeOptions}
						pageSizeOptions={pageSizeOptions}
						canNextPage={canNextPage}
						canPreviousPage={canPreviousPage}
						nextPage={nextPage}
						previousPage={previousPage}
						pageOptions={pageOptions}
					/>
				)}
			</div>
		</div>
	);
};

export default memo(Table) as typeof Table;
