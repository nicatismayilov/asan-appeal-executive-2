import Skeleton from "components/Skeleton";
import { Request } from "types/requests";
import { TableColumn } from "components/Table";
import TableImage from "layoutComponents/TableImage";
import Button from "components/Button";
import Scrollbar from "components/Scrollbar";

const coverMediaWidth = 125;

const calcColumnWidth = (percentage: string) => {
	return `calc((100% - ${coverMediaWidth}px) * ${percentage} / 100)`;
};

const renderPhoneNumber = (number: string) => {
	const firstPart = `${number[0]}${number[1]}`;
	const secondPart = `${number[2]}${number[3]}${number[4]}`;
	const thirdPart = `${number[5]}${number[6]}`;
	const fourthPart = `${number[7]}${number[8]}`;

	return `+994 ${firstPart} ${secondPart} ${thirdPart} ${fourthPart}`;
};

interface Arguments {
	canEdit: boolean;
	buttonHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

// const columns = (args: Arguments): TableColumn<Request, keyof Request>[] => {
// 	const { canEdit, buttonHandler } = args;

// 	return [
// 		{
// 			key: "coverMedia",
// 			header: "",
// 			width: coverMediaWidth,
// 			render: (record) => (
// 				<TableImage
// 					url={record.coverMedia}
// 					height={coverMediaWidth * 0.8}
// 					width={coverMediaWidth * 0.8}
// 				/>
// 			),
// 			skeletonLoader: () => (
// 				<Skeleton type='rect' styles={{ borderRadius: 8 }} width={100} height={100} />
// 			),
// 		},
// 		{
// 			key: "text",
// 			header: "Müraciətin mətni",
// 			width: calcColumnWidth("25"),
// 			render: (record) => (
// 				<Scrollbar>
// 					<div className='px-5'>{record.text}</div>
// 				</Scrollbar>
// 			),
// 		},
// 		{
// 			key: "citizen",
// 			header: "Müraciət edən",
// 			width: calcColumnWidth("25"),
// 			render: (record) =>
// 				`${record?.citizen?.lastName} ${record?.citizen?.firstName} ${record?.citizen?.lastName}`,
// 		},
// 		{
// 			key: "citizen",
// 			header: "Telefon nömrəsi",
// 			width: calcColumnWidth("15"),
// 			render: (record) => renderPhoneNumber(record?.citizen?.mobilePhoneNumber || ""),
// 		},
// 		{
// 			key: "dateCreatedStr",
// 			header: "Müraciət tarixi",
// 			width: calcColumnWidth("15"),
// 		},
// 		{
// 			key: "isJoined",
// 			header: "",
// 			width: calcColumnWidth("10"),
// 			render: (record) => (record.isJoined ? "Qoşulma" : "Yeni müraciət"),
// 		},
// 		{
// 			key: "id",
// 			header: "",
// 			width: calcColumnWidth("10"),
// 			render: (record) => (
// 				<Button data-reqid={record.id} size='small' onClick={buttonHandler}>
// 					{canEdit ? "Bax" : "Ətraflı"}
// 				</Button>
// 			),
// 		},
// 	];
// };

// export default columns;
