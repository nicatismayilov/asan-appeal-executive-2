import Skeleton from "components/Skeleton";
import { Problem } from "types/requests";
import { TableColumn } from "components/Table";
import TableImage from "layoutComponents/TableImage";
import Button from "components/Button";

enum CoverMediaSize {
	small = 75,
	default = 125,
	large = 175,
}

const calcColumnWidth = (percentage: string, coverMediaSize: number = CoverMediaSize.default) => {
	return `calc((100% - ${coverMediaSize}px) * ${percentage} / 100)`;
};

interface Arguments {
	canEdit: boolean;
	buttonHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	coverMediaSize?: "small" | "default" | "large";
}

// const columns = (args: Arguments): TableColumn<Problem, keyof Problem>[] => {
// 	const { canEdit, buttonHandler, coverMediaSize = "default" } = args;

// 	return [
// 		{
// 			key: "coverMedia",
// 			header: "",
// 			width: CoverMediaSize[coverMediaSize],
// 			render: (req) => (
// 				<TableImage
// 					url={req.coverMedia}
// 					height={CoverMediaSize[coverMediaSize] * 0.8}
// 					width={CoverMediaSize[coverMediaSize] * 0.8}
// 				/>
// 			),
// 			skeletonLoader: () => (
// 				<Skeleton type='rect' styles={{ borderRadius: 8 }} width={100} height={100} />
// 			),
// 		},
// 		{
// 			key: "title",
// 			header: "Müraciətin mətni",
// 			width: calcColumnWidth("25", CoverMediaSize[coverMediaSize]),
// 		},
// 		{
// 			key: "executive",
// 			header: "Nəzarət orqanı",
// 			width: calcColumnWidth("25", CoverMediaSize[coverMediaSize]),
// 			render: (record) => record.executive?.name || "—",
// 		},
// 		{
// 			key: "address",
// 			header: "Müraciət ünvanı",
// 			width: calcColumnWidth("20", CoverMediaSize[coverMediaSize]),
// 			render: (record) => {
// 				const address =
// 					record.region.name +
// 					(record.street ? "," + record.street.name : "") +
// 					(record.address ? "," + record.address.replace(record.region.name, "") : "");

// 				return address ? address.replaceAll(", ,", ",").replace(/,\s*$/, "") : "—";
// 			},
// 		},
// 		{
// 			key: "dateStr",
// 			header: "Müraciət tarixi",
// 			width: calcColumnWidth("20", CoverMediaSize[coverMediaSize]),
// 			render: (record) => <div>{record.dateStr}</div>,
// 		},
// 		{
// 			key: "id",
// 			header: "",
// 			width: calcColumnWidth("10", CoverMediaSize[coverMediaSize]),
// 			render: (record) => (
// 				<Button data-reqid={record.id} size='small' onClick={buttonHandler}>
// 					{canEdit ? "Bax" : "Ətraflı"}
// 				</Button>
// 			),
// 		},
// 	];
// };

// export default columns;
