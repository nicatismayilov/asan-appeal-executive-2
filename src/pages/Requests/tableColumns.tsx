import Skeleton from "components/Skeleton";
import { Request } from "types/requests";
import { TableColumn } from "components/Table";
import TableImage from "layoutComponents/TableImage";
import Button from "components/Button";

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

const columns = (args: Arguments): TableColumn<Request, keyof Request>[] => {
	const { canEdit, buttonHandler } = args;

	return [
		{
			key: "coverMedia",
			header: "",
			width: coverMediaWidth,
			render: (req) => <TableImage url={req.coverMedia} />,
			skeletonLoader: () => (
				<Skeleton type='rect' styles={{ borderRadius: 8 }} width={100} height={100} />
			),
		},
		{
			key: "text",
			header: "Müraciətin mətni",
			width: calcColumnWidth("25"),
		},
		{
			key: "citizen",
			header: "Müraciət edən",
			width: calcColumnWidth("25"),
			render: (req) => `${req.citizen.lastName} ${req.citizen.firstName} ${req.citizen.lastName}`,
		},
		{
			key: "citizen",
			header: "Telefon nömrəsi",
			width: calcColumnWidth("15"),
			render: (req) => renderPhoneNumber(req.citizen.mobilePhoneNumber),
		},
		{
			key: "dateCreatedStr",
			header: "Müraciət tarixi",
			width: calcColumnWidth("15"),
		},
		{
			key: "isJoined",
			header: "",
			width: calcColumnWidth("10"),
			render: (req) => (req.isJoined ? "Qoşulma" : "Yeni müraciət"),
		},
		{
			key: "id",
			header: "",
			width: calcColumnWidth("10"),
			render: (req) => (
				<Button data-reqid={req.id} onClick={buttonHandler} size='small'>
					{canEdit ? "Bax" : "Ətraflı"}
				</Button>
			),
		},
	];
};

export default columns;
