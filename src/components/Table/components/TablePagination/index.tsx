import {
	useCallback,
	useMemo,
	Fragment,
	memo,
	forwardRef,
	useImperativeHandle,
	ReactNode,
} from "react";
import classnames from "classnames";

import Select from "components/Select";
import Icon from "components/Icon";

export interface Props {
	pageIndex: number;
	pageSize: number;
	showPageSizeOptions: boolean;
	pageSizeOptions: number[];
	pageOptions: number[];
	totalCount: number;
	canPreviousPage: boolean;
	canNextPage: boolean;

	nextPage: () => void;
	previousPage: () => void;
	onPageChange: (page: number) => void;
	onPageSizeChange?: (pageSize: number) => void;
	showTotal?: (total: number, range: [number, number]) => void | ReactNode;
}

export interface RefObject {
	reset: () => void;
}

const baseClass = "table-pagination";

const pageSizeIdFromValue = (pageSize: number) => `${pageSize}`;
const pageIndexIdFromValue = (pageIndex: number) => `${pageIndex}`;

const pageSizeRender = (pageSize: number) => `${pageSize} / səhifə`;
const pageIndexRender = (pageIndex: number) => pageIndex + 1;

const TablePagination = forwardRef<RefObject, Props>((props, ref) => {
	const {
		pageIndex,
		pageSize,
		showPageSizeOptions,
		pageOptions,
		pageSizeOptions,
		totalCount,
		canNextPage,
		canPreviousPage,
	} = props;
	const { onPageChange, showTotal, onPageSizeChange, nextPage, previousPage } = props;

	useImperativeHandle(ref, () => ({
		reset: () => {
			onPageChange(0);
		},
	}));

	const range = useMemo<[number, number]>(() => {
		const left = pageIndex * pageSize + 1;
		const right = (pageIndex + 1) * pageSize < totalCount ? (pageIndex + 1) * pageSize : totalCount;

		return [left, right];
	}, [pageIndex, pageSize, totalCount]);

	const handlePageSizeChange = useCallback(
		(pageSize: number | undefined) => {
			if (pageSize && onPageSizeChange) {
				onPageSizeChange(pageSize);
			}
		},
		[onPageSizeChange]
	);

	const handlePageChange = useCallback(
		(pageIndex: number | undefined) => {
			if (pageIndex || pageIndex === 0) onPageChange(pageIndex);
		},
		[onPageChange]
	);

	const handlePrevClick = () => {
		if (canPreviousPage) previousPage();
	};

	const handleNextClick = () => {
		if (canNextPage) nextPage();
	};

	return (
		<div className={baseClass}>
			{showTotal && (
				<div className={`${baseClass}-total`}>{showTotal(totalCount, range) || null}</div>
			)}

			{pageOptions.length !== 1 && (
				<>
					<div
						className={classnames({
							[`${baseClass}-control`]: true,
							[`${baseClass}-control--disabled`]: !canPreviousPage,
						})}
						onClick={handlePrevClick}
					>
						<Icon icon='left' />
					</div>

					<div
						className={classnames({
							[`${baseClass}-control`]: true,
							[`${baseClass}-control--disabled`]: !canNextPage,
						})}
						onClick={handleNextClick}
					>
						<Icon icon='right' />
					</div>

					<div className={`${baseClass}-page-index-select`}>
						<Select
							name='pageIndex'
							onChange={handlePageChange}
							options={pageOptions}
							value={pageIndex}
							idFromValue={pageIndexIdFromValue}
							render={pageIndexRender}
						/>
					</div>
				</>
			)}

			{showPageSizeOptions && (
				<div className={`${baseClass}-page-size-select`}>
					<Select
						name='pageSize'
						options={pageSizeOptions}
						value={pageSize}
						idFromValue={pageSizeIdFromValue}
						render={pageSizeRender}
						onChange={handlePageSizeChange}
					/>
				</div>
			)}
		</div>
	);
});

export default memo(TablePagination);
