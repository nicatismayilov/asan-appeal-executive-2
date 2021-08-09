import { useCallback } from "react";

import Select from "components/Select";

interface Props {
	value: boolean | undefined;
	onChange: (value: boolean | undefined) => void;
	active: boolean;
}

interface Status {
	text: string;
	value: boolean;
}

const statuses: Status[] = [
	{ text: "İcra olunmuşlar", value: false },
	{ text: "İcrada olanlar", value: true },
];

const statusMap: { [value: string]: Status } = {
	true: { text: "İcrada olanlar", value: true },
	false: { text: "İcra olunmuşlar", value: false },
};

const executorIdFromValue = (s: Status) => s.text;

const executorRender = (s: Status) => s.text;

const StatusSelect: React.FC<Props> = (props) => {
	const { value, onChange, active } = props;

	const handleChange = useCallback(
		(value: Status | undefined) => {
			onChange(value?.value);
		},
		[onChange]
	);

	if (!active) return null;

	return (
		<div className='col-12 col-md-6 col-lg-3'>
			<Select
				label='Status'
				options={statuses}
				value={statusMap[`${value}`]}
				idFromValue={executorIdFromValue}
				render={executorRender}
				name='completed'
				onChange={handleChange}
				clearable
				optionsEmptyText='Məlumat yoxdur'
			/>
		</div>
	);
};

export default StatusSelect;
