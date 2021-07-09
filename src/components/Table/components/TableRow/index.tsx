import { memo } from "react";

import { ColumnDefinitionType } from "../../types";

interface Props<T, K extends keyof T> {
	row: T;
	columns: ColumnDefinitionType<T, K>[];
}

const TableRow = <T, K extends keyof T>(props: Props<T, K>) => {
	const { row, columns } = props;

	return (
		<div className='table-tr'>
			{columns.map((column, idx) => (
				<div
					key={`table-cell--${idx}`}
					style={{ width: column.width, ...column.styles }}
					className='table-td'
				>
					{column.render ? column.render(row) || null : row[column.key]}
				</div>
			))}
		</div>
	);
};

export default memo(TableRow) as typeof TableRow;
