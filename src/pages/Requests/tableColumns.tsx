import { TableColumn } from "components/Table";
import { Problem, Request } from "types/requests";
import TableImage from "layoutComponents/TableImage";
import Button from "components/Button";
import { prioritiesMap } from "types/utils";
import { format, parse } from "date-fns";
import { az } from "date-fns/locale";

interface Arguments {
	canEdit: boolean;
	buttonHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

/* Columns for Problems Table */
export function problemTableColumns(args: Arguments): TableColumn<Problem>[] {
	const { canEdit, buttonHandler } = args;

	return [
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
				const street = row.street ? `, ${row.street.name}` : "";
				const address = row.address ? `, ${row.address.replace(row.region.name, "")}` : "";
				const fullAddress = `${row.region.name}${street}${address}`;

				return fullAddress ? fullAddress.replaceAll(", ,", ",").replace(/,\s*$/, "") : "—";
			},
			Header: "Müraciət ünvanı",
			id: "problemAddress",
		},
		{
			accessor: "dateStr",
			Header: "Müraciətin tarixi",
			Cell: ({ value }) => renderDate(value, true),
			disableSortBy: false,
			id: "date",
		},
		{
			accessor: "id",
			Cell: ({ value, cell }) => {
				const { priorityLevel } = cell.row.original;
				const priority = prioritiesMap[priorityLevel];

				return (
					<div style={{ width: 75 }} className='d-flex justify-center'>
						<Button
							data-reqid={value}
							size='small'
							color={priority.color}
							backgroundColor={`${priority.color}26`}
							onClick={buttonHandler}
						>
							{canEdit ? "Bax" : "Ətraflı"}
						</Button>
					</div>
				);
			},
		},
	];
}

/* Columns for Requests Table */
export function requestsTableColumns(args: Arguments): TableColumn<Request>[] {
	const { canEdit, buttonHandler } = args;

	return [
		{
			accessor: "coverMedia",
			Cell: ({ value }) => <TableImage url={value} height={50} width={50} />,
			Header: "",
		},
		{
			accessor: "text",
			Header: "Müraciətin mətni",
		},
		{
			accessor: "citizen",
			Header: "Müraciət edən",
			Cell: ({ value }) => (
				<div style={{ minWidth: 150 }}>
					{`${value?.lastName} ${value?.firstName} ${value?.fatherName}`}
				</div>
			),
		},
		{
			accessor: "citizen",
			Header: "Telefon nömrəsi",
			Cell: ({ value }) => (
				<div style={{ minWidth: 150 }}>{renderPhoneNumber(value?.mobilePhoneNumber || "")}</div>
			),
			id: "telephoneNumber",
		},
		{
			accessor: "dateCreatedStr",
			Header: "Müraciət tarixi",
			Cell: ({ value }) => renderDate(value, false),
			disableSortBy: false,
			id: "date",
		},
		{
			accessor: "isJoined",
			Cell: ({ value }) => (value ? "Qoşulma" : "Yeni müraciət"),
		},
		{
			accessor: "id",
			Cell: ({ value }) => {
				return (
					<div style={{ width: 75 }} className='d-flex justify-center'>
						<Button data-reqid={value} size='small' onClick={buttonHandler}>
							{canEdit ? "Bax" : "Ətraflı"}
						</Button>
					</div>
				);
			},
		},
	];
}

/* Utility function to render the phone number in correct format */
function renderPhoneNumber(number: string) {
	const firstPart = `${number[0]}${number[1]}`;
	const secondPart = `${number[2]}${number[3]}${number[4]}`;
	const thirdPart = `${number[5]}${number[6]}`;
	const fourthPart = `${number[7]}${number[8]}`;

	return `+994 ${firstPart} ${secondPart} ${thirdPart} ${fourthPart}`;
}

/* Utility function to render Request date */
function renderDate(value: string, hasSeconds: boolean) {
	const date = parse(value, `dd.MM.yyyy ${hasSeconds ? "HH:mm:ss" : "HH:mm"}`, new Date());
	const dateStr = format(date, "d MMM, yyyy", { locale: az });
	const timeStr = format(date, "HH:mm");

	return (
		<div className='d-flex flex-column align-center' style={{ minWidth: 150 }}>
			<div className='table-date-tag'>{dateStr}</div>

			<div className='table-date-tag'>{timeStr}</div>
		</div>
	);
}
