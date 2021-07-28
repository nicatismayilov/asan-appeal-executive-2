import { ReactNode } from "react";
import { Column } from "react-table";

export type TableColumn<T extends object> = Column<T> & {
	skeletonLoader?: (record: T) => ReactNode | null;
};
